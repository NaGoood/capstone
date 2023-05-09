package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.ReservationDto;
import project.capstone.domain.UserDto;
import project.capstone.service.ReservationService;

import javax.validation.Valid;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class ReservationController {
    @Autowired
    ReservationService service;

    @PostMapping("/reservation")
    public String useReservation(@Valid @RequestBody ReservationDto reservation) {
        log.info("reservation={}",reservation);
        int rowCnt = service.save(reservation);
        if(rowCnt == 1)
            System.out.println("예약완료");
        return "ok";
    }

    @GetMapping("/reservationList")
    public ResponseEntity getReservList(@RequestParam Integer userId){
        ArrayList list =  (ArrayList) service.getReservList(userId);
        return new ResponseEntity(list,HttpStatus.OK);
    }

    @GetMapping("/reservationInfo")
    public ResponseEntity getReservInfo(@RequestParam Integer userId){
        ArrayList list =  (ArrayList) service.getReservInfo(userId);
        return new ResponseEntity(list,HttpStatus.OK);
    }
}

