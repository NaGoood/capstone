package project.capstone.controller;

import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.Restaurant;
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

    @PostMapping("/searchMenu")
    public String menu(HttpServletRequest request) throws IOException {
        ServletInputStream inputStream = request.getInputStream();
        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);

        log.info("messageBody={}" , messageBody);
        return "ok";
    }

    @GetMapping("/restaurants")
    public List<Restaurant> searchRestaurants(@RequestParam("location") String location) throws IOException {
        ArrayList<Restaurant> restaurants = new ArrayList<>();
        log.info("location={}",location);

        Restaurant restaurant = new Restaurant("1", "빅스타피자", 5, "대전 동구 동대전로 193-1", "pizza", "4.8", "Y", "bigstart",36.338911,127.448419);
        Restaurant restaurant2 = new Restaurant("2", "명륜진사갈비", 4, "대전 동구 동대전로 184-3", "meat", "5", "N", "meatImg",36.338074,127.448611);

        restaurants.add(restaurant);
        restaurants.add(restaurant2);

        return restaurants;
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ArrayList<Restaurant> restaurantInfo(@PathVariable String restaurantId){

        log.info("restaurantId={}", restaurantId);

        ArrayList<Restaurant> list = new ArrayList<>();

        for(int i=0; i < list.size(); i++){
            if(list.get(i).getRestaurantId().equals(restaurantId)){
                list.add(list.get(i));
                log.info("list={}", list);
            }
        }

        return list;
    }
}
