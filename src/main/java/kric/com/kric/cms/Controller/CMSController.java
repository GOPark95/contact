package kric.com.kric.cms.Controller;

import kric.com.kric.cms.model.service.CMSSerivce;
import kric.com.kric.cms.model.vo.*;
import kric.com.kric.contact.model.service.ContactService;
import kric.com.kric.contact.model.vo.ContactProject;
import kric.com.kric.contact.model.vo.IntranetProjectListVo;
import kric.com.kric.user.model.vo.UserVo;
import org.apache.commons.io.FilenameUtils;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.UUID;

@Controller
public class CMSController {

    @Autowired
    private ContactService cService;

    @Autowired
    private CMSSerivce cmsService;

    /*메인 view*/
    @RequestMapping("SettingMain")
    public String MainView(Model model){
        ArrayList<ContactProject> cList = cService.ContactList(null, null);
        model.addAttribute("cList", cList);

        return "cmsSet";
    }
    
    /*이메일/문자 변수 가져오기*/
    @ResponseBody
    @RequestMapping("GetVariable")
    public ArrayList<CMSSettingVo> GetVariable(@RequestParam(value="prj_code", required = false) String prj_code,
                                               @RequestParam(value="Type", required = false) String vtype,
                                               Model model){
        System.out.println(vtype);
        ArrayList<CMSSettingVo> csList = cmsService.GetVariable(prj_code, vtype);
        return csList;
    }

    /*이메일/문자 세팅 타입 추가하기*/
    @ResponseBody
    @RequestMapping("CMS_SET_INSERT")
    public int CMS_SET_INSERT(@RequestParam(value="prjcode", required = false) String prj_code,
                                 @RequestParam(value="cmstype", required = false) String cmstype,
                                 @RequestParam(value="typename", required = false) String typename,
                                 @RequestParam(value="sender", required = false) String sender,
                                 @RequestParam(value="content", required = false) String content,
                                 @RequestParam(value="select_variable", required = false) String[] select_variable,
                                 @RequestParam(value="cmsfile", required = false) MultipartFile[] cmsFile,
                                 Model model, HttpServletRequest req, HttpSession sess) throws UnsupportedEncodingException {

        UserVo loginUser = (UserVo)sess.getAttribute("loginUser");
        HashMap hs = new HashMap();
        hs.put("prjcode", prj_code);
        hs.put("typename", typename);
        hs.put("cmstype", cmstype);
        hs.put("sender", sender);
        hs.put("select_variable", select_variable);
        hs.put("content", content);
        hs.put("cmsfile", cmsFile);
        hs.put("logText", "추가");
        hs.put("loginUser", loginUser);

        //파일 저장
        if(cmsFile.length > 0) {
            String root = req.getSession().getServletContext().getRealPath("resources");
            String savePath = root + "\\CMS-Files\\" + prj_code;

            File folder = new File(savePath);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            ArrayList<String> flist = new ArrayList<>();
            for (MultipartFile mf : cmsFile) {
                try {
                    mf.transferTo(new File(savePath  + "\\" + mf.getOriginalFilename()));
                } catch (IllegalStateException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                flist.add(mf.getOriginalFilename());
            }
            hs.put("cmsFile", flist);
        }
//
//        System.out.println(prj_code);
//        System.out.println(typename);
//        System.out.println(cmstype);
//        System.out.println(sender);
//        System.out.println(select_variable.length);
//        System.out.println(hs);
//        System.out.println(Arrays.deepToString((Object[]) hs.get("select_variable")));
//        System.out.println(content.replace("/TEMP/", ""));

        int result = 0, result2 = 0, result3 = 0, result4 = 0;
        result = cmsService.CMS_SET_INSERT(hs);
        if(cmsFile.length > 0) result2 = cmsService.CMS_SET_INSERT_FILE(hs);
        if(select_variable.length > 0) result3 = cmsService.CMS_SET_INSERT_VARIABLE(hs);
        result4 = cmsService.CMS_SET_INSERT_LOG(hs);

        return result4;
//        return 1;
    }

    /*이메일/문자 타입 가져오기*/
    @ResponseBody
    @RequestMapping("GetCMSType")
    public ArrayList<CMSTypeVo> GetCMSType(@RequestParam(value="prj_code", required = false) String prj_code,
                                           Model model, HttpSession sess){
        ArrayList<CMSTypeVo> csList = cmsService.GetCMSType(prj_code);
        sess.setAttribute("projectCode", prj_code);
        return csList;
    }

    /*이메일/문자 변수 데이터 가져오기*/
    @ResponseBody
    @RequestMapping("CMS_GET_INFO")
    public HashMap<String, Object> CMS_GET_INFO(@RequestParam(value="prj_code", required = false) String prj_code,
                                             @RequestParam(value="cms_code", required = false) String cms_code,
                                             @RequestParam(value="cms_type", required = false) String cms_type,
                                             Model model, HttpSession sess){

        if(cms_code.equals("add")) {
            return null;
        }else{
            HashMap hs = new HashMap();
            hs.put("prj_code", prj_code);
            hs.put("cms_code", cms_code);
            hs.put("cms_type", cms_type);

            ArrayList<CMSInfoVo> csList = cmsService.CMS_GET_INFO(hs);
            ArrayList<CMSVariableVo> csVariList = cmsService.CMS_GET_VARIABLE(hs);
            ArrayList<CMSFileVo> csFileList = cmsService.CMS_GET_FILE(hs);

            HashMap result = new HashMap();
            result.put("csList", csList);
            result.put("csVariList", csVariList);
            result.put("csFileList", csFileList);

//            sess.setAttribute("typeCode", cms_code);

            return result;
        }

    }

    //에디터 이미지 저장
    @ResponseBody
    @RequestMapping(value = "CK_IMAGE_UPLOAD", method = RequestMethod.POST)
    public JSONObject CK_IMAGE_UPLOAD(@RequestParam(value="upload", required = false) MultipartFile[] editorFile,
                                      MultipartHttpServletRequest req,
                                      Model model) throws IOException {
        JSONObject mv = new JSONObject();

        String imgPath = null, projectCode = "", typeCode = "";

        projectCode = (String)req.getSession().getAttribute("projectCode");
//        typeCode = (String)req.getSession().getAttribute("typeCode");
        if(projectCode == null) return null;
//        System.out.println(projectCode + "<<<>>>" + typeCode);
        for(MultipartFile cf : editorFile){
            String originFileName = cf.getOriginalFilename(); // 원본 파일 명
            String ext = FilenameUtils.getExtension(originFileName);
            String newInfImgFileName = "img_" + UUID.randomUUID() + "." + ext;

            String root = req.getSession().getServletContext().getRealPath("resources");
//            String savePath = root + "\\CMS-img-Files\\" + projectCode + "\\" + typeCode + "\\";
            String saveTempPath = root + "\\CMS-img-Files\\" + projectCode + "\\";

//            File folder = new File(savePath);
            File tempfolder = new File(saveTempPath);

//            if (!folder.exists()) folder.mkdirs();
            if (!tempfolder.exists()) tempfolder.mkdirs();

            imgPath = "https://contact.kric.com:7070/resources/CMS-img-Files/" + projectCode + "/" + newInfImgFileName;

            cf.transferTo(new File(saveTempPath + "\\" + newInfImgFileName));

            mv.put("uploaded", true);
            mv.put("url", imgPath);
        }

        System.out.println(mv);

        return mv;
    }

    /*이메일/문자 세팅 타입 수정하기*/
    @ResponseBody
    @RequestMapping("CMS_SET_MODIFY")
    public int CMS_SET_MODIFY(@RequestParam(value="prjcode", required = false) String prj_code,
                              @RequestParam(value="cmscode", required = false) String cmscode,
                              @RequestParam(value="cmstype", required = false) String cmstype,
                              @RequestParam(value="typename", required = false) String typename,
                              @RequestParam(value="sender", required = false) String sender,
                              @RequestParam(value="content", required = false) String content,
                              @RequestParam(value="select_variable", required = false) String[] select_variable,
                              @RequestParam(value="cmsfile", required = false) MultipartFile[] cmsFile,
                              @RequestParam(value="deleteFile", required = false) String deleteFile,
                              Model model, HttpServletRequest req, HttpSession sess) throws UnsupportedEncodingException {

        UserVo loginUser = (UserVo)sess.getAttribute("loginUser");
        HashMap hs = new HashMap();
        hs.put("prjcode", prj_code);
        hs.put("cmscode", cmscode);
        hs.put("typename", typename);
        hs.put("cmstype", cmstype);
        hs.put("sender", sender);
        hs.put("select_variable", select_variable);
        hs.put("content", content);
        hs.put("cmsfile", cmsFile);
        hs.put("deleteFile", deleteFile);
        hs.put("logText", "수정");
        hs.put("loginUser", loginUser);

        if(deleteFile.length() > 0){
            ArrayList<CMSFileVo> fnlist = cmsService.CMS_REMOVE_FILE(hs);

            if(fnlist.size() > 0){
                for(CMSFileVo cf : fnlist){
                    String root = req.getSession().getServletContext().getRealPath("resources");
                    String savePath = root + "\\CMS-Files\\" + prj_code + "\\" + cf.getName();

                    File file = new File(savePath);
                    file.delete();
                }
            }
        }

        //파일 저장
        if(cmsFile.length > 0) {
            String root = req.getSession().getServletContext().getRealPath("resources");
            String savePath = root + "\\CMS-Files\\" + prj_code;

            File folder = new File(savePath);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            ArrayList<String> flist = new ArrayList<>();
            for (MultipartFile mf : cmsFile) {
                try {
                    mf.transferTo(new File(savePath  + "\\" + mf.getOriginalFilename()));
                } catch (IllegalStateException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                flist.add(mf.getOriginalFilename());
            }
            hs.put("cmsFile", flist);
        }
//
//        System.out.println(prj_code);
//        System.out.println(typename);
//        System.out.println(cmstype);
//        System.out.println(sender);
//        System.out.println(select_variable.length);
//        System.out.println(hs);
//        System.out.println(Arrays.deepToString((Object[]) hs.get("select_variable")));
//        System.out.println(content.replace("/TEMP/", ""));

        int result = 0, result2 = 0, result3 = 0, result4 = 0;
        result = cmsService.CMS_SET_MODIFY(hs);
        if(cmsFile.length > 0) result2 = cmsService.CMS_SET_INSERT_FILE(hs);
        if(select_variable.length > 0) result3 = cmsService.CMS_SET_MODIFY_VARIABLE(hs);
        result4 = cmsService.CMS_SET_INSERT_LOG(hs);

        return result4;
//        return 1;
    }

}
