package project.capstone.controller;

import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.UserDto;
import project.capstone.service.UserService;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity singIn(@RequestBody UserDto userDto, HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        String name = userService.getName(userDto);
        if(name != null && name !=""){
            System.out.println("DB 조회 성공");
            // 세션에 ID 저장
            HttpSession session = request.getSession();
            session.setAttribute("id",userDto.getUserId());
            return new ResponseEntity(name, HttpStatus.OK);
        } else {
            System.out.println("DB 조회 실패");
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    // 접속한 유저정보
    @GetMapping("/current_user")
    public UserDto currentUser(HttpSession session) {
        String id = (String) session.getAttribute("id");
        UserDto userDto;
        try {
            log.info("[현재 유저 불러오기]");
            userDto = userService.getUser(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return userDto;
    }

    // 로그아웃
    @GetMapping("/logout")
    public HttpServletResponse singOut(HttpSession session, HttpServletResponse response){
        // 세션 종료
        session.invalidate();
        return response;
    }


    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody UserDto userDto) throws Exception{
        System.out.println("[수신받은 데이터 ] = " + userDto);
//        userDto.setUserBirth(new java.sql.Date(userDto.getUserBirth().getTime()));
//        userDto.getUserBirth();
        int rowCnt = userService.idCheck(userDto.getUserId());
        if(rowCnt!=1) {
            userService.save(userDto);
            System.out.println("DB 저장 성공");
            return new ResponseEntity(HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/searchMenu")
    public String menu(HttpServletRequest request) throws IOException {
        ServletInputStream inputStream = request.getInputStream();
        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);

        log.info("messageBody={}" , messageBody);
        return "ok";
    }
}
