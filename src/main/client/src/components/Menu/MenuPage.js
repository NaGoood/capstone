import {Card, List} from "antd";
import {useEffect, useState} from "react";
import useMenuItem from "../../hooks/use-menuItem";
import Meta from "antd/es/card/Meta";


const MenuPage = ({
                      restaurantId,
                        userId,
                        ownerId
                  }) => {

    const [isMenuItem, menuItem] = useMenuItem();
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        const fetchMenuItem = async () => {
            const menuItemList = await menuItem(restaurantId);
            setMenuList(menuItemList);
            console.log(userId);
            console.log(ownerId);
        };
        fetchMenuItem();
    }, [])

    return(
        <>
            <List className="rest-item">
                <List
                    style={{
                        width:1000,
                    }}
                    header={<div>
                        <div className="Meta-font">메인 메뉴</div>
                        {/*<div className="div-select">*/}
                        {/*    <select>*/}
                        {/*        <option value="1" >메인메뉴</option>*/}
                        {/*        <option value="2">사이드메뉴</option>*/}
                        {/*        <option value="3">기타</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                    </div>
                    }
                    bordered
                    dataSource={menuList}
                    renderItem={item => (
                        <div>
                            <Card
                                className="Card-size"
                                cover={<img className="img-size" alt="example" src={item.menuImg}/>}
                            >
                                {/*<Meta className="Meta-font" title="김진영의 볼케이노 피자" description="15,000원"/>*/}
                                <div className="div-food-info">
                                    <h1 className="food-name">{item.menuName}</h1>
                                    <h1 className="food-info">{item.menuInfo}</h1>
                                    <h1 className="food-price">{item.menuPrice}</h1>
                                </div>
                            </Card>
                        </div>
                    )}
                />
            </List>
        </>
    )
}


export default MenuPage;