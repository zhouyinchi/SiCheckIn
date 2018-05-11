package my.ssm.service.impl;

import my.ssm.dao.UsersMapper;
import my.ssm.entity.Users;
import my.ssm.service.UserService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Weit on 2017/11/7.
 */
@Repository
public class UserServiceImpl implements UserService {

    @Resource
    UsersMapper usersMapper;


    public Users getUser(String userId) {
        return usersMapper.selectByPrimaryKey(userId);
    }

    public List<Users> getAllUsers() {
        return usersMapper.selectAll();
    }

    public boolean add(Users user) {
        return usersMapper.insert(user)>0?true:false;
    }

    public boolean update(Users user) {
        return usersMapper.updateByPrimaryKey(user)>0?true:false;
    }

    public boolean delete(Users user) {
        return usersMapper.deleteByPrimaryKey(user.getUserid())>0?true:false;
    }
}
