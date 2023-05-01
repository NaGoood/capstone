package project.capstone.domain;

import lombok.Data;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

@Data
public class ReviewDto {
    Integer reviewId;
    Integer reviewerId;
    String reviewerName;
    String restaurantName;
    String rating;
    String content;
    Date date;
    String imageUrl;
    // 예약어 사용
    Integer usefulCount;
    Integer funnyCount;
    Integer coolCount;
    Double avgRating;
    Integer reviewCount;


    public ReviewDto() {}

    public ReviewDto(Integer reviewId, Integer reviewerId, String reviewerName, String restaurantName, String rating, String content, Date date, String imageUrl, Integer usefulCount, Integer funnyCount, Integer coolCount, Double avgRating, Integer reviewCount) {
        this.reviewId = reviewId;
        this.reviewerId = reviewerId;
        this.reviewerName = reviewerName;
        this.restaurantName = restaurantName;
        this.rating = rating;
        this.content = content;
        this.date = date;
        this.imageUrl = imageUrl;
        this.usefulCount = usefulCount;
        this.funnyCount = funnyCount;
        this.coolCount = coolCount;
        this.avgRating = avgRating;
        this.reviewCount = reviewCount;
    }
}
