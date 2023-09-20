package kric.com.kric.contact.Controller;

import kric.com.kric.cms.model.service.CMSSerivce;
import kric.com.kric.cms.model.vo.CMSTypeVo;
import kric.com.kric.common.Pagenation;
import kric.com.kric.common.email.Email;
import kric.com.kric.common.email.EmailSender;
import kric.com.kric.common.sms.NaverSMSApi;
import kric.com.kric.common.vo.PageInfo;
import kric.com.kric.contact.model.service.ContactService;
import kric.com.kric.contact.model.vo.*;
import kric.com.kric.user.model.vo.UserVo;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ContactController {

    @Autowired
    private ContactService cService;

    @Autowired
    private CMSSerivce cmsService;

    @Autowired(required = false)
    private EmailSender emailSender;

    @Autowired(required = false)
    private Email email;

    @Autowired
    private kric.com.kric.common.sms.NaverSMSApi naverSMSApi;

    /*컨택 프로젝트 리스트*/
    @RequestMapping("Main")
    public String InsertMain(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "SC", required = false) String code,
                             @RequestParam(value = "SN", required = false) String name,
                             Model model) {
        SearchOptionVo sv = new SearchOptionVo();
        if (code != null) sv.setCode(code);
        if (name != null) sv.setName(name);

        int currentPage = 1;
        if (page != null) currentPage = page;

        int listCount = cService.ContactListCount(sv);
        PageInfo pi = Pagenation.getPageInfo(currentPage, listCount);
        ArrayList<ContactProject> cList = cService.ContactList(pi, sv);
//        System.out.println(cList);

        model.addAttribute("cList", cList)
                .addAttribute("pi", pi)
                .addAttribute("sv", sv);
//        System.out.println(cList);
        return "contactList";
    }

    /*인트라넷 연동 리스트 (검색)*/
    @ResponseBody
    @RequestMapping("SearchIntranetList")
    public ArrayList<IntranetProjectListVo> SearchIntranetList(@RequestParam(value = "inputVal") String inputVal) {

        ArrayList<IntranetProjectListVo> pList = cService.IntranetList(inputVal);

        return pList;
    }

    /*컨택프로젝트 등록*/
    @ResponseBody
    @RequestMapping("ContactInsert")
    public int ContactInsert(@RequestParam(value = "prjName", required = false) String prjName,
                             @RequestParam(value = "intranetCode", required = false) String intranetCode,
                             @RequestParam(value = "konCode", required = false) String konCode,
                             @RequestParam(value = "result_data", required = false) String result_data,
                             @RequestParam(value = "division_data", required = false) String division_data,
                             @RequestParam(value = "list_data", required = false) String list_data,
                             @RequestParam(value = "type_data", required = false) String type_data,
                             @RequestParam(value = "Listid_arr", required = false) ArrayList<String> listid_arr,
                             @RequestParam(value = "konType", required = false) ArrayList<String> konType,
                             HttpSession sess
    ) throws Exception {

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
        ArrayList<ResultCodeVo> rlist = new ArrayList<>();
        ArrayList<DivisionCodeVo> dlist = new ArrayList<>();
        ArrayList<ListDataVo> Llist = new ArrayList<>();
        ArrayList<ContactTypeVo> tlist = new ArrayList<>();

        JSONArray jsonArr = null;
        JSONArray jsonArr2 = null;
        JSONArray jsonArr3 = null;
        JSONArray jsonArr4 = null;

        if (result_data != null) jsonArr = (JSONArray) new JSONParser().parse(result_data);
        if (division_data != null) jsonArr2 = (JSONArray) new JSONParser().parse(division_data);
        if (list_data != null) jsonArr3 = (JSONArray) new JSONParser().parse(list_data);
        if (type_data != null) jsonArr4 = (JSONArray) new JSONParser().parse(type_data);

        if (konCode.equals("null")) konCode = null;

        if (result_data != null) {
            jsonArr = (JSONArray) new JSONParser().parse(result_data);

            for (int i = 0; i < jsonArr.size(); i++) {
                JSONObject jsonObj = (JSONObject) jsonArr.get(i);
                rlist.add(new ResultCodeVo((String) jsonObj.get("Rcode"), (String) jsonObj.get("Rname")));
            }
        }

        if (division_data != null) {
            for (int i = 0; i < jsonArr2.size(); i++) {
                JSONObject jsonObj = (JSONObject) jsonArr2.get(i);
                dlist.add(new DivisionCodeVo((String) jsonObj.get("Dorder"), (String) jsonObj.get("Dcode"), (String) jsonObj.get("Dname"), (String) jsonObj.get("Dheader")));
            }
        }

        if (list_data != null) {
            for (int i = 0; i < jsonArr3.size(); i++) {
                JSONObject jsonObj = (JSONObject) jsonArr3.get(i);
                int order = (i + 1) % jsonArr4.size() == 0 ? jsonArr4.size() : (i + 1) % jsonArr4.size();
                Llist.add(new ListDataVo((String) jsonObj.get("Listid"), (String) jsonObj.get("listData"), (String) jsonObj.get("listType"), null, order, 0));
            }
        }
        if (type_data != null) {
            for (int i = 0; i < jsonArr4.size(); i++) {
                JSONObject jsonObj = (JSONObject) jsonArr4.get(i);
                tlist.add(new ContactTypeVo((String) jsonObj.get("Header"), (String) jsonObj.get("Type"), (String) jsonObj.get("Division_status"), (i + 1), 0));
            }
        }

        try {
            ContactProject cp = new ContactProject(prjName, intranetCode);
            cp.setKon_code(konCode);
            int result = cService.ContactInsert(cp, rlist, dlist, Llist, tlist, listid_arr, konType);
            String projectCode = cService.ContactLastCode();

            if (konCode != null) KonSetting(konCode, konType, projectCode);
            cService.ContactProjectLog(loginUser, "프로젝트 추가");
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        }

    }

    //엑셀 리스트 데이터 가져오기
    @ResponseBody
    @RequestMapping("ContactExcel")
    public ArrayList<ArrayList<String>> ContactExcel(@RequestParam(value = "excel") MultipartFile excel, HttpServletRequest req) throws Exception {
        ArrayList<ArrayList<String>> excelList = new ArrayList<>();
        String extension = FilenameUtils.getExtension(excel.getOriginalFilename());
        System.out.println(extension);
        System.out.println(excel.getOriginalFilename());
        System.out.println(excel.getInputStream());

        Workbook workbook = null;

        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(excel.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(excel.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);

        for (int i = 0; i < worksheet.getPhysicalNumberOfRows(); i++) {
            Row row = worksheet.getRow(i);

            if (row != null && row.getCell(0).getCellType() != CellType.BLANK) {
                ArrayList<String> rowlist = new ArrayList<>();
                for (int j = 0; j < row.getLastCellNum(); j++) {
                    String value = "";
//                    System.out.println(row.getCell(0).getCellType());
                    switch (row.getCell(j).getCellType()) {
                        case FORMULA:
                            value = row.getCell(j).getCellFormula();
                            break;
                        case NUMERIC:
                            value = String.valueOf(new Double(row.getCell(j).getNumericCellValue()).intValue());//실수형 데이터가 정수형으로 나오도록
                            break;
                        case STRING:
                            value = row.getCell(j).getStringCellValue() + "";
                            break;
                        case BLANK:
                            value = row.getCell(j).getBooleanCellValue() + "";
                            break;
                        case ERROR:
                            value = row.getCell(j).getErrorCellValue() + "";
                            break;
                    }
                    rowlist.add(value);
                }
                excelList.add(rowlist);
            }

        }
        return excelList;
    }

    //프로젝트 데이터 가져오기
    @ResponseBody
    @RequestMapping("Get_ProjectDetail")
    public HashMap<String, ArrayList> Get_ProjectDetail(@RequestParam(value = "pcode") String pcode) throws Exception {
        HashMap<String, ArrayList> hs = new HashMap<>();

        ArrayList<ContactTypeVo> clist = cService.GetContactType(pcode);
        ArrayList<ContactTypeVo> tlist = cService.GetContactType(pcode);
        ArrayList<ResultCodeVo> rlist = cService.GetContactResult(pcode);
        ArrayList<DivisionCodeVo> dlist = cService.GetContactDivision(pcode);
        ArrayList<KonCodeVo> klist = cService.GetContactKonCode(pcode);
        hs.put("tlist", tlist);
        hs.put("rlist", rlist);
        hs.put("dlist", dlist);
        hs.put("klist", klist);

        return hs;
    }

    //결과코드 수정
    @ResponseBody
    @RequestMapping("Modify_ResultCode")
    public int Modify_ResultCode(@RequestParam(value = "PCODE", required = false) String pcode,
                                 @RequestParam(value = "result_code", required = false) String result_data,
                                 HttpSession sess) throws Exception {

        System.out.println(pcode);
        System.out.println(result_data);

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
        ArrayList<ResultCodeVo> rlist = new ArrayList<>();

        JSONArray jsonArr = (JSONArray) new JSONParser().parse(result_data);

        for (int i = 0; i < jsonArr.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr.get(i);
            rlist.add(new ResultCodeVo((String) jsonObj.get("Rcode"), (String) jsonObj.get("Rname"), Integer.parseInt(jsonObj.get("Pcode").toString())));
        }
        int result = cService.Modify_ResultCode(pcode, rlist);
        cService.ContactProjectLog(loginUser, "결과코드 수정");
        return 1;
    }

    //등록된 리스트 가져오기
    @ResponseBody
    @RequestMapping("GetList")
    public ArrayList<ListDataVo> GetList(@RequestParam(value = "PCODE", required = false) String pcode) throws Exception {
        ArrayList<ListDataVo> rlist = cService.GetList(pcode);

        return rlist;
    }

    //분류코드 수정
    @ResponseBody
    @RequestMapping("Modify_DivisionCode")
    public int Modify_DivisionCode(@RequestParam(value = "list_data", required = false) String list_data,
                                   @RequestParam(value = "type_data", required = false) String type_data,
                                   @RequestParam(value = "division_data", required = false) String division_data,
                                   @RequestParam(value = "description", required = false) String description,
                                   @RequestParam(value = "Listid_arr", required = false) ArrayList<String> listid_arr,
                                   @RequestParam(value = "pcode", required = false) int pcode,
                                   HttpSession sess) throws Exception {

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
        ArrayList<ListDataVo> list = new ArrayList<>();
        ArrayList<ContactTypeVo> tlist = new ArrayList<>();
        ArrayList<DivisionCodeVo> dlist = new ArrayList<>();

        JSONArray jsonArr = (JSONArray) new JSONParser().parse(list_data);
        JSONArray jsonArr2 = (JSONArray) new JSONParser().parse(type_data);
        JSONArray jsonArr3 = (JSONArray) new JSONParser().parse(division_data);

        //리스트 데이터
        for (int i = 0; i < jsonArr.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr.get(i);
            int order = (i + 1) % jsonArr2.size() == 0 ? jsonArr2.size() : (i + 1) % jsonArr2.size();
            list.add(new ListDataVo((String) jsonObj.get("list_id"), (String) jsonObj.get("list_data"), (String) jsonObj.get("list_type"), null, order, pcode));
        }

        //리스트 타입
        for (int i = 0; i < jsonArr2.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr2.get(i);
            tlist.add(new ContactTypeVo((String) jsonObj.get("Header"), (String) jsonObj.get("Type"), (String) jsonObj.get("Division_status"), (i + 1), pcode));
        }

        //분류코드
        for (int i = 0; i < jsonArr3.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr3.get(i);
            dlist.add(new DivisionCodeVo((String) jsonObj.get("Dorder"), (String) jsonObj.get("Dcode"), (String) jsonObj.get("Dname"), (String) jsonObj.get("Dheader"), pcode));
        }
//        System.out.println(list);
//        System.out.println(tlist);
//        System.out.println(dlist);
//        System.out.println(listid_arr);
        int result = cService.Modify_DivisionCode(pcode, list, tlist, dlist, listid_arr);
        cService.ContactProjectLog(loginUser, description);
        return 1;
    }

    /*K-ON 연동 리스트 (검색)*/
    @ResponseBody
    @RequestMapping("SearchKonList")
    public ArrayList<KonProjectVo> SearchKonList(@RequestParam(value = "inputVal") String inputVal) {

        ArrayList<KonProjectVo> kList = cService.KonList(inputVal);

        return kList;
    }

    /*프로젝트 정보 수정*/
    @ResponseBody
    @RequestMapping("ModifyInfo")
    public int ModifyProjectInfo(@RequestParam(value = "projectName") String projectName,
                                 @RequestParam(value = "intranetCode") String intranetCode,
                                 @RequestParam(value = "konCode", required = false) String konCode,
                                 @RequestParam(value = "pcode") String pcode,
                                 HttpSession sess) {

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
//        if(konCode == null) konCode = "";

        ContactProject cp = new ContactProject(projectName, intranetCode);
        cp.setKon_code(konCode);
        cp.setCode(pcode);

        int result = cService.ModifyProjectInfo(cp);
        cService.ContactProjectLog(loginUser, "프로젝트 정보 수정");
        return result;
    }

    /*K-ON 파일 코딩*/
    @ResponseBody
    @RequestMapping("KonSetting")
    public String KonSetting(@RequestParam(value = "konCode") String konCode,
                             @RequestParam(value = "konType[]") ArrayList<String> konType,
                             @RequestParam(value = "projectCode") String pcode
    ) throws IOException {
        //D:\workspace\kon
        String dir = "D:\\KON_D\\project\\" + konCode + "\\SurveyEnd.asp";
        String originalDir = "D:\\KON_D\\project\\" + konCode + "\\SurveyEnd_original.asp";
        String newDir = "D:\\KON_D\\project\\" + konCode + "\\SurveyEnd_copy.asp";
        File endPage = new File(dir);
        File original = new File(originalDir);
        File newEndPage = new File(newDir);
        if (!original.exists()) {
            FileCopyUtils.copy(endPage, original);
        }
//
        if (!newEndPage.exists()) {
            newEndPage.createNewFile();
        }

        BufferedReader reader = new BufferedReader(new FileReader(original));
        PrintWriter writer = new PrintWriter(new FileWriter(newEndPage));
        String str, query;

        while ((str = reader.readLine()) != null) {

            if ("IF PAGENAME = \"END\" or PAGENAME = \"SCREEN\" or PAGENAME = \"QUOTA\" THEN".equals(str.trim())) {
                writer.println("\tDim SQL, Rcset, cnt\n");
//                writer.println(str);
            }
            if ("<%IF PAGENAME = \"END\"  THEN%>".equals(str.trim())) {

                writer.println(str);
                if (!konType.get(0).equals("")) {
                    query = "";
                    query += "\t\t\t\t\t\t\t\t\t<%\n";
                    query += "\t\t\t\t\t\t\t\t\t\tSQL = \" update Contact.dbo.CONTACT_STATUS set Cresult = '" + konType.get(0) + "', Ctime = getdate() where project_code = '" + pcode + "' and list_id = '\" & IDKEY & \"'\"\n";
                    query += "\t\t\t\t\t\t\t\t\t\tDBConn.Execute SQL, cnt\n";
                    query += "\t\t\t\t\t\t\t\t\t%>";

                    writer.println(query);
                }
            } else if ("<%ELSEIF PAGENAME = \"SCREEN\" THEN%>".equals(str.trim())) {
                writer.println(str);
                if (!konType.get(1).equals("")) {
                    query = "";
                    query += "\t\t\t\t\t\t\t\t\t<%\n";
                    query += "\t\t\t\t\t\t\t\t\t\tSQL = \" update Contact.dbo.CONTACT_STATUS set Cresult = '" + konType.get(1) + "', Ctime = getdate() where project_code = '" + pcode + "' and list_id = '\" & IDKEY & \"'\"\n";
                    query += "\t\t\t\t\t\t\t\t\t\tDBConn.Execute SQL, cnt\n";
                    query += "\t\t\t\t\t\t\t\t\t%>";

                    writer.println(query);
                }

            } else if ("<%ELSEIF PAGENAME = \"QUOTA\" THEN%>".equals(str.trim())) {
                writer.println(str);
                if (!konType.get(2).equals("")) {
                    query = "";
                    query += "\t\t\t\t\t\t\t\t\t<%\n";
                    query += "\t\t\t\t\t\t\t\t\t\tSQL = \" update Contact.dbo.CONTACT_STATUS set Cresult = '" + konType.get(2) + "', Ctime = getdate() where project_code = '" + pcode + "' and list_id = '\" & IDKEY & \"'\"\n";
                    query += "\t\t\t\t\t\t\t\t\t\tDBConn.Execute SQL, cnt\n";
                    query += "\t\t\t\t\t\t\t\t\t%>";

                    writer.println(query);
                }
            } else {
                writer.println(str);
            }

            writer.flush();
        }

        writer.close();
        reader.close();

        if (endPage.exists()) {
            if (endPage.delete()) {
                System.out.println("파일 삭제 성공");
            } else {
                System.out.println("파일 삭제 실패");
            }

            if (newEndPage.renameTo(endPage)) {
                System.out.println("파일 변경 성공");
            } else {
                System.out.println("파일 변경 성공");
            }
        }
        return "";
    }

    /*K-ON 연동 수정*/
    @ResponseBody
    @RequestMapping("Modify_KonCode")
    public int Modify_KonCode(@RequestParam(value = "pcode", required = false) String pcode,
                              @RequestParam(value = "konCode", required = false) String konCode,
                              @RequestParam(value = "description", required = false) String description,
                              @RequestParam(value = "konType", required = false) ArrayList<String> konType,
                              HttpSession sess) throws IOException {
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

        int result = cService.Modify_KonLinkCode(pcode, konType, konCode);
        KonSetting(konCode, konType, pcode);
        cService.ContactProjectLog(loginUser, description);
        return result;
    }

    /*컨택 매칭 뷰 이동*/
    @RequestMapping("MatchingView")
    public String ContactMatchingView(@RequestParam(value = "prjCode", required = false) String prjCode,
                                      @RequestParam(value = "listId", required = false) String listId,
                                      Model model, HttpSession sess) {
        sess.removeAttribute("diviArr");

        if(prjCode != null && listId != null){
            int resultCode = cService.getStatusResult(prjCode, listId);

            if(resultCode == 999){
                cService.resultCodeReset(prjCode, listId);
            }
        }


        ArrayList<ContactProject> cList = cService.ContactList(null, null);
        model.addAttribute("cList", cList);

        return "contactMatching";
    }

    /*분류코드 가져오기*/
    @ResponseBody
    @RequestMapping("GetDivisionCode")
    public ArrayList<Object> GetDivisionCode(@RequestParam(value = "pcode", required = false) String pcode) {
        ArrayList<DivisionCodeVo> dList = cService.GetDivisionCode(pcode);

        LinkedHashSet<String> divicode = new LinkedHashSet();
        ArrayList<ArrayList<String>> divicode2 = new ArrayList<>();
        ArrayList<Object> divilist = new ArrayList<>();

        for (DivisionCodeVo a : dList) {
            divicode.add(a.getDname());
        }

        //for(int i=1; i<=divicode.size(); i++){
        Iterator<String> itr = divicode.iterator();
        while (itr.hasNext()) {
            String header = itr.next();
            ArrayList<String> cList = new ArrayList<>();
            for (DivisionCodeVo a : dList) {
                if (a.getDname().equals(header)) cList.add(a.getDheader());
            }
            divicode2.add(cList);
        }
        divilist.add(divicode);
        divilist.add(divicode2);

        System.out.println(divicode);
        System.out.println(divicode2);
        return divilist;
    }

    /*ip 추출*/
    public static String getClientIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    /*컨택페이지 이동*/
    @RequestMapping("details/{projectCode}/{listid}")
    public String ContactView(@PathVariable("projectCode") int prjCode,
                              @PathVariable("listid") String listId,
                              Model model, HttpSession sess,
                              HttpServletRequest req) {
//        System.out.println(prjCode +" - " + listId);
        String ip = getClientIpAddr(req);
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

        if(ip.substring(0, 8).equals("10.10.17")){
            ip = "10.10.13.177";
        }

//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println(ip);
        ClientVo cv = cService.GetClientInfo(ip);
//        System.out.println(cv + "<<< CV ★☆★☆★☆★☆★☆★☆★☆");

        ListDataVo ld = new ListDataVo();
        ld.setPrj_code(prjCode);
        ld.setList_id(listId);

        ArrayList<ListDataVo> dList = cService.GetListInfo(ld);
        ArrayList<ResultCodeVo> rList = cService.GetContactResult(Integer.toString(prjCode));
        ArrayList<ContactModifyVo> cmList = cService.GetContactModifyList(ld);
        ArrayList<ResultLogVo> rlList = cService.GetContactResultList(ld, loginUser);
        ArrayList<CMSTypeVo> cmsList = cmsService.GetCMSType(Integer.toString(prjCode));
        ArrayList<CallLogVo> clList = cService.GetCallLog(ld);
        ArrayList<SendEmailLogVo> selList = cService.GetEmailLog(ld);
        ArrayList<SendSmsLogVo> sslList = cService.GetSmsLog(ld);

        int result = cService.ContactResult_Add(999, "진행중", prjCode, listId, loginUser);
        for (ResultLogVo rv : rlList) {
            rv.setContent(rv.getContent().replaceAll("\n", "<br>"));
        }

//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println(dList);

        model.addAttribute("dList", dList)
                .addAttribute("rList", rList)
                .addAttribute("cmList", cmList)
                .addAttribute("rlList", rlList)
                .addAttribute("cmsList", cmsList)
                .addAttribute("clList", clList)
                .addAttribute("selList", selList)
                .addAttribute("sslList", sslList)
                .addAttribute("prjCode", prjCode)
                .addAttribute("cv", cv)
                .addAttribute("listId", listId);

        return "contact";
    }

    /*컨택 리스트 검색 데이터 가져오기*/
    @ResponseBody
    @RequestMapping("GetListInfo")
    public ArrayList<ListDataVo> GetListInfo(@RequestParam(value = "prjCode", required = false) int prjCode,
                                             @RequestParam(value = "listId", required = false) String listId
    ) {
        ListDataVo ld = new ListDataVo();
        ld.setPrj_code(prjCode);
        ld.setList_id(listId);

        ArrayList<ListDataVo> dList = cService.GetListInfo(ld);

        return dList;
    }

    /*컨택 랜덤 리스트 가져오기*/
    @ResponseBody
    @RequestMapping(value = "GetRandomList", produces = "application/text; charset=UTF-8")
    public String GetRandomList(@RequestParam(value = "prjCode", required = false) int prjCode,
                                @RequestParam(value = "divi_arr", required = false) String diviArr,
                                HttpSession sess, HttpServletRequest res
    ) throws Exception {
        ArrayList<DivisionCodeVo> dlist = new ArrayList<>();
        JSONArray jsonArr = null;
//        System.out.println(">>>>>>>>>>>" + sess);
//        System.out.println(">>>>>>>>>>>" + sess.getAttribute("diviArr"));
        if(sess.getAttribute("diviArr") == null){
            jsonArr = (JSONArray) new JSONParser().parse(diviArr);
        }else{
            jsonArr = (JSONArray) new JSONParser().parse((String) sess.getAttribute("diviArr"));
        }

        //header: 컬럼명, dname: 선택값, code: 옵션컬럼명값(별칭)
        for (int i = 0; i < jsonArr.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr.get(i);
            DivisionCodeVo dcv = new DivisionCodeVo();
            dcv.setDheader((String) jsonObj.get("header"));
            dcv.setDname((String) jsonObj.get("dname"));
            dcv.setDcode((String) jsonObj.get("code"));
            dlist.add(dcv);
        }

        String listId = cService.GetRandomList(dlist, prjCode);

        res.setCharacterEncoding("UTF-8");

        if (listId == null) {
            return null;
        }else {
            if(sess.getAttribute("diviArr") == null) sess.setAttribute("diviArr", diviArr);
            else sess.setAttribute("diviArr", sess.getAttribute("diviArr"));


            return listId;
        }
    }

    /*컨택리스트 정보수정*/
    @ResponseBody
    @RequestMapping("ContactListModify")
    public int ContactListModify(@RequestParam(value = "prjCode", required = false) int prjCode,
                                 @RequestParam(value = "listId", required = false) String listid,
                                 @RequestParam(value = "data_arr", required = false) String dataArr,
                                 HttpSession sess) throws Exception {
        int result2 = 0;
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

        ArrayList<ContactModifyVo> dlist = new ArrayList<>();
//
        JSONArray jsonArr = (JSONArray) new JSONParser().parse(dataArr);
//
        for (int i = 0; i < jsonArr.size(); i++) {
            JSONObject jsonObj = (JSONObject) jsonArr.get(i);
            ContactModifyVo ldv = new ContactModifyVo();
            ldv.setList_type((String) jsonObj.get("type"));
            ldv.setBefore_data((String) jsonObj.get("before"));
            ldv.setAfter_data((String) jsonObj.get("after"));
            ldv.setList_order(Integer.parseInt((String) jsonObj.get("order")));
            dlist.add(ldv);
        }
//        System.out.println(loginUser);

        int result = cService.ContactListModify(dlist, listid, prjCode);


        if (result > 0) {
            result2 = cService.ContactListModify_LOG(dlist, listid, prjCode, loginUser);
        } else {
            result2 = -1;
        }
        return result2;
    }

    /*컨택 결과 추가*/
    @ResponseBody
    @RequestMapping("ContactResult_Add")
    public int ContactResult_Add(@RequestParam(value = "prjCode", required = false) int prjCode,
                                 @RequestParam(value = "listId", required = false) String listid,
                                 @RequestParam(value = "chk_result", required = false) int result_code,
                                 @RequestParam(value = "text_result", required = false) String content,
                                 HttpSession sess) throws Exception {
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
//        System.out.println(result_code);
//        System.out.println(content);
//        System.out.println(prjCode);
//        System.out.println(listid);


        int result = cService.ContactResult_Add(result_code, content, prjCode, listid, loginUser);
        System.out.println(result + "result값");
//        if(listId == null) return null;
//        else return listId;
        return result;
    }

    /*차트데이터*/
    @ResponseBody
    @RequestMapping("Get_ChartData")
    public HashMap<String, Object> Get_ChartData(@RequestParam(value = "prj_code", required = false) int prjCode,
                                                 HttpSession sess) throws Exception {
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");


        ArrayList<ContactGraphVo> dclist = cService.Get_ChartData(prjCode, loginUser);//일자별 데이터
        ArrayList<ContactGraphVo> cslist = cService.Get_ChartData2(prjCode);//컨택현황
        ArrayList<ContactGraphVo> mlist = cService.Get_ChartData3(prjCode, loginUser);//컨택현황
        //오늘 날짜 컨택
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("dclist", dclist);
        hs.put("cslist", cslist);
        hs.put("mlist", mlist);

//        System.out.println(result + "result값");
//        if(listId == null) return null;
//        else return listId;
        return hs;
    }

    /*전화 로그*/
    @ResponseBody
    @RequestMapping("Calling_Log")
    public int Calling_Log(@RequestParam(value = "prj_code", required = false) int prjCode,
                           @RequestParam(value = "list_id", required = false) String list_id,
                           @RequestParam(value = "callNumber", required = false) String callNumber,
                           @RequestParam(value = "start_time", required = false) String start_time,
                           @RequestParam(value = "end_time", required = false) String end_time,
                           HttpSession sess) throws Exception {

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");
        String endTime = end_time.split(":")[0] + "분 " + end_time.split(":")[1] + "초";
//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
        SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startTime = fm.parse(start_time);
//        System.out.println(startTime);

        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prj_code", prjCode);
        hs.put("list_id", list_id);
        hs.put("callNumber", callNumber);
        hs.put("loginUser", loginUser);
        hs.put("start_time", start_time);
        hs.put("end_time", endTime);

        int result = cService.Calling_Log(hs);

//        ArrayList<ContactGraphVo> dclist = cService.Get_ChartData(prjCode);//일자별 데이터
//        ArrayList<ContactGraphVo> cslist = cService.Get_ChartData2(prjCode);//컨택현황
//        ArrayList<ContactGraphVo> mlist = cService.Get_ChartData3(prjCode);//컨택현황
//        //오늘 날짜 컨택

//        System.out.println(result + "result값");
//        if(listId == null) return null;
//        else return listId;
        return result;
    }

    //컨택 데이터(로그) 가져오기 (ajax)
    @ResponseBody
    @RequestMapping("getDetails")
    public HashMap<String, ArrayList> getDetails(@RequestParam("projectCode") int prjCode,
                                                 @RequestParam("listid") String listId,
                                                 Model model, HttpSession sess,
                                                 HttpServletRequest req) {
        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

        ListDataVo ld = new ListDataVo();
        ld.setPrj_code(prjCode);
        ld.setList_id(listId);

        ArrayList<ListDataVo> dList = cService.GetListInfo(ld);
        ArrayList<ResultCodeVo> rList = cService.GetContactResult(Integer.toString(prjCode));
        ArrayList<ContactModifyVo> cmList = cService.GetContactModifyList(ld);
        ArrayList<ResultLogVo> rlList = cService.GetContactResultList(ld, loginUser);
        ArrayList<CMSTypeVo> cmsList = cmsService.GetCMSType(Integer.toString(prjCode));
        ArrayList<CallLogVo> clList = cService.GetCallLog(ld);
        ArrayList<SendEmailLogVo> selList = cService.GetEmailLog(ld);
        ArrayList<SendSmsLogVo> sslList = cService.GetSmsLog(ld);

        for (ResultLogVo rv : rlList) {
            rv.setContent(rv.getContent().replaceAll("\n", "<br>"));
        }

//        System.out.println("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
//        System.out.println(dList);

        HashMap<String, ArrayList> hs = new HashMap<>();

        hs.put("dList", dList);
        hs.put("rList", rList);
        hs.put("cmList", cmList);
        hs.put("rlList", rlList);
        hs.put("cmsList", cmsList);
        hs.put("clList", clList);
        hs.put("selList", selList);
        hs.put("sslList", sslList);


        return hs;
    }

    // 메일 보내기
    @RequestMapping("emailSend")
    @ResponseBody
    public String emailSend(@RequestParam("prjCode") String prjCode,
                            @RequestParam("listid") String listId,
                            @RequestParam("subject") String subject,
                            @RequestParam("sender") String sender,
                            @RequestParam("receiver") String receiver,
                            @RequestParam("content") String content,
                            @RequestParam("fileName") String fileName,
                            HttpSession sess) throws Exception {

            UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

            String result = "success";

            email.setSender(sender);
            email.setReceiver(receiver);
            email.setSubject(subject);
            email.setContent(content);
            email.setFileName(fileName);
            
            //메일 보내기
            try {
                emailSender.SendEmail(email, prjCode);
            }catch (Exception e){
                result = "fail";
                System.out.println(e);
            }


            //메일 로그
            HashMap<String, Object> hs = new HashMap<>();
            hs.put("prjCode", prjCode);
            hs.put("loginUser", loginUser);
            hs.put("listId", listId);
            hs.put("email", email);

            int result2 = cService.SendEmailLog(hs);

            if(result2 < 1) result = "fail";

            return result;
    }

    /*컨택값 체크*/
    @ResponseBody
    @RequestMapping("ListStatusChk")
    public int ListStatusChk(@RequestParam(value = "prjCode", required = false) String prjCode,
                                      @RequestParam(value = "listId", required = false) String listId) {

        int resultCode = cService.getStatusResult(prjCode, listId);

        return resultCode;
    }

    @ResponseBody
    @RequestMapping("resultCodeReset")
    public void resultCodeReset(@RequestParam(value = "prjCode", required = false) String prjCode,
                             @RequestParam(value = "listId", required = false) String listId) {

        if(prjCode != null && listId != null){
            int resultCode = cService.getStatusResult(prjCode, listId);

            if(resultCode == 999){
                cService.resultCodeReset(prjCode, listId);
            }
        }
    }

    // 문자 보내기
    @RequestMapping("smsSend")
    @ResponseBody
    public String smsSend(@RequestParam("prjCode") String prjCode,
                            @RequestParam("listid") String listId,
//                            @RequestParam("sender") String sender,
                            @RequestParam("receiver") String receiver,
                            @RequestParam("content") String content,
                            HttpSession sess) throws Exception {

        UserVo loginUser = (UserVo) sess.getAttribute("loginUser");

        String result = "success";

        naverSMSApi.sendSMS(receiver, content);


        //메일 로그
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prjCode", prjCode);
        hs.put("loginUser", loginUser);
        hs.put("listId", listId);
        hs.put("receiver", receiver);
        hs.put("content", content);

        int result2 = cService.SendSmsLog(hs);

        if(result2 < 1) result = "fail";

        return result;
    }
}



