import {Card, List} from "antd";
import {useEffect} from "react";
import useMenuItem from "../../hooks/use-menuItem";
import Meta from "antd/es/card/Meta";


const MenuPage = ({
                      restaurantId,
                      imageUrl
                  }) => {

    const [isMenuItem, menuItem] = useMenuItem();
    const data = [imageUrl];

    useEffect(() => {
        const fetchMenuItem = async () => {
            const menuItemList = await menuItem(restaurantId);
            console.log("menuPage's",menuItemList);
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
                        <div className="div-select">
                            <select>
                                <option value="1" >메인메뉴</option>
                                <option value="2">사이드메뉴</option>
                                <option value="3">기타</option>
                            </select>
                        </div>
                    </div>
                    }
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <div>
                            <Card
                                className="Card-size"
                                cover={<img className="img-size" alt="example" src={item}/>}
                            >
                                {/*<Meta className="Meta-font" title="김진영의 볼케이노 피자" description="15,000원"/>*/}
                                <div className="div-food-info">
                                    <h1 className="food-name">김진영의 볼케이노 피자</h1>
                                    <h1 className="food-info">참깨와 간장소스를 베이스로 육형제의 풀드포크를 곁들인 피자</h1>
                                    <h1 className="food-price">15000원</h1>
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