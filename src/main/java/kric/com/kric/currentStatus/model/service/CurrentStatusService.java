package kric.com.kric.currentStatus.model.service;

import kric.com.kric.currentStatus.model.vo.ContactStatusVo;
import kric.com.kric.currentStatus.model.vo.DivisionStatusVo;
import kric.com.kric.currentStatus.model.vo.MyunStatusVo;
import kric.com.kric.currentStatus.model.vo.ResultStatusVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;

import java.util.ArrayList;
import java.util.HashMap;

public interface CurrentStatusService {
    ArrayList<DivisionStatusVo> GetDivisionStatus(String prj_code);

    ArrayList<ResultStatusVo> GetResultStatus(String prj_code);

    ArrayList<MyunStatusVo> GetMyunStatus(String prj_code);

    ArrayList<CurrentListTypeVo> SearchClickList(HashMap<String, Object> hs);

    ArrayList<ContactStatusVo> ContactStautsExcelDown(String prj_code);
}
