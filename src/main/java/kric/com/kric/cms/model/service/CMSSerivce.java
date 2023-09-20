package kric.com.kric.cms.model.service;

import kric.com.kric.cms.model.vo.*;
import kric.com.kric.contact.model.vo.CallLogVo;
import kric.com.kric.contact.model.vo.ListDataVo;

import java.util.ArrayList;
import java.util.HashMap;

public interface CMSSerivce {
    ArrayList<CMSSettingVo> GetVariable(String prj_code, String vtype);

    int CMS_SET_INSERT(HashMap hs);

    int CMS_SET_INSERT_FILE(HashMap hs);

    int CMS_SET_INSERT_LOG(HashMap hs);

    int CMS_SET_INSERT_VARIABLE(HashMap hs);

    ArrayList<CMSTypeVo> GetCMSType(String prj_code);

    ArrayList<CMSInfoVo> CMS_GET_INFO(HashMap hs);

    ArrayList<CMSVariableVo> CMS_GET_VARIABLE(HashMap hs);

    int CMS_GET_VARI_TOP1();

    ArrayList<CMSFileVo> CMS_GET_FILE(HashMap hs);

    int CMS_SET_MODIFY(HashMap hs);

    int CMS_SET_MODIFY_VARIABLE(HashMap hs);

    ArrayList<CMSFileVo> CMS_REMOVE_FILE(HashMap hs);


}
