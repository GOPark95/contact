package kric.com.kric.contact.model.service;

import kric.com.kric.common.email.Email;
import kric.com.kric.common.vo.PageInfo;
import kric.com.kric.contact.model.dao.ContactDao;
import kric.com.kric.contact.model.vo.*;
import kric.com.kric.user.model.vo.UserVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class ContactServiceImpl implements ContactService{

    @Autowired
    private ContactDao contactDao;

    @Autowired
    @Resource(name = "sqlSessionTemplate2")
    private SqlSessionTemplate sqlSession2;

    @Autowired
    @Resource(name = "sqlSessionTemplate3")
    private SqlSessionTemplate sqlSession3;

    @Autowired
    @Resource(name = "sqlSessionTemplate4")
    private SqlSessionTemplate sqlSession4;

    @Override
    public ArrayList<ContactProject> ContactList(PageInfo pi, SearchOptionVo sv) {
        return contactDao.ContactList(sqlSession3, pi, sv);
    }

    @Override
    public ArrayList<IntranetProjectListVo> IntranetList(String inputVal) {
        return contactDao.IntranetList(sqlSession2, inputVal);
    }


    @Transactional(rollbackFor = {RuntimeException.class, Exception.class})
    @Override
    public int ContactInsert(ContactProject cp, ArrayList<ResultCodeVo> rlist, ArrayList<DivisionCodeVo> dlist, ArrayList<ListDataVo> list, ArrayList<ContactTypeVo> tlist, ArrayList<String> listid_arr, ArrayList<String> konType) throws Exception {
        contactDao.ContactInsert(sqlSession3, cp);
        contactDao.ContactInsert_ResultCode(sqlSession3, rlist);
        if(dlist.size() > 0) contactDao.ContactInsert_DivisionCode(sqlSession3, dlist);
        contactDao.ContactInsert_ContactList(sqlSession3, list);
        contactDao.ContactInsert_ContactType(sqlSession3, tlist);
        contactDao.ContactInsert_ContactStatus(sqlSession3, listid_arr);
        if(cp.getKon_code() != null) contactDao.ContactInsert_KonType(sqlSession3, konType);
        return 1;
    }

    @Override
    public int ContactListCount(SearchOptionVo sv) {
        return contactDao.ContactListCount(sqlSession3, sv);
    }

    @Override
    public ArrayList<ContactTypeVo> GetContactType(String pcode) {
        return contactDao.GetContactType(sqlSession3, pcode);
    }

    @Override
    public ArrayList<ResultCodeVo> GetContactResult(String pcode) {
        return contactDao.GetContactResult(sqlSession3, pcode);
    }

    @Override
    public ArrayList<DivisionCodeVo> GetContactDivision(String pcode) {
        return contactDao.GetContactDivision(sqlSession3, pcode);
    }

    @Override
    public int Modify_ResultCode(String pcode, ArrayList<ResultCodeVo> rlist) {
        contactDao.Delete_ResultCode(sqlSession3, pcode);
        return contactDao.Modify_ResultCode(sqlSession3, rlist);
    }

    @Override
    public ArrayList<ListDataVo> GetList(String pcode) {
        return contactDao.GetList(sqlSession3, pcode);
    }

    @Override
    public int Modify_DivisionCode(int pcode, ArrayList<ListDataVo> list, ArrayList<ContactTypeVo> tlist, ArrayList<DivisionCodeVo> dlist, ArrayList<String> listid_arr) {
        contactDao.Delete_DivisionCode(sqlSession3, pcode);

        return contactDao.Modify_DivisionCode(sqlSession3, pcode, list, tlist, dlist, listid_arr);
    }

    @Override
    public void ContactProjectLog(UserVo loginUser, String text) {
        contactDao.ContactProjectLog(sqlSession3, loginUser, text);
    }

    @Override
    public ArrayList<KonProjectVo> KonList(String inputVal) {

        return contactDao.KonList(sqlSession4, inputVal);
    }

    @Override
    public int ModifyProjectInfo(ContactProject cp) {
        return contactDao.ModifyProjectInfo(sqlSession3, cp);
    }

    @Override
    public String ContactLastCode() {
        return contactDao.ContactLastCode(sqlSession3);
    }

    @Override
    public ArrayList<KonCodeVo> GetContactKonCode(String pcode) {
        return contactDao.GetContactKonCode(sqlSession3, pcode);
    }

    @Override
    public int Modify_KonLinkCode(String pcode, ArrayList<String> konType, String konCode) {
        contactDao.Delete_KonLinkCode(sqlSession3, pcode);
        return contactDao.Modify_KonLinkCode(sqlSession3, pcode, konType, konCode);
    }

    @Override
    public ArrayList<DivisionCodeVo> GetDivisionCode(String pcode) {
        return contactDao.GetDivisionCode(sqlSession3, pcode);
    }

    @Override
    public ArrayList<ListDataVo> GetListInfo(ListDataVo ld) {
        return contactDao.GetListInfo(sqlSession3, ld);
    }

    @Override
    public String GetRandomList(ArrayList<DivisionCodeVo> dlist, int prjCode) {
        return contactDao.GetRandomList(sqlSession3, dlist, prjCode);
    }

    @Override
    public int ContactListModify(ArrayList<ContactModifyVo> dlist, String listid, int prjCode) {
        return contactDao.ContactListModify(sqlSession3, dlist, listid, prjCode);
    }

    @Override
    public int ContactListModify_LOG(ArrayList<ContactModifyVo> dlist, String listid, int prjCode, UserVo loginUser) {
        return contactDao.ContactListModify_LOG(sqlSession3, dlist, listid, prjCode, loginUser);
    }

    @Override
    public ArrayList<ContactModifyVo> GetContactModifyList(ListDataVo ld) {
        return contactDao.GetContactModifyList(sqlSession3, ld);
    }

    @Override
    public int ContactResult_Add(int result_code, String content, int prjCode, String listid, UserVo loginUser) {
        contactDao.ContactResult_Add(sqlSession3, listid, prjCode, result_code, loginUser);
        return contactDao.ContactResult_Add_LOG(sqlSession3, result_code, content, prjCode, listid, loginUser);
    }

    @Override
    public ArrayList<ResultLogVo> GetContactResultList(ListDataVo ld, UserVo loginUser) {
        return contactDao.GetContactResultList(sqlSession3, ld, loginUser);
    }

    @Override
    public ArrayList<ContactGraphVo> Get_ChartData(int prjCode, UserVo loginUser) {
        return contactDao.Get_ChartData(sqlSession3, prjCode, loginUser);
    }

    @Override
    public ArrayList<ContactGraphVo> Get_ChartData2(int prjCode) {
        return contactDao.Get_ChartData2(sqlSession3, prjCode);
    }

    @Override
    public ArrayList<ContactGraphVo> Get_ChartData3(int prjCode, UserVo loginUser) {
        return contactDao.Get_ChartData3(sqlSession3, prjCode, loginUser);
    }

    @Override
    public ClientVo GetClientInfo(String ip) {
        return contactDao.GetClientInfo(sqlSession3, ip);
    }

    @Override
    public int Calling_Log(HashMap<String, Object> hs) {
        return contactDao.Calling_Log(sqlSession3, hs);
    }

    @Override
    public ArrayList<CallLogVo> GetCallLog(ListDataVo ld){
        return contactDao.GetCallLog(sqlSession3, ld);
    }

    @Override
    public int SendEmailLog(HashMap<String, Object> hs) {
        return contactDao.SendEmailLog(sqlSession3, hs);
    }

    @Override
    public ArrayList<SendEmailLogVo> GetEmailLog(ListDataVo ld) {
        return contactDao.GetEmailLog(sqlSession3, ld);
    }

    @Override
    public int getStatusResult(String prjCode, String listId) {
        return contactDao.getStatusResult(sqlSession3, prjCode, listId);
    }

    @Override
    public void resultCodeReset(String prjCode, String listId) {
        contactDao.resultCodeReset(sqlSession3, prjCode, listId);
    }

    @Override
    public void ProgressContactReset(UserVo loginUser) {
        contactDao.ProgressContactReset(sqlSession3, loginUser);
    }

    @Override
    public int SendSmsLog(HashMap<String, Object> hs) {
        return contactDao.SendSmsLog(sqlSession3, hs);
    }

    @Override
    public ArrayList<SendSmsLogVo> GetSmsLog(ListDataVo ld) {
        return contactDao.GetSmsLog(sqlSession3, ld);
    }

    @Override
    public int statusUpdate(HashMap<String, String> hs) {
        return contactDao.statusUpdate(sqlSession3, hs);
    }

}
