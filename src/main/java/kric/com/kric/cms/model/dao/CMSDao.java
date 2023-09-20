package kric.com.kric.cms.model.dao;

import kric.com.kric.cms.model.vo.*;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Repository
public class CMSDao {

    @SuppressWarnings("unchecked")
    public ArrayList<CMSSettingVo> GetVariable(SqlSessionTemplate sqlSession3, String prj_code, String vtype) {
        HashMap<String, Object> hs = new HashMap();
        hs.put("prj_code", prj_code);
        hs.put("vtype", vtype);

        return (ArrayList)sqlSession3.selectList("cmsMapper.GetVariable",hs);
    }

    public int CMS_SET_INSERT(SqlSessionTemplate sqlSession3, HashMap hs) {
        return sqlSession3.insert("cmsMapper.CMS_SET_INSERT", hs);
    }

    public int CMS_SET_INSERT_FILE(SqlSessionTemplate sqlSession3, HashMap hs) {
        return sqlSession3.insert("cmsMapper.CMS_SET_INSERT_FILE",hs);
    }

    public int CMS_SET_INSERT_LOG(SqlSessionTemplate sqlSession3, HashMap hs) {
        return sqlSession3.insert("cmsMapper.CMS_SET_INSERT_LOG", hs);
    }

    public int CMS_SET_INSERT_VARIABLE(SqlSessionTemplate sqlSession3, HashMap hs) {
        return sqlSession3.insert("cmsMapper.CMS_SET_INSERT_VARIABLE", hs);
    }

    public ArrayList<CMSTypeVo> GetCMSType(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("cmsMapper.GetCMSType", prj_code);
    }

    public ArrayList<CMSInfoVo> CMS_GET_INFO(SqlSessionTemplate sqlSession3, HashMap hs) {
        return (ArrayList) sqlSession3.selectList("cmsMapper.CMS_GET_INFO", hs);
    }

    public ArrayList<CMSVariableVo> CMS_GET_VARIABLE(SqlSessionTemplate sqlSession3, HashMap hs) {
        return (ArrayList) sqlSession3.selectList("cmsMapper.CMS_GET_VARIABLE", hs);
    }

    public int CMS_GET_VARI_TOP1(SqlSessionTemplate sqlSession3){
        return sqlSession3.selectOne("cmsMapper.CMS_GET_VARI_TOP1");
    }

    public ArrayList<CMSFileVo> CMS_GET_FILE(SqlSessionTemplate sqlSession3, HashMap hs) {
        return (ArrayList) sqlSession3.selectList("cmsMapper.CMS_GET_FILE", hs);
    }

    public int CMS_SET_MODIFY(SqlSessionTemplate sqlSession3, HashMap hs) {
        return sqlSession3.update("cmsMapper.CMS_SET_MODIFY", hs);
    }

    public void CMS_SET_REMOVE_VARIABLE(SqlSessionTemplate sqlSession3, HashMap hs) {
        sqlSession3.delete("cmsMapper.CMS_SET_REMOVE_VARIABLE", hs);
    }

    public ArrayList<CMSFileVo> CMS_GET_FILENAME(SqlSessionTemplate sqlSession3, HashMap hs) {
        return (ArrayList) sqlSession3.selectList("cmsMapper.CMS_GET_FILENAME", hs);
    }

    public void CMS_REMOVE_FILE(SqlSessionTemplate sqlSession3, HashMap hs) {
        sqlSession3.update("cmsMapper.CMS_REMOVE_FILE", hs);
    }
}
