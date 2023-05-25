import {useEffect, useState} from "react";
import {Calendar, Checkbox, DatePicker, Form, List, message, Space, TimePicker, Typography} from "antd";
import {useFetchCurrentUser,useFetchRestaurant, useReservation, useSignup} from "hooks";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import useMenuItem from "../../hooks/use-menuItem";
import useTableInfo from "../../hooks/use-tableInfo"

//3d
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PerspectiveCamera } from 'three';
import Model from "./Model";
import SeatSelection from "./SeatSelection";

const Reservation = ({restaurantId}) =>{
    const navigate = useNavigate();
    const [isReservation, reservation] = useReservation();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [isFetchingRestaurant, fetchRestaurant] = useFetchRestaurant();
    const [isMenuItem, menuItem] = useMenuItem();
    const [reservNumber , setreservNumber] = useState(0)
    const [currentUser, setCurrentUser] = useState({});
    const [reservDate, setreservDate] = useState("");
    const [reservtime, setreservTime] = useState("");
    const [menu, setMenu] = useState([""]);
    const [menuList, setMenuList] = useState([]);
    const [tableNumber,setTableNumber] = useState("");
    const [tableType,setTableType] = useState("");
    const [isTableInfo,tableInfo] = useTableInfo();

    //3d
    const [SeatSelectionOpen, setSeatSelectionOpen] = useState(false);
    const [ModelOpen, setModelOpen] = useState(true);
    const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera.position.set(10, 10, 10);
    const camera1 = new PerspectiveCamera(11, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera1.position.set(0, 110, 0); // 카메라 위치 조정
    camera1.lookAt(0, 0, 0); // 모델을 중심으로 시야를 조정할 수 있습니다.
     // 모델을 중심으로 시야를 조정할 수 있습니다.

    const on3DModels =  () => {
        setSeatSelectionOpen(false);
        setModelOpen(true);
    }

    //3D 끝

    const onSeatSelection = () => {
        setModelOpen(false);
        setSeatSelectionOpen(true);
    };


    function onSelectDate(value) {
        setreservDate(value.format("YYYY-MM-DD"));
    }

    function onSelectTime(value) {
        setreservTime(value.format("HH:mm"));
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await fetchCurrentUser();

            if (!user) {
                message.error("로그인이 필요합니다.")
                navigate("/login", {
                    state: { form:window.location.pathname },
                });
            } else  {
                setCurrentUser(user);
                console.log("currentUser={}",currentUser); //현재 이용자 데이터 확인하기
                const fetchMenuItem = async () => {
                    const menuItemList = await menuItem(restaurantId);
                    setMenuList(menuItemList);
                };
                fetchMenuItem();
                const fetchTableInfo = async()=>{
                    const table = await tableInfo(restaurantId);
                    console.log(table);
                };
                fetchTableInfo();
            }
        }
        fetchUserData();
    }, [])

    const onUserReservation = async () => {
        if(tableNumber === "") {
            message.error("좌석을 선택해주세요 !!!")
            return;
        } else {
            const response = await reservation(currentUser.userId, restaurantId, reservDate, reservNumber, tableNumber,tableType);
            console.log("onUserReservation", response);
            if (response.status == 200) {
                setTableNumber("");
                window.location.replace("/")
                message.success('예약 완료!');
            }
        }
    }

    const reservationPeopleUp = () => {
        setreservNumber(reservNumber + 1);
    }

    const reservationPeopleDown = () => {
        reservNumber <= 0 ? setreservNumber(0) : setreservNumber(reservNumber - 1);
    }

    const selectMenu = (e) => {
        console.log(e.target.value);
        setMenu(e.target.value);
        console.log(menu);
    }


    return(
        <div className="div-container-asd">
            <div className="left-box">
                <Form
                    name="reservation-form"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    requiredMark={false}
                    autoComplete="on"
                    style={{
                        maxWidth: 550,
                    }}
                >
                    <Form.Item
                        label="이름"
                        name="reservationName"
                    >
                        <Typography>
                            <pre className="input-font">{currentUser.userName}</pre>
                        </Typography>
                    </Form.Item>

                    <Form.Item
                        label="전화번호"
                        name="reservationNumber"
                    >
                        <Typography>
                            <pre className="input-font">{currentUser.phoneNumber}</pre>
                        </Typography>
                    </Form.Item>

                    <Space direction="horizontal">
                        <Form.Item
                            label="예약 날짜"
                            name="reservDate"
                            rules={[
                                {
                                    required:true,
                                    message:"날짜를 선택해주세요"
                                }
                            ]}
                        >
                            <DatePicker
                                onChange={onSelectDate}
                                placeholder="날짜를 선택해주세요"
                            />
                        </Form.Item>
                        <Form.Item
                            label="예약 시간"
                            name="reservTime"
                            rules={[
                                {
                                    required:true,
                                    message:"시간을 선택해주세요"
                                }
                            ]}
                        >
                            <TimePicker
                                defaultValue={moment('07:00', "HH:mm")}
                                format="HH:mm"
                                minuteStep={30}
                                onChange={onSelectTime}
                            />
                        </Form.Item>
                    </Space>

                    <Form.Item
                        label="인원 수"
                        name="reservNumber"
                    >
                        <div>
                            <h1>{reservNumber}</h1>
                            <button onClick={reservationPeopleUp}>+</button>
                            <button onClick={reservationPeopleDown}>-</button>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="메뉴 선택하기"
                        name="selectMenu">
                        <List
                            dataSource={menuList}
                            renderItem={item => (
                                <List.Item key={item.menuId}>
                                    <Checkbox
                                        onChange={selectMenu}
                                        value={`${item.menuId} : ${item.menuName} : ${item.menuPrice}`}
                                    >{`${item.menuName} : ${item.menuPrice}원`}</Checkbox>
                                </List.Item>
                            )}
                        />
                    </Form.Item>
                    <button onClick={onUserReservation}>예약하기</button>
                </Form>
            </div>
            <div className="right-box">
                <div className="model-container">
                {!SeatSelectionOpen && ModelOpen && ( // 모델을 보이거나 숨기는 조건부 렌더링
                    <Canvas camera={camera} gl={{ alpha: true }}>
                        <OrbitControls />
                        <ambientLight />
                        <Model position={[0, 0, 0]} />
                    </Canvas>
                )}{SeatSelectionOpen && !ModelOpen && ( // 모델을 보이거나 숨기는 조건부 렌더링
                        <Canvas camera={camera1} >
                            <ambientLight />
                            <SeatSelection reservNumber={reservNumber} onSelectionInfo={setTableNumber} onSelectionInfo2 = {setTableType} position={[0, 0, 0]}/>
                        </Canvas>
                    )}
                </div>
                <div>
                    <button onClick={on3DModels}>3D Model</button>&nbsp;
                    <button onClick={onSeatSelection}>좌석선택</button>
                </div>
            </div>
        </div>
    );
};

export default Reservation;