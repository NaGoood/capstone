package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.RestaurantDao;
import project.capstone.domain.RestaurantDto;

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

    public int setRestaurantInfo(RestaurantDto restaurantDto) {
        return restaurantDao.insertRestInfo(restaurantDto);
    }

    public int checkRestaurant (String restAddress) {
        return restaurantDao.selectRestAddress(restAddress);
    }
}
