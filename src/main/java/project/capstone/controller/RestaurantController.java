package project.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.RestaurantDto;
import project.capstone.service.RestaurantService;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestaurantController {

//    @PostMapping("/searchMenu")
//    public String menu(HttpServletRequest request) throws IOException {
//        ServletInputStream inputStream = request.getInputStream();
//        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
//
//        log.info("messageBody={}" , messageBody);
//        return "ok";
//    }

    @Autowired
    RestaurantService service;

    @GetMapping("/restaurants")
    public ArrayList<RestaurantDto> fetchRestaurant(@RequestParam("location") String location, @RequestParam("category") String category){
        ArrayList arrayList = (ArrayList) service.getRestaurantList(location, category);
        return arrayList;
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ArrayList<RestaurantDto> restaurantInfo(@PathVariable String restaurantId){
        System.out.println("restaurantId = " + restaurantId);
        ArrayList arrayList = (ArrayList) service.getRestaurantInfo(restaurantId);
        return arrayList;
    }
}
