package project.capstone.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewDao {
    @Autowired
    SqlSession session;
    String namespace = "project.capstone.dao.ReviewMapper.";
    public List<Object> selectReviewList(Integer restaurantId){
        return session.selectList(namespace+"selectReviewList",restaurantId);
    }

    public List<Object> selectMyReviews(Integer reviewerId){
        return session.selectList(namespace+"selectMyReviews",reviewerId);
    }
    public List<Object> selectReviewDetail(Integer reviewerId) {
        return session.selectList(namespace+"selectReviewDetail",reviewerId);
    }

    public Integer countRestReview(Integer restaurantId) {
        return session.selectOne(namespace+"countRestReview",restaurantId);
    }
    public Integer countMyReview(Integer reviewerId) {
        return session.selectOne(namespace+"countMyReview",reviewerId);
    }

}