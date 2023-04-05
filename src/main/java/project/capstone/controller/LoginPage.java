package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.capstone.domain.User;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginPage {

    @PostMapping("/api/login")
    public String login(@RequestBody User user){
        return "ok";
    }
}
