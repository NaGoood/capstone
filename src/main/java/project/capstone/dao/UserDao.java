package project.capstone.dao;

import project.capstone.domain.UserDto;

public interface UserDao {
    
    // 유저조회 - 이름
    String select(UserDto userDto);

    // 유저조회 - 객체 
     UserDto select(String id);
    
    // 회원가입
    int insert(UserDto userDto);
}
