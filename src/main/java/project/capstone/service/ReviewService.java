package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.ReviewDao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {
    @Autowired
    ReviewDao reviewDao;

    public List<Object> getReviewList(Integer restaurantId) {
        return reviewDao.selectReviewList(restaurantId);
    }

    public List<Object> getMyReview(Integer reviewerId) {
        return reviewDao.selectMyReviews(reviewerId);
    }

    public List<Object> getReviewDetail(Integer reviewerId) {return reviewDao.selectReviewDetail(reviewerId);}

    public Integer getRestReviewCount(Integer restaurantId) {
        return reviewDao.countRestReview(restaurantId);
    }
    public Integer getMyReviewCount(Integer reviewerId) {
        return reviewDao.countMyReview(reviewerId);
    }

    public Integer updateReview(String content,Integer reviewId,String rating){
        Map map = new HashMap();
        map.put("content",content);
        map.put("reviewId",reviewId);
        map.put("rating",rating);
        return reviewDao.updateReview(map);
    }

    public Integer deleteReview(Integer reviewId){
        return reviewDao.deleteReview(reviewId);
    }
}
