package kric.com.kric.contact.model.service;


import kric.com.kric.common.email.Email;
import kric.com.kric.common.vo.PageInfo;
import kric.com.kric.contact.model.vo.*;
import kric.com.kric.currentStatus.model.vo.DivisionStatusVo;
import kric.com.kric.user.model.vo.UserVo;

import java.util.ArrayList;
import java.util.HashMap;

public interface ContactService {

    ArrayList<ContactProject> ContactList(PageInfo pi, SearchOptionVo sv);

    ArrayList<IntranetProjectListVo> IntranetList(String inputVal);

    int ContactInsert(ContactProject cp, ArrayList<ResultCodeVo> rlist, ArrayList<DivisionCodeVo> dlist, ArrayList<ListDataVo> list, ArrayList<ContactTypeVo> tlist, ArrayList<String> listid_arr, ArrayList<String> konType) throws Exception;

    int ContactListCount(SearchOptionVo sv);

    ArrayList<ContactTypeVo> GetContactType(String pcode);

    ArrayList<ResultCodeVo> GetContactResult(String pcode);

    ArrayList<DivisionCodeVo> GetContactDivision(String pcode);

    int Modify_ResultCode(String pcode, ArrayList<ResultCodeVo> rlist);

    ArrayList<ListDataVo> GetList(String pcode);

    int Modify_DivisionCode(int pcode, ArrayList<ListDataVo> list, ArrayList<ContactTypeVo> tlist, ArrayList<DivisionCodeVo> dlist, ArrayList<String> listid_arr);

    void ContactProjectLog(UserVo loginUser, String text);

    ArrayList<KonProjectVo> KonList(String inputVal);

    int ModifyProjectInfo(ContactProject cp);

    String ContactLastCode();

    ArrayList<KonCodeVo> GetContactKonCode(String pcode);

    int Modify_KonLinkCode(String pcode, ArrayList<String> konType, String konCode);

    ArrayList<DivisionCodeVo> GetDivisionCode(String pcode);

    ArrayList<ListDataVo> GetListInfo(ListDataVo ld);

    String GetRandomList(ArrayList<DivisionCodeVo> dlist, int prjCode);

    int ContactListModify(ArrayList<ContactModifyVo> dlist, String listid, int prjCode);

    int ContactListModify_LOG(ArrayList<ContactModifyVo> dlist, String listid, int prjCode, UserVo loginUser);

    ArrayList<ContactModifyVo> GetContactModifyList(ListDataVo ld);

    int ContactResult_Add(int result_code, String content, int prjCode, String listid, UserVo loginUser);

    ArrayList<ResultLogVo> GetContactResultList(ListDataVo ld, UserVo loginUser);

    ArrayList<ContactGraphVo> Get_ChartData(int prjCode, UserVo loginUser);

    ArrayList<ContactGraphVo> Get_ChartData2(int prjCode);

    ArrayList<ContactGraphVo> Get_ChartData3(int prjCode, UserVo loginUser);

    ClientVo GetClientInfo(String ip);

    int Calling_Log(HashMap<String, Object> hs);

    ArrayList<CallLogVo> GetCallLog(ListDataVo ld);

    int SendEmailLog(HashMap<String, Object> hs);

    int SendSmsLog(HashMap<String, Object> hs);

    ArrayList<SendEmailLogVo> GetEmailLog(ListDataVo ld);

    int getStatusResult(String prjCode, String listId);

    void resultCodeReset(String prjCode, String listId);

    void ProgressContactReset(UserVo loginUser);

    ArrayList<SendSmsLogVo> GetSmsLog(ListDataVo ld);

    int statusUpdate(HashMap<String, String> hs);
}


