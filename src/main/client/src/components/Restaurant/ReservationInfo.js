import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col, Tooltip, Space, message, Button, Modal, Form, Checkbox, Input, Avatar, List, Card} from "antd";
import {CarryOutOutlined,ContactsOutlined,UserOutlined,DashboardOutlined,FireOutlined } from "@ant-design/icons";
const ReservationInfo = ({ reservInfoData, userName,userId}) => {

    const navigate = useNavigate();

    const {
        restaurantName,
        reservDate,
        reservNumber,
        reservTime,
        restaurantId,
    } = reservInfoData;
    const reservCancel = () => {
        alert("버튼 클릭")
        console.log("restaurantId : ",restaurantId)
        console.log("userId : ",userId)
    }

    const data = [
        {
            title: "예약정보",
            time : reservTime,
            people : reservNumber,
            date : reservDate,
            name : userName
        }
    ];
    return (
        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <Space direction="vertical" size={10}>
                        <Card className= "reservationInfo"
                            title="예약정보"
                            // extra={<a href="#">More</a>}
                            style={{
                                width: 250,
                            }}
                        >
                            <p>[{restaurantName}]</p>
                            <p><UserOutlined /> : {item.name}님</p>
                            <p><CarryOutOutlined /> : {item.date}</p>
                            <p><DashboardOutlined /> : {item.time}시</p>
                            <p><ContactsOutlined /> : {item.people}명</p>
                        </Card>
                        <Button className="cancelBtn" onClick={reservCancel}><FireOutlined />예약취소</Button>
                    </Space>
                </List.Item>
            )}
        />
    )
};

export default ReservationInfo;
