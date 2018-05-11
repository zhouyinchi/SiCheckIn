package my.ssm.dao;

import my.ssm.entity.Users;

import java.util.List;

public interface UsersMapper {
    int deleteByPrimaryKey(String userid);

    int insert(Users record);

    int insertSelective(Users record);

    Users selectByPrimaryKey(String userid);

    int updateByPrimaryKeySelective(Users record);

    int updateByPrimaryKey(Users record);

    List<Users> selectAll();
}