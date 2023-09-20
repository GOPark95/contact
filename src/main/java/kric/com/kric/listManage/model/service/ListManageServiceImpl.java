package kric.com.kric.listManage.model.service;

import kric.com.kric.contact.model.vo.ListDataVo;
import kric.com.kric.listManage.model.dao.ListManageDao;
import kric.com.kric.listManage.model.vo.CurrentListDataVo;
import kric.com.kric.listManage.model.vo.CurrentListTypeVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class ListManageServiceImpl implements ListManageService {

    @Autowired
    private ListManageDao ListManageDao;

    @Autowired
    @Resource(name = "sqlSessionTemplate3")
    private SqlSessionTemplate sqlSession3;

    @Override
    public ArrayList<CurrentListDataVo> GET_CURRENT_LIST(String prj_code) {
        return ListManageDao.GET_CURRENT_LIST(sqlSession3, prj_code);
    }

    @Override
    public ArrayList<CurrentListTypeVo> GET_CURRENT_LIST_TYPE(String prj_code) {
        return ListManageDao.GET_CURRENT_LIST_TYPE(sqlSession3, prj_code);
    }

    @Override
    public int ContactListAdd(ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code) {
        return ListManageDao.ContactListAdd(sqlSession3, lList, listIdArr, prj_code);
    }

    @Override
    public int ContactListChange(ArrayList<ListDataVo> lList, ArrayList<String> listIdArr, int prj_code) {
        return ListManageDao.ContactListChange(sqlSession3, lList, listIdArr, prj_code);
    }

    @Override
    public ArrayList<CurrentListDataVo> SearchList(HashMap<String, Object> hs) {
        return ListManageDao.SearchList(sqlSession3, hs);
    }
}
