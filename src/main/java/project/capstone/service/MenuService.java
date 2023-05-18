package project.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.capstone.dao.MenuDao;
import project.capstone.domain.MenuDto;

import java.util.List;

@Service
public class MenuService {
    /**
     * 받은 레스토랑 Id를 통해서 메뉴Dao로 select할 수 있게 넘겨주기
     * 리턴받은 값은 리스트 값으로
     * Service --> Dao
     */

    @Autowired
    MenuDao menuDao;

    public int menuSave(MenuDto dto) {
        return menuDao.insertMenu(dto);
    }

    public List<Object> getMenuList(String restaurantId) {
        return menuDao.selectMenu(restaurantId);
    }


}
