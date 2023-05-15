package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.ReservationDao;
import project.capstone.domain.ReservationDto;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    ReservationDao reservDao;

    public int save(ReservationDto dto) {
        return reservDao.insert(dto);
    }

    public List<Object> getReservList(int userId){ return reservDao.selectRest(userId); }

    public List<Object> getReservInfo(int userId){ return reservDao.selectReserv(userId); }

}
