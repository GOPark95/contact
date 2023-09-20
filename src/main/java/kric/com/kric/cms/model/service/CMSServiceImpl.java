package kric.com.kric.cms.model.service;

import kric.com.kric.cms.model.dao.CMSDao;
import kric.com.kric.cms.model.vo.*;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class CMSServiceImpl implements CMSSerivce{

    @Autowired
    private CMSDao CMSDao;

    @Autowired
    @Resource(name = "sqlSessionTemplate3")
    private SqlSessionTemplate sqlSession3;


    @Override
    public ArrayList<CMSSettingVo> GetVariable(String prj_code, String vtype) {
        return CMSDao.GetVariable(sqlSession3, prj_code, vtype);
    }

    @Override
    public int CMS_SET_INSERT(HashMap hs) {
        return CMSDao.CMS_SET_INSERT(sqlSession3, hs);
    }

    @Override
    public int CMS_SET_INSERT_FILE(HashMap hs) {
        return CMSDao.CMS_SET_INSERT_FILE(sqlSession3, hs);
    }

    @Override
    public int CMS_SET_INSERT_LOG(HashMap hs) {
        return CMSDao.CMS_SET_INSERT_LOG(sqlSession3, hs);
    }

    @Override
    public int CMS_SET_INSERT_VARIABLE(HashMap hs) {
        return CMSDao.CMS_SET_INSERT_VARIABLE(sqlSession3, hs);
    }

    @Override
    public ArrayList<CMSTypeVo> GetCMSType(String prj_code) {
        return CMSDao.GetCMSType(sqlSession3, prj_code);
    }

    @Override
    public ArrayList<CMSInfoVo> CMS_GET_INFO(HashMap hs) {
        return CMSDao.CMS_GET_INFO(sqlSession3, hs);
    }

    @Override
    public ArrayList<CMSVariableVo> CMS_GET_VARIABLE(HashMap hs) {
        return CMSDao.CMS_GET_VARIABLE(sqlSession3, hs);
    }

    public int CMS_GET_VARI_TOP1(){
        return CMSDao.CMS_GET_VARI_TOP1(sqlSession3);
    }

    @Override
    public ArrayList<CMSFileVo> CMS_GET_FILE(HashMap hs) {
        return CMSDao.CMS_GET_FILE(sqlSession3, hs);
    }

    @Override
    public int CMS_SET_MODIFY(HashMap hs) {
        return CMSDao.CMS_SET_MODIFY(sqlSession3, hs);
    }

    @Override
    public int CMS_SET_MODIFY_VARIABLE(HashMap hs) {
        CMSDao.CMS_SET_REMOVE_VARIABLE(sqlSession3, hs);
        return CMSDao.CMS_SET_INSERT_VARIABLE(sqlSession3, hs);
    }

    @Override
    public ArrayList<CMSFileVo> CMS_REMOVE_FILE(HashMap hs) {
        CMSDao.CMS_REMOVE_FILE(sqlSession3, hs);
        return CMSDao.CMS_GET_FILENAME(sqlSession3, hs);
    }
}
