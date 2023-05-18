package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.RestaurantDao;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantDao restaurantDao;

    public List<Object> getRestaurantList(String location, String category){
        return restaurantDao.selectRestList(location,category);
    }

    public List<Object> getRestaurantInfo(String restaurantId){
        return restaurantDao.selectRestInfo(restaurantId);
    }
}
