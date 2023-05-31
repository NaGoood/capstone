package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.ReservationDao;
import project.capstone.domain.ReservationDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReservationService {
    @Autowired
    ReservationDao reservDao;

    public int save(ReservationDto dto) {
        return reservDao.insert(dto);
    }

    public List<Object> getReservList(int userId){ return reservDao.selectRest(userId); }

    public List<Object> getReservInfo(int userId){ return reservDao.selectReserv(userId); }


    public List<Object> getStoreReservationList(String restaurantId) {
        return reservDao.selectStoreReservationList(restaurantId);
    }

    public List<Object> getTableInfo(int restaurantId) { return reservDao.selectTableInfo(restaurantId);}

    public int updateTable(int tableNumber, int tableType,boolean tableValue) {
        Map map = new HashMap();
        map.put("tableNumber",tableNumber);
        map.put("tableType",tableType);
        map.put("tableValue",tableValue);
        return reservDao.updateTable(map);
    }

}