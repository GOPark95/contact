package kric.com.kric.listManage.Controller;

import kric.com.kric.contact.model.service.ContactService;
import kric.com.kric.contact.model.vo.ContactProject;
import kric.com.kric.contact.model.vo.ListDataVo;
import kric.com.kric.listManage.model.service.ListManageService;
import kric.com.kric.listManage.model.service.ListManageServiceImpl;
import kric.com.kric.listManage.model.vo.CurrentListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;

@Controller
public class ListManageController {

    @Autowired
    private ContactService cService;

    @Autowired
    private ListManageService lService;

    /*메인 view*/
    @RequestMapping("ListMain")
    public String MainView(Model model){
        ArrayList<ContactProject> cList = cService.ContactList(null, null);
        model.addAttribute("cList", cList);

        return "listManagement";
    }

    /*메인 view*/
    @ResponseBody
    @RequestMapping("ListMain/{prj_code}")
    public HashMap<String, Object> GET_CURRENT_LIST(@PathVariable String prj_code){

        HashMap<String, Object> hs = new HashMap<>();

        ArrayList<CurrentListTypeVo> ctList = lService.GET_CURRENT_LIST_TYPE(prj_code);
        ArrayList<CurrentListDataVo> cdList = lService.GET_CURRENT_LIST(prj_code);

        hs.put("ctList", ctList);
        hs.put("cdList", cdList);

        return hs;
    }
    
    /*컨택리스트 양식 다운로드*/
    @RequestMapping("AddListFormExcelDown/{prj_code}")
    public void AddListFormExcelDown(@PathVariable String prj_code,
                                     HttpServletResponse res) throws Exception {
        //리스트 타입 리스트
        ArrayList<CurrentListTypeVo> ctList = lService.GET_CURRENT_LIST_TYPE(prj_code);

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

        //헤더 데이터 세팅
        int idx = 0;
        row = sheet.createRow(0);

        for(CurrentListTypeVo cl : ctList){
            //자동정렬
            sheet.trackAllColumnsForAutoSizing();
            sheet.autoSizeColumn(idx);
            sheet.setColumnWidth(idx, (sheet.getColumnWidth(idx)) + (short)2048);

            //헤더 데이터
            cell = row.createCell(idx++);

            cell.setCellStyle(headStyle);
            cell.setCellValue(cl.getHeader());
        }

        // 컨텐츠 타입과 파일명 지정
        String fileName = "컨택리스트 양식.xlsx";
        String outputFileName = new String(fileName.getBytes("KSC5601"), "8859_1");
        
        res.setContentType("ms-vnd/excel");
        res.setHeader("Content-Disposition", "attachment;filename=\"" + outputFileName + "\"");

        // 엑셀 출력
        wb.write(res.getOutputStream());
        wb.close();
    }
    
    //리스트 추가
    @ResponseBody
    @RequestMapping("ContactListAdd")
    public int ContactListAdd(@RequestParam(value = "prj_code", required = false) int prj_code,
                              @RequestParam(value = "listDataArr", required = false) String listDataArr,
                              @RequestParam(value = "listIdArr", required = false) ArrayList<String> listIdArr,
                              @RequestParam(value = "listAddType", required = false) String listAddType,
                              HttpServletResponse res) throws Exception {

        ArrayList<ListDataVo> lList = new ArrayList<>();

        JSONArray jsonArr = null;

        if (listDataArr != null) jsonArr = (JSONArray) new JSONParser().parse(listDataArr);

        if (listDataArr != null) {
            for (int i = 0; i < jsonArr.size(); i++) {
                JSONObject jsonObj = (JSONObject) jsonArr.get(i);
                lList.add(new ListDataVo((String) jsonObj.get("Listid"), (String) jsonObj.get("listData"), (String) jsonObj.get("listType"), null,  Integer.parseInt(String.valueOf(jsonObj.get("listOrder"))), prj_code));
            }
        }
        int result = 0;

        if(listAddType.equals("add")){
            result = lService.ContactListAdd(lList, listIdArr, prj_code);
        }else{
            result = lService.ContactListChange(lList, listIdArr, prj_code);
        }

        return result;
    }

    /*검색 리스트 가져오기*/
    @ResponseBody
    @RequestMapping("SearchList")
    public ArrayList<CurrentListDataVo> SearchList(@RequestParam(value = "prj_code", required = false) int prj_code,
                                                   @RequestParam(value = "searchOption", required = false) String searchOption,
                                                   @RequestParam(value = "searchText", required = false) String searchText){
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prj_code", prj_code);
        hs.put("searchOption", searchOption);
        hs.put("searchText", searchText);

        ArrayList<CurrentListDataVo> scList = lService.SearchList(hs);

        return scList;
    }
}
