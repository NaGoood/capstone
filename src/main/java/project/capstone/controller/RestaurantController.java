package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.ReservationDto;
import project.capstone.domain.RestaurantDto;
import project.capstone.service.RestaurantService;
import project.capstone.service.ReviewService;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService service_rest;

    @Autowired
    ReviewService service_review;

    @GetMapping("/restaurants")
    public List<RestaurantDto> fetchRestaurant(@RequestParam("location") String location, @RequestParam("category") String category){
        log.info("[카테고리에 맞는 식당리스트 조회]");
        ArrayList restaurants = (ArrayList)service_rest.getRestaurantList(location, category);
        return  returnReviewCount(restaurants);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ArrayList<RestaurantDto> restaurantInfo(@PathVariable String restaurantId){
        log.info("[식당 세부 정보 조회]");
        ArrayList arrayList = (ArrayList) service_rest.getRestaurantInfo(restaurantId);
        return returnReviewCount(arrayList);
    }

    public ArrayList<Object> returnReviewCount(ArrayList<Object> arrayList) {
        for(int i=0; i< arrayList.size(); i++){
            RestaurantDto restaurantDto = (RestaurantDto) arrayList.get(i);
            arrayList.remove(i);
            Integer reviewCount = service_review.getRestReviewCount(restaurantDto.getRestaurantId());
            restaurantDto.setReviewCount(reviewCount);
            arrayList.add(i,restaurantDto);
        }
        log.info("[Count 계산]");
        return arrayList;
    }

    @PostMapping("/reservation")
    public String useReservation(@Valid @RequestBody ReservationDto reservation) {
        log.info("reservation={}",reservation);
        return "ok";
    }


}
