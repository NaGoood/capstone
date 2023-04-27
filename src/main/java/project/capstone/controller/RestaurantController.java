package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.ReservationDto;
import project.capstone.domain.RestaurantDto;
import project.capstone.service.RestaurantService;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService service;

    @PostMapping("/reservation")
    public String useReservation(@Valid @RequestBody ReservationDto reservation) {
        log.info("reservation={}",reservation);

        return "ok";
    }
}
