package project.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.UserDto;
import project.capstone.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    // 로그인
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public String singIn(@RequestBody UserDto userDto, HttpServletRequest request,
                         HttpServletResponse response) throws Exception {

        String name = userService.getName(userDto);
        if(name != null && name !=""){
            System.out.println("DB 조회 성공");
            
            // 세션에 ID 저장
            HttpSession session = request.getSession();
            session.setAttribute("id",userDto.getUserId());
            return name;
        } else {
            System.out.println("name = " + name);
            System.out.println("DB 조회 실패");
            return "";
        }
    }

    // 접속한 유저정보
    @GetMapping("/current_user")
    public UserDto currentUser(HttpSession session) {
        String id = (String) session.getAttribute("id");
        UserDto userDto;
        try {
            userDto = userService.getUser(id);
            System.out.println("userDto = " + userDto);
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
    @ResponseStatus(HttpStatus.CREATED)
    public HttpStatus signUp(@RequestBody UserDto userDto) throws Exception{
        System.out.println("[수신받은 데이터 ] = " + userDto);
//        userDto.setUserBirth(new java.sql.Date(userDto.getUserBirth().getTime()));
//        userDto.getUserBirth();
        int rowCnt = userService.save(userDto);
        if(rowCnt==1) {
            System.out.println("DB 저장 성공");
            return HttpStatus.CREATED;
        }
        else{
            return HttpStatus.REQUEST_TIMEOUT;
        }

    }
}
