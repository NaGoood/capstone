package project.capstone.domain;

import lombok.Data;

@Data
public class UserDto {

    UserDto(){}

    public UserDto(String userName, String userId, String userPW, String phoneNumber, String userBirth, String userType) {
        this.userName = userName;
        this.userId = userId;
        this.userPW = userPW;
        this.phoneNumber = phoneNumber;
        this.userBirth = userBirth;
        this.userType = userType;
    }

    private String userName;
    private String userId;
    private String userPW;
    private String phoneNumber;
    private String userBirth;
    private String userType;

}
