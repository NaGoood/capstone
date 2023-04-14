package project.capstone.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.capstone.domain.UserDto;


@Repository
public class UserDaoImpl implements UserDao {

    String namespace = "project.capstone.dao.UserMapper.";

    @Autowired
    SqlSession session;

    // region Select

    // 유저조회 - 이름
    @Override
    public String select(UserDto userDto) {
        return session.selectOne(namespace+"selectName",userDto);
    }

    // 유저조회 - 객체
    @Override
    public UserDto select(String id) {
        return session.selectOne(namespace+"select",id);
    }

    // endregion


    // region Insert
    // 회원가입
    @Override
    public int insert(UserDto userDto) {
        return session.insert(namespace+"insert",userDto);
    }

    // endregion



}
