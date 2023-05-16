package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.RestaurantDao;
import project.capstone.domain.RestaurantDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Integer updateRestState(RestaurantDto dto){
        Map map = new HashMap();
        map.put("restaurantId",dto.getRestaurantId());
        map.put("open",dto.getOpen());
        return restaurantDao.updateRestState(map);
    }
}
