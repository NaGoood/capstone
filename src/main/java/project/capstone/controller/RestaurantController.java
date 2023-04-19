package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.RestaurantDto;
import project.capstone.service.RestaurantService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService service;

    @GetMapping("/restaurants")
    public List<RestaurantDto> fetchRestaurant(@RequestParam("location") String location, @RequestParam("category") String category){
        log.info("location={}", location);
        List restaurants = service.getRestaurantList(location, category);
        return restaurants;
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ArrayList<RestaurantDto> restaurantInfo(@PathVariable String restaurantId){
        log.info("restaurantId = " + restaurantId);
        ArrayList arrayList = (ArrayList) service.getRestaurantInfo(restaurantId);
        log.info("arrayList={}",arrayList);
        return arrayList;
    }
}
