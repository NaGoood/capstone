import {Checkbox, List, message} from "antd";
import {useEffect, useState} from "react";

/**
 * 레스토랑을 선택해서 들어오면 선택한 레스트랑 정보를 받아오고
 * 받아온 레스토랑 정보에서 메뉴 데이터를 뽑아서
 * 음식 이미지, 음식 가격, 음식 이름, 음식 카테고리??
 * 음식 정보를 리스트로 받아서 루프로 출력해야됨
 */

const MenuPage = ({
                      restaurantId,
                      imageUrl
                  }) => {

    const handleCheckMenu = (e) => {
        console.log(restaurantId);
    }




    return(
        <List className="rest-item">
            <div>
                <img className="img-size" src={/*음식 사진 출력*/imageUrl} />
            </div>
            <label>{/*라벨 태그에서 음식 이름 출력*/}김진영의 볼케이노 피자</label>
            <label>15,000원</label>
        </List>
    )
}


export default MenuPage;