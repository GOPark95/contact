package kric.com.kric.currentStatus.model.service;

import kric.com.kric.currentStatus.model.vo.ContactStatusVo;
import kric.com.kric.currentStatus.model.vo.DivisionStatusVo;
import kric.com.kric.currentStatus.model.vo.MyunStatusVo;
import kric.com.kric.currentStatus.model.vo.ResultStatusVo;
import kric.com.kric.listManage.model.dao.ListManageDao;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class CurrentStatusServiceImpl implements CurrentStatusService {

    @Autowired
    private kric.com.kric.currentStatus.model.dao.CurrentStatusDao CurrentStatusDao;

    @Autowired
    @Resource(name = "sqlSessionTemplate3")
    private SqlSessionTemplate sqlSession3;

    @Override
    public ArrayList<DivisionStatusVo> GetDivisionStatus(String prj_code) {
        return CurrentStatusDao.GetDivisionStatus(sqlSession3, prj_code);
    }

    @Override
    public ArrayList<ResultStatusVo> GetResultStatus(String prj_code) {
        return CurrentStatusDao.GetResultStatus(sqlSession3, prj_code);
    }

    @Override
    public ArrayList<MyunStatusVo> GetMyunStatus(String prj_code) {
        return CurrentStatusDao.GetMyunStatus(sqlSession3, prj_code);
    }

    @Override
    public ArrayList<CurrentListTypeVo> SearchClickList(HashMap<String, Object> hs) {
        return CurrentStatusDao.SearchClickList(sqlSession3, hs);
    }

    @Override
    public ArrayList<ContactStatusVo> ContactStautsExcelDown(String prj_code) {
        return CurrentStatusDao.ContactStautsExcelDown(sqlSession3, prj_code);
    }
}
