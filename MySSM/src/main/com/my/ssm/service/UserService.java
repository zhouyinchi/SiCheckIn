package my.ssm.service;

import my.ssm.entity.Users;

import java.util.List;

/**
 * Created by Weit on 2017/11/7.
 */
public interface UserService {
    Users getUser(String userId);
    List<Users> getAllUsers();
    boolean add(Users user);
    boolean update(Users user);
    boolean delete(Users user);
}
