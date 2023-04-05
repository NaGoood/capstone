package project.capstone.service;

import project.capstone.domain.UserDto;

public interface UserService {

    String getName(UserDto userDto) throws Exception;

    UserDto getUser(String id) throws Exception;

    int save(UserDto userDto) throws Exception;
}
