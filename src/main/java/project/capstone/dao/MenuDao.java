package project.capstone.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.capstone.domain.MenuDto;

import java.util.List;

@Repository
public class MenuDao {
    /**
     * 받은 레스토랑 Id를 통해서 select한 값을 리스트로 반환해주기
     */

    @Autowired
    SqlSession session;

    String namespace = "project.capstone.dao.MenuMapper.";

    public int insertMenu(MenuDto dto) {
        return session.insert(namespace + "addMenu", dto);
    }

    public List<Object> selectMenu(String restaurantId) {
        return session.selectList(namespace + "menuList", restaurantId);
    }
}
