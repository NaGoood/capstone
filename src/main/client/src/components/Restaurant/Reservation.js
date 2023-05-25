import {useEffect, useState} from "react";
import {Calendar, Checkbox, DatePicker, Form, List, message, Space, Table, TimePicker, Typography} from "antd";
import {useFetchCurrentUser, useReservation, useSignup} from "hooks";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import useMenuItem from "../../hooks/use-menuItem";

const Reservation = ({restaurantId}) =>{
    const navigate = useNavigate();
    const [isReservation, reservation] = useReservation();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [isMenuItem, menuItem] = useMenuItem();

    const [reservNumber , setreservNumber] = useState(0)
    const [currentUser, setCurrentUser] = useState({});
    const [reservDate, setreservDate] = useState("");
    const [reservTime, setreservTime] = useState("");
    const [reservMenu, setreservMenu] = useState([]);
    const [menuList, setMenuList] = useState([]);


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
            }
        }
        fetchUserData();
    }, [])

    const onUserReservation = async () => {
        const response = await reservation(currentUser.userId, restaurantId, reservDate, reservNumber, reservTime, [reservMenu]);
        console.log("onUserReservation",response);
        if(response.status == 200){
            window.location.replace("/")
            message.success('예약 완료!');
        }
    }

    const reservationPeopleUp = () => {
        setreservNumber(reservNumber + 1);
    }

    const reservationPeopleDown = () => {
        reservNumber <= 0 ? setreservNumber(0) : setreservNumber(reservNumber - 1);
    }

    function selectMenu(selectedMenu, selected) {
        console.log(selectedMenu);
        if (selected) {
            setreservMenu(prevSelectedMenus => [...prevSelectedMenus, selectedMenu.menuName]);
        } else {
            setreservMenu(prevSelectedMenus => prevSelectedMenus.filter(id => id !== selectedMenu.menuName));
        }

        console.log(reservMenu);
    }


    const columns = [
        {
            title: '이름',
            dataIndex: 'menuName',
        },
        {
            title: '가격',
            dataIndex: 'menuPrice',
            render: (text) => <>{text}원</>,
        },
    ]


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
                        name="selectMenu"
                    >
                        <Table
                            dataSource={menuList}
                            columns={columns}
                            rowSelection={{
                                type: "checkbox",
                                onSelect: selectMenu,
                            }}
                            rowKey='menuId'
                        />
                    </Form.Item>
                    <button onClick={onUserReservation}>예약하기</button>
                </Form>
            </div>

            <div className="right-box">

            </div>
        </div>
    );
};

export default Reservation;