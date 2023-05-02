package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.UserDao;
import project.capstone.domain.UserDto;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    // region Select
    @Override
    public String getName(UserDto userDto) throws Exception {
        return userDao.select(userDto);
    }

    @Override
    public UserDto getUser(String id) throws Exception {
        return userDao.select(id);
    }
    //endregion


    // region Insert
    @Override
    public int save(UserDto userDto) throws Exception{
        return userDao.insert(userDto);
    }
    // endregion

    // 아이디 중복 검사
    @Override
    public int idCheck(String userId) throws Exception {
        return userDao.selectSameId(userId);
    }


}
