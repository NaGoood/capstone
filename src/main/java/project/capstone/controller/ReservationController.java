package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.ReservationDto;
import project.capstone.domain.UserDto;
import project.capstone.service.ReservationService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Slf4j
public class ReservationController {
    @Autowired
    ReservationService service;

    @PostMapping("/reservation")
    public String useReservation(@Valid @RequestBody ReservationDto reservation) {
        log.info("reservation={}",reservation);
        return "ok";
    }

    @GetMapping("/reservationList")
    public String getReservList(@RequestParam Integer userId){
        log.info("userId={}" ,userId);
        return "ok";
    }
}
