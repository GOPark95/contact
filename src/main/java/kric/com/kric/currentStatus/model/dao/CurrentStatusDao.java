package kric.com.kric.currentStatus.model.dao;

import kric.com.kric.currentStatus.model.vo.ContactStatusVo;
import kric.com.kric.currentStatus.model.vo.DivisionStatusVo;
import kric.com.kric.currentStatus.model.vo.MyunStatusVo;
import kric.com.kric.currentStatus.model.vo.ResultStatusVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Repository
public class CurrentStatusDao {

    public ArrayList<DivisionStatusVo> GetDivisionStatus(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("CurrentStatusMapper.GetDivisionStatus", prj_code);
    }

    public ArrayList<ResultStatusVo> GetResultStatus(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("CurrentStatusMapper.GetResultStatus", prj_code);
    }

    public ArrayList<MyunStatusVo> GetMyunStatus(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("CurrentStatusMapper.GetMyunStatus", prj_code);
    }

    public ArrayList<CurrentListTypeVo> SearchClickList(SqlSessionTemplate sqlSession3, HashMap<String, Object> hs) {
        return (ArrayList)sqlSession3.selectList("CurrentStatusMapper.SearchClickList", hs);
    }

    public ArrayList<ContactStatusVo> ContactStautsExcelDown(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("CurrentStatusMapper.ContactStautsExcelDown", prj_code);
    }
}
