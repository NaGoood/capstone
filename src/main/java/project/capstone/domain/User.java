package project.capstone.domain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class User {

    User(){}

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String username;
    public String password;
}
