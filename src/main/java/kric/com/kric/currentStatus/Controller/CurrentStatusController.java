package kric.com.kric.currentStatus.Controller;

import kric.com.kric.contact.model.service.ContactService;
import kric.com.kric.contact.model.vo.ContactProject;
import kric.com.kric.contact.model.vo.DivisionCodeVo;
import kric.com.kric.contact.model.vo.ResultCodeVo;
import kric.com.kric.currentStatus.model.service.CurrentStatusService;
import kric.com.kric.currentStatus.model.vo.ContactStatusVo;
import kric.com.kric.currentStatus.model.vo.DivisionStatusVo;
import kric.com.kric.currentStatus.model.vo.MyunStatusVo;
import kric.com.kric.currentStatus.model.vo.ResultStatusVo;
import kric.com.kric.listManage.model.service.ListManageService;
import kric.com.kric.listManage.model.vo.CurrentListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import kric.com.kric.user.model.vo.UserVo;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

@Controller
public class CurrentStatusController {

    @Autowired
    private CurrentStatusService csService;

    @Autowired
    private ContactService cService;

    @Autowired
    private ListManageService lService;

    @RequestMapping("CSMain")
    public String CSMain(Model model){

        ArrayList<ContactProject> cList = cService.ContactList(null, null);
        model.addAttribute("cList", cList);

        return "currentStatus";
    }
    
    /*각 코드별 카운트*/
    @ResponseBody
    @RequestMapping("GETStatus")
    public HashMap<String, Object> GETStatus(@RequestParam(value = "prj_code", required = false) String prj_code){
        
        //결과코드별 카운트
        ArrayList<ResultStatusVo> rscList = csService.GetResultStatus(prj_code);
        //분류코드
        ArrayList<DivisionCodeVo> dcList = cService.GetContactDivision(prj_code);
        //결과코드
        ArrayList<ResultCodeVo> rList = cService.GetContactResult(prj_code);
        //분류별 카운트
        ArrayList<DivisionStatusVo> dsList = csService.GetDivisionStatus(prj_code);
        //분류 by 결과별 카운트
        ArrayList<DivisionStatusVo> dscList = new ArrayList<>();

        ArrayList<String> countArr = null;

        for(DivisionCodeVo dc : dcList){
            countArr = new ArrayList<>();

            for(ResultCodeVo rc : rList){
                int chk = 0;
                for(DivisionStatusVo ds : dsList){
                    if(dc.getDname().equals(ds.getName()) && dc.getDheader().equals(ds.getHeader()) && rc.getRcode().equals(ds.getContactStat())){
                        countArr.add(ds.getStatCount());
                        chk++;
                    }
                }
                if(chk == 0) countArr.add("0");
            }

            dscList.add(new DivisionStatusVo(dc.getDname(), dc.getDheader(), null, String.join(",", countArr)));
        }
        
        //면접원별 카운트
        ArrayList<MyunStatusVo> msList = csService.GetMyunStatus(prj_code);
        //면접원 리스트
        ArrayList<String> mList = new ArrayList<>();

        for(MyunStatusVo ms : msList){
            if(!mList.contains(ms.getName())) mList.add(ms.getName());
        }

        //분류 by 결과별 카운트
        ArrayList<MyunStatusVo> mscList = new ArrayList<>();

        for(String m : mList){
            countArr = new ArrayList<>();

            for(ResultCodeVo rc : rList){
                int chk = 0;
                for(MyunStatusVo ms : msList){
                    if(m.equals(ms.getName()) && rc.getRcode().equals(ms.getCode())){
                        countArr.add(ms.getStatCount());
                        chk++;
                    }
                }
                if(chk == 0) countArr.add("0");
            }

            mscList.add(new MyunStatusVo(null, m, String.join(",", countArr)));
        }


        HashMap<String, Object> hs = new HashMap<>();

        hs.put("rList", rList);
        hs.put("rscList", rscList);
        hs.put("dscList", dscList);
        hs.put("mscList", mscList);


        return hs;
    }

    /*리스트 타입 가져오기*/
    @ResponseBody
    @RequestMapping("GET_LIST_TYPE")
    public ArrayList<CurrentListTypeVo> GET_CURRENT_LIST(@RequestParam(value = "prj_code", required = false) String prj_code){

        ArrayList<CurrentListTypeVo> ctList = lService.GET_CURRENT_LIST_TYPE(prj_code);

        return ctList;
    }
    
    
    /*코드별 클릭시, 리스트 가져오기*/
    @ResponseBody
    @RequestMapping("SearchClickList")
    public ArrayList<CurrentListTypeVo> SearchClickList(@RequestParam(value = "prj_code", required = false) String prj_code,
                                                        @RequestParam(value = "resultCode", required = false) String resultCode){

        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prj_code", prj_code);
        hs.put("resultCode", resultCode);

        ArrayList<CurrentListTypeVo> cList = csService.SearchClickList(hs);

        return cList;
    }
    
    /*리스트 코드 일괄변경*/
    @ResponseBody
    @RequestMapping("ListChangeResult")
    public int ListChangeResult(@RequestParam(value = "prj_code", required = false) int prj_code,
                                @RequestParam(value = "listArr[]", required = false) String[] listArr,
                                @RequestParam(value = "updateResult", required = false) int updateResult,
                                HttpSession sess){
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");


        int result = 0;

        for(String listid : listArr){
            result += cService.ContactResult_Add(updateResult, "관리자 일괄변경", prj_code, listid, loginUser);
        }

        return result;
    }

    /*컨택 현황 리스트 다운로드*/
    @RequestMapping("ContactStautsExcelDown/{prj_code}")
    public void ContactStautsExcelDown(@PathVariable String prj_code,
                                     HttpServletResponse res) throws Exception {
        //리스트 타입 리스트
        ArrayList<CurrentListTypeVo> ctList = lService.GET_CURRENT_LIST_TYPE(prj_code);
        //헤더 리스트
        ArrayList<String> headerList = new ArrayList<>();
        //리스트아이디 속성 인덱스
        int listId_index = 0;
        for(CurrentListTypeVo cl : ctList){
            if(cl.getType().equals("리스트아이디")) listId_index = cl.getOrder();
            headerList.add(cl.getHeader());
        }

        String[] defaultArr = {"컨택결과", "컨택원", "컨택시간", "비고(기타사항)", "컨택횟수"};
        headerList.addAll(Arrays.asList(defaultArr));
        
        //실 데이터
        ArrayList<ContactStatusVo> dataList = csService.ContactStautsExcelDown(prj_code);

        //워크북 생성
        String sheetName = "컨택리스트 양식";

        SXSSFWorkbook wb = new SXSSFWorkbook();
        SXSSFSheet sheet = wb.createSheet(sheetName);
        Row row = null;
        Cell cell = null;

        //테이블 헤더 스타일
        XSSFCellStyle headStyle = (XSSFCellStyle) wb.createCellStyle();
        // 가는 경계선
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);
        // 배경색
        headStyle.setFillForegroundColor(new XSSFColor(new byte[] {(byte) 185,(byte) 222,(byte) 255}, null));
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        //폰트 Color
        Font headerFont = wb.createFont();
        headerFont.setBold(true);
        headStyle.setFont(headerFont);

        // 데이터는 가운데 정렬
        headStyle.setAlignment(HorizontalAlignment.CENTER);

        //테이블 헤더 스타일
        XSSFCellStyle bodyStyle = (XSSFCellStyle) wb.createCellStyle();
        // 가는 경계선
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);
        // 데이터는 가운데 정렬
        bodyStyle.setAlignment(HorizontalAlignment.CENTER);



        //헤더 데이터 세팅
        int idx = 0, rowIdx = 0;
        row = sheet.createRow(rowIdx++);

        for(String cl : headerList){
            //자동정렬
            sheet.trackAllColumnsForAutoSizing();
            sheet.autoSizeColumn(idx);
            sheet.setColumnWidth(idx, (sheet.getColumnWidth(idx)) + (short)2048);

            //헤더 데이터
            cell = row.createCell(idx++);
            if(idx == listId_index){
                XSSFCellStyle testheadStyle = headStyle.copy();
                testheadStyle.setFillForegroundColor(new XSSFColor(new byte[] {(byte) 255,(byte) 0,(byte) 0}, null));
                cell.setCellStyle(testheadStyle);
            }else{
                cell.setCellStyle(headStyle);
            }
            cell.setCellValue(cl);
        }
        
        
        //리스트 데이터
        for(ContactStatusVo csv : dataList){
            idx = 0;

            sheet.trackAllColumnsForAutoSizing();
            sheet.autoSizeColumn(rowIdx);
            sheet.setColumnWidth(rowIdx, (sheet.getColumnWidth(rowIdx)) + (short)2048);

            row = sheet.createRow(rowIdx);


            ArrayList<String> cList = new ArrayList<>();
            cList.addAll(Arrays.asList(csv.getList_info().split("\\|\\|")));
            cList.add(csv.getContact_result());
            cList.add(csv.getContact_name());
            cList.add(csv.getContact_time());
            cList.add(csv.getContact_content());
            cList.add(csv.getContact_cnt());

            for(String c : cList){
                cell = row.createCell(idx++);

                cell.setCellStyle(bodyStyle);
                cell.setCellValue(c);
            }

            rowIdx++;
        }

        // 컨텐츠 타입과 파일명 지정
        String fileName = "컨택현황리스트.xlsx";
        String outputFileName = new String(fileName.getBytes("KSC5601"), "8859_1");

        res.setContentType("ms-vnd/excel");
        res.setHeader("Content-Disposition", "attachment;filename=\"" + outputFileName + "\"");

        // 엑셀 출력
        wb.write(res.getOutputStream());
        wb.close();
    }
}
