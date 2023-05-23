package project.capstone.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.capstone.domain.ReservationDto;

import java.util.List;

@Repository
public class ReservationDao {
    @Autowired
    SqlSession session;

    String namespace = "project.capstone.dao.ReservationMapper.";

    public int insert(ReservationDto dto) {
        return session.insert(namespace+"addReserv",dto);
    }

    public List<Object> selectRest(int userId){
       return session.selectList(namespace+"checkReserv",userId);
    }

    public List<Object> selectReserv(int userId) {
        return session.selectList(namespace+"reservInfo",userId);
    }

    public List<Object> selectStoreReservationList(String restaurantId) {
        return session.selectList(namespace + "storeReservationList", restaurantId);
    }

}
