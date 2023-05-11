import {Card, Checkbox, Divider, List, message, Typography} from "antd";
import {useEffect, useState} from "react";
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
            console.log(menuItemList);
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
                    header={<div>메인 메뉴</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <Card
                            hoverable
                            style={{
                                width: 150,
                                margin: '15px',
                            }}
                            cover={<img alt="example" src={item}/>}
                        >
                            <Meta title="김진영의 볼케이노 피자" description="15,000원"/>
                        </Card>
                    )}
                />
            </List>
        </>
    )
}


export default MenuPage;