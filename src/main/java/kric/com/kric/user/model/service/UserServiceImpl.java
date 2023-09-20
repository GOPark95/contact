package kric.com.kric.user.model.service;

import kric.com.kric.user.model.dao.UserDao;
import kric.com.kric.user.model.vo.UserVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    @Resource(name = "sqlSessionTemplate")
    private SqlSessionTemplate sqlSession;

    @Override
    public UserVo login_employee(UserVo user) {
        return userDao.login_employee(sqlSession, user);
    }

    @Override
    public UserVo login_contact(UserVo user) {
        return userDao.login_contact(sqlSession, user);
    }

    @Override
    public UserVo login(UserVo user) {
        return userDao.login(sqlSession, user);
    }


}
