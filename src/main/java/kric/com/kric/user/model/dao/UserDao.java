package kric.com.kric.user.model.dao;

import kric.com.kric.user.model.vo.UserVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

    public UserVo login_employee(SqlSessionTemplate sqlSession, UserVo user) {
        return sqlSession.selectOne("userMapper.employeeLogin",user);
    }

    public UserVo login_contact(SqlSessionTemplate sqlSession, UserVo user) {
        return sqlSession.selectOne("userMapper.contactLogin", user);
    }

    public UserVo login(SqlSessionTemplate sqlSession, UserVo user) {
        System.out.println(user);
        return sqlSession.selectOne("userMapper.login", user);
    }
}
