package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import project.capstone.domain.User;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SignUpPage {

    @PostMapping("/api/signup")
    public String signUp(@RequestBody User user){
        return "ok";
    }
}
