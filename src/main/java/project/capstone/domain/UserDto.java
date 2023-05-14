package project.capstone.domain;

import lombok.Data;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Data
public class UserDto {

    UserDto(){}

    public UserDto(String userName, String userId, String userPW, String phoneNumber, String userBirth) {
        this.userName = userName;
        this.userId = userId;
        this.userPW = userPW;
        this.phoneNumber = phoneNumber;
        this.userBirth = userBirth;
    }

    private String userName;
    private String userId;
    private String userPW;
    private String phoneNumber;
    private String userBirth;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPW() {
        return userPW;
    }

    public void setUserPW(String userPW) {
        this.userPW = userPW;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserBirth() {
        return userBirth;
    }

    public void setUserBirth(String userBirth) {
        this.userBirth = userBirth;
    }
}
