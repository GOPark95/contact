package kric.com.kric.listManage.model.service;

import kric.com.kric.contact.model.vo.ListDataVo;
import kric.com.kric.currentStatus.model.vo.ContactStatusVo;
import kric.com.kric.listManage.model.vo.CurrentListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;

import java.util.ArrayList;
import java.util.HashMap;

public interface ListManageService {
    ArrayList<CurrentListDataVo> GET_CURRENT_LIST(String prj_code);

    ArrayList<CurrentListTypeVo> GET_CURRENT_LIST_TYPE(String prj_code);

    int ContactListAdd(ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code);

    int ContactListChange(ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code);

    ArrayList<CurrentListDataVo> SearchList(HashMap<String, Object> hs);

}
