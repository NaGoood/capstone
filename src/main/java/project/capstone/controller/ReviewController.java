package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.ReviewDto;
import project.capstone.service.ReviewService;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@Slf4j
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    // region reviews 코드 설명
    /*
        reviews 코드는 RestaurantDetail 페이지에서
        URL로 두가지 요청을 보낸다 1. restaurantId  2. reviewerId
        각 요청에 따라 2가지의 코드가 실행
        첫번째 restaurantId에 해당하는 리뷰 리스트 불러오기
        두번째 reviewerId에 해당하는 리뷰 정보들 불러오기
    */
    // endregion
    @GetMapping("/reviews")
    public ArrayList<ReviewDto> restaurantReviews(@RequestParam(required = false,defaultValue = "") Integer restaurantId, @RequestParam(required = false,defaultValue = "") Integer reviewerId){
        log.info("[리뷰요청받음]");
        ArrayList arrayList;
        if(reviewerId ==null){
            arrayList = (ArrayList)reviewService.getReviewList(restaurantId);
            for(int i =0; i< arrayList.size(); i++) {
                log.info("[식당 리뷰 정보 조회]");
                ReviewDto reviewDto = (ReviewDto) arrayList.get(i);
                arrayList.remove(i);
                Integer reviewCount = reviewService.getMyReviewCount(reviewDto.getReviewerId()); // return 리뷰작성자 리뷰 쓴 개수
                reviewDto.setReviewCount(reviewCount);
                arrayList.add(i,reviewDto);
            }
        } else {
            log.info("[ReviewerId에 따른 리뷰 정보 조회]");
            arrayList = (ArrayList)reviewService.getMyReview(reviewerId);
        }
        return arrayList;
    }

    @GetMapping("/reviewer/{reviewerId}")
    public ArrayList myReivewsInfo(@PathVariable Integer reviewerId){
        log.info("[리뷰 세부 정보 조회]");
        ArrayList arrayList = (ArrayList) reviewService.getReviewDetail(reviewerId);
        return arrayList;
    }


}