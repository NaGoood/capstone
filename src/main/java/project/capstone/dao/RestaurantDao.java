package project.capstone.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.capstone.domain.RestaurantDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RestaurantDao {

    String namespace = "project.capstone.dao.RestaurantMapper.";

    @Autowired
    SqlSession session;

    public List<Object> selectRestList(String address,String categories){
        Map map = new HashMap();
        map.put("address",address);
        map.put("categories",categories);
        return session.selectList(namespace+"selectRestList",map);
    }

    public List<Object> selectRestInfo(String restaurantId){
        return session.selectList(namespace+"selectRestInfo",restaurantId);
    }

    public Integer updateRestState(Map map){
        return session.update(namespace+"updateRestState",map);
    }

    public int insertRestInfo(RestaurantDto restaurantDto) {
        return session.insert(namespace+"insertRestInfo", restaurantDto);
    }

    public int selectRestAddress(String restAddress) {
        return session.selectOne(namespace+"checkAddress",restAddress);
    }
}