package kric.com.kric.listManage.model.dao;

import kric.com.kric.contact.model.vo.ListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Repository
public class ListManageDao {

    public ArrayList<CurrentListDataVo> GET_CURRENT_LIST(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("ListManageMapper.GET_CURRENT_LIST", prj_code);
    }

    public ArrayList<CurrentListTypeVo> GET_CURRENT_LIST_TYPE(SqlSessionTemplate sqlSession3, String prj_code) {
        return (ArrayList)sqlSession3.selectList("ListManageMapper.GET_CURRENT_LIST_TYPE", prj_code);
    }

    public int ContactListAdd(SqlSessionTemplate sqlSession3, ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code) {

        HashMap<String, Object> hs = new HashMap<>();
        hs.put("listIdArr", listIdArr);
        hs.put("pcode", prj_code);

        if(sqlSession3.insert("ListManageMapper.ContactListStatusAdd", hs) < 0) return -1;
        return sqlSession3.insert("ListManageMapper.ContactListAdd", lList);
    }

    public int ContactListChange(SqlSessionTemplate sqlSession3, ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code) {

        HashMap<String, Object> hs = new HashMap<>();
        hs.put("listIdArr", listIdArr);
        hs.put("prj_code", prj_code);

        if(sqlSession3.delete("ListManageMapper.ContactListStatusDelete", prj_code) < 0) return -1;
        if(sqlSession3.insert("ListManageMapper.ContactStatusChange", hs) < 0) return -1;
        if(sqlSession3.insert("ListManageMapper.ContactListChange", lList) < 0) return -1;

        return 1;
    }

    public ArrayList<CurrentListDataVo> SearchList(SqlSessionTemplate sqlSession3, HashMap<String, Object> hs) {
        return (ArrayList) sqlSession3.selectList("ListManageMapper.SearchList", hs);
    }
}
