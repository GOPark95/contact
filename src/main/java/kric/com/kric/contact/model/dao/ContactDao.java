package kric.com.kric.contact.model.dao;

import kric.com.kric.common.email.Email;
import kric.com.kric.common.vo.PageInfo;
import kric.com.kric.contact.model.vo.*;
import kric.com.kric.user.model.vo.UserVo;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Repository
public class ContactDao {

    @SuppressWarnings("unchecked")
    public ArrayList<ContactProject> ContactList(SqlSessionTemplate sqlSession3, PageInfo pi, SearchOptionVo sv) {
        if(pi != null){
            int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
            RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());

            return (ArrayList)sqlSession3.selectList("contactMapper.contactList", sv, rowBounds);
        }else{
            return (ArrayList)sqlSession3.selectList("contactMapper.contactList", sv);
        }

    }

    @SuppressWarnings("unchecked")
    public ArrayList<IntranetProjectListVo> IntranetList(SqlSessionTemplate sqlSession2, String inputVal) {
        return (ArrayList)sqlSession2.selectList("contactMapper.IntranetList", inputVal);
    }

    @SuppressWarnings("unchecked")
    public int ContactInsert(SqlSessionTemplate sqlSession3, ContactProject cp) {
        return sqlSession3.insert("contactMapper.ContactInsert", cp);
    }

    @SuppressWarnings("unchecked")
    public int ContactListCount(SqlSessionTemplate sqlSession3, SearchOptionVo sv) {
        return sqlSession3.selectOne("contactMapper.ContactListCount", sv);
    }

    @SuppressWarnings("unchecked")
    public int ContactInsert_ResultCode(SqlSessionTemplate sqlSession3, ArrayList<ResultCodeVo> rlist) {
        return sqlSession3.insert("contactMapper.ContactInsert_ResultCode", rlist);
    }

    @SuppressWarnings("unchecked")
    public int ContactInsert_DivisionCode(SqlSessionTemplate sqlSession3, ArrayList<DivisionCodeVo> dlist) {
        return sqlSession3.insert("contactMapper.ContactInsert_DivisionCode", dlist);
    }

    @SuppressWarnings("unchecked")
    public int ContactInsert_ContactList(SqlSessionTemplate sqlSession3, ArrayList<ListDataVo> list) {
        return sqlSession3.insert("contactMapper.ContactInsert_ContactList", list);
    }

    @SuppressWarnings("unchecked")
    public int ContactInsert_ContactType(SqlSessionTemplate sqlSession3, ArrayList<ContactTypeVo> tlist) {
        return sqlSession3.insert("contactMapper.ContactInsert_ContactType", tlist);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ContactTypeVo> GetContactType(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList) sqlSession3.selectList("contactMapper.GetContactType", pcode);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ResultCodeVo> GetContactResult(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList) sqlSession3.selectList("contactMapper.GetContactResult", pcode);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<DivisionCodeVo> GetContactDivision(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList) sqlSession3.selectList("contactMapper.GetContactDivision", pcode);
    }

    @SuppressWarnings("unchecked")
    public int Modify_ResultCode(SqlSessionTemplate sqlSession3, ArrayList<ResultCodeVo> rlist) {
        return sqlSession3.insert("contactMapper.Modify_ResultCode", rlist);
    }

    @SuppressWarnings("unchecked")
    public void Delete_ResultCode(SqlSessionTemplate sqlSession3, String pcode) {
        sqlSession3.delete("contactMapper.Delete_ResultCode", pcode);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ListDataVo> GetList(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList) sqlSession3.selectList("contactMapper.GetList", pcode);
    }

    @SuppressWarnings("unchecked")
    public void Delete_DivisionCode(SqlSessionTemplate sqlSession3, int pcode) {
        sqlSession3.delete("contactMapper.Delete_DivisionCode", pcode);
    }

    public int Modify_DivisionCode(SqlSessionTemplate sqlSession3, int pcode, ArrayList<ListDataVo> list, ArrayList<ContactTypeVo> tlist, ArrayList<DivisionCodeVo> dlist, ArrayList<String> listid_arr) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("listid_arr", listid_arr);
        hs.put("pcode", pcode);

        sqlSession3.insert("contactMapper.Modify_ContactStatus", hs);
        sqlSession3.insert("contactMapper.Modify_ListData", list);
        sqlSession3.insert("contactMapper.Modify_ListType", tlist);
        if(dlist.size() > 0) sqlSession3.insert("contactMapper.Modify_Division", dlist);
        return 1;
    }

    public int ContactInsert_ContactStatus(SqlSessionTemplate sqlSession3, ArrayList<String> listid_arr) {
        return sqlSession3.insert("contactMapper.ContactInsert_ContactStatus", listid_arr);
    }

    public void ContactProjectLog(SqlSessionTemplate sqlSession3, UserVo loginUser, String text) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("loginUser", loginUser);
        hs.put("description", text);
        sqlSession3.insert("contactMapper.ContactProjectLog", hs);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<KonProjectVo> KonList(SqlSessionTemplate sqlSession4, String inputVal) {
        return (ArrayList)sqlSession4.selectList("contactMapper.KonList", inputVal);
    }

    public int ModifyProjectInfo(SqlSessionTemplate sqlSession3, ContactProject cp) {
        return sqlSession3.update("contactMapper.ModifyProjectInfo", cp);
    }

    public void ContactInsert_KonType(SqlSessionTemplate sqlSession3, ArrayList<String> konType) {
        sqlSession3.insert("contactMapper.ContactInsert_KonType", konType);
    }

    public String ContactLastCode(SqlSessionTemplate sqlSession3) {
        return sqlSession3.selectOne("contactMapper.ContactLastCode");
    }

    @SuppressWarnings("unchecked")
    public ArrayList<KonCodeVo> GetContactKonCode(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetContactKonCode", pcode);
    }

    public void Delete_KonLinkCode(SqlSessionTemplate sqlSession3, String pcode) {
        sqlSession3.delete("contactMapper.Delete_KonLinkCode", pcode);
    }

    public int Modify_KonLinkCode(SqlSessionTemplate sqlSession3, String pcode, ArrayList<String> konType, String konCode) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("konType", konType);
        hs.put("pcode", pcode);
        hs.put("konCode", konCode);

        sqlSession3.update("contactMapper.Modify_KonCode", hs);
        return sqlSession3.insert("contactMapper.Modify_KonLinkCode", hs);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<DivisionCodeVo> GetDivisionCode(SqlSessionTemplate sqlSession3, String pcode) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetDivisionCode", pcode);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ListDataVo> GetListInfo(SqlSessionTemplate sqlSession3, ListDataVo ld) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetListInfo", ld);
    }

    public String GetRandomList(SqlSessionTemplate sqlSession3, ArrayList<DivisionCodeVo> dlist, int prjCode) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("dlist", dlist);
        hs.put("prjCode", prjCode);

        return sqlSession3.selectOne("contactMapper.GetRandomList", hs);
    }

    public int ContactListModify(SqlSessionTemplate sqlSession3, ArrayList<ContactModifyVo> dlist, String listid, int prjCode) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("dlist", dlist);
        hs.put("listId", listid);
        hs.put("prjCode", prjCode);

        return sqlSession3.update("contactMapper.ContactListModify", hs);
    }

    public int ContactListModify_LOG(SqlSessionTemplate sqlSession3, ArrayList<ContactModifyVo> dlist, String listid, int prjCode, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("dlist", dlist);
        hs.put("listId", listid);
        hs.put("prjCode", prjCode);
        hs.put("loginUser", loginUser);
//        System.out.println(hs);
        return sqlSession3.insert("contactMapper.ContactListModify_LOG", hs);
    }
    @SuppressWarnings("unchecked")
    public ArrayList<ContactModifyVo> GetContactModifyList(SqlSessionTemplate sqlSession3, ListDataVo ld) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetContactModifyList", ld);
    }

    public int ContactResult_Add_LOG(SqlSessionTemplate sqlSession3, int result_code, String content, int prjCode, String listid, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("result_code", result_code);
        hs.put("content", content);
        hs.put("prjCode", prjCode);
        hs.put("listId", listid);
        hs.put("loginUser", loginUser);
        return sqlSession3.insert("contactMapper.ContactResult_Add_LOG", hs);
    }

    public void ContactResult_Add(SqlSessionTemplate sqlSession3, String listid, int prjCode, int result_code, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("result_code", result_code);
        hs.put("prjCode", prjCode);
        hs.put("listId", listid);
        hs.put("loginUser", loginUser);
        System.out.println(hs);
        sqlSession3.update("contactMapper.ContactResult_Add", hs);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ResultLogVo> GetContactResultList(SqlSessionTemplate sqlSession3, ListDataVo ld, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("ld", ld);
        hs.put("loginUser", loginUser);

        return (ArrayList)sqlSession3.selectList("contactMapper.GetContactResultList", hs);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ContactGraphVo> Get_ChartData(SqlSessionTemplate sqlSession3, int prjCode, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prjCode", prjCode);
        hs.put("loginUser", loginUser);
        return (ArrayList)sqlSession3.selectList("contactMapper.Get_ChartData", hs);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ContactGraphVo> Get_ChartData2(SqlSessionTemplate sqlSession3, int prjCode) {
        return (ArrayList)sqlSession3.selectList("contactMapper.Get_ChartData2", prjCode);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<ContactGraphVo> Get_ChartData3(SqlSessionTemplate sqlSession3, int prjCode, UserVo loginUser) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prjCode", prjCode);
        hs.put("loginUser", loginUser);
        return (ArrayList)sqlSession3.selectList("contactMapper.Get_ChartData3", hs);
    }

    public ClientVo GetClientInfo(SqlSessionTemplate sqlSession3, String ip) {
        return sqlSession3.selectOne("contactMapper.GetClientInfo", ip);
    }

    public int Calling_Log(SqlSessionTemplate sqlSession3, HashMap<String, Object> hs) {
        return sqlSession3.insert("contactMapper.Calling_Log", hs);
    }

    public ArrayList<CallLogVo> GetCallLog(SqlSessionTemplate sqlSession3, ListDataVo ld) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetCallLog", ld);
    }

    public int SendEmailLog(SqlSessionTemplate sqlSession3, HashMap<String, Object> hs) {
        return sqlSession3.insert("contactMapper.SendEmailLog", hs);
    }

    public ArrayList<SendEmailLogVo> GetEmailLog(SqlSessionTemplate sqlSession3, ListDataVo ld) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetEmailLog", ld);
    }

    public int getStatusResult(SqlSessionTemplate sqlSession3, String prjCode, String listId) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prjCode", prjCode);
        hs.put("listId", listId);
        return sqlSession3.selectOne("contactMapper.getStatusResult", hs);
    }

    public void resultCodeReset(SqlSessionTemplate sqlSession3, String prjCode, String listId) {
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("prjCode", prjCode);
        hs.put("listId", listId);

        sqlSession3.update("contactMapper.resultCodeReset", hs);
    }

    public void ProgressContactReset(SqlSessionTemplate sqlSession3, UserVo loginUser) {
        sqlSession3.update("contactMapper.ProgressContactReset", loginUser);
    }

    public int SendSmsLog(SqlSessionTemplate sqlSession3, HashMap<String, Object> hs) {
        return sqlSession3.insert("contactMapper.SendSmsLog", hs);
    }

    public ArrayList<SendSmsLogVo> GetSmsLog(SqlSessionTemplate sqlSession3, ListDataVo ld) {
        return (ArrayList)sqlSession3.selectList("contactMapper.GetSmsLog", ld);
    }

    public int statusUpdate(SqlSessionTemplate sqlSession3, HashMap<String, String> hs) {
        return sqlSession3.update("contactMapper.statusUpdate", hs);
    }
}

