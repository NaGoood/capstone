package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.capstone.domain.MenuDto;
import project.capstone.service.MenuService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class MenuController {

    @Autowired
    MenuService service;

    @PostMapping("/menuItem")
    public String registerMenu(@RequestBody MenuDto menuItem) {

        log.info("menuItem={}", menuItem);
        int menuCount = service.menuSave(menuItem);
        if (menuCount == 1)
            log.info("등록 완료");
        return "ok";
    }

    @GetMapping("/menuItem/{restaurantId}")
    public List<MenuDto> useMenuItem(@PathVariable String restaurantId) {

        /**
         * 레스토랑 아이디로 메뉴 찾기??
         * 레스토랑 아이디로 해당하는 레스토랑 음식 리스트를 반환해주기
         * Controller --> Service
         */

        ArrayList menuItemList = (ArrayList) service.getMenuList(restaurantId);
        return menuItemList;
    }
}
