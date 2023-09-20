package kric.com.kric.user.model.service;


import kric.com.kric.user.model.vo.UserVo;

public interface UserService {
    UserVo login_employee(UserVo user);

    UserVo login_contact(UserVo user);

    UserVo login(UserVo user);
}
