import {useEffect, useState} from "react";
import {Button, Calendar, Form, Input, InputNumber, message, Typography} from "antd";
import {useFetchCurrentUser, useReservation, useSignup} from "hooks";
import {useNavigate} from "react-router-dom";
import locale from "antd/es/calendar/locale/ko_KR";

const Reservation = () =>{
    const navigate = useNavigate();
    const [isReservation, reservation] = useReservation();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

    const [currentUser, setCurrentUser] = useState({});
    const [formData,setFormData] = useState({
        reservationName:"",
        reservationNumber:"",
        reservationDate:"",
        reservationCount:0,
    });

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
                //console.log(currentUser); //현재 이용자 데이터 확인하기
            }
        }
        fetchUserData();
    }, [])


    const {reservationName,reservationNumber,reservationDate, reservationCount} = formData;

    const onUserReservation = async () => {
        const response = await reservation(reservationName, reservationNumber, reservationDate, reservationCount);
        console.log("onUserReservation",response);
        if(response.status == 200){
            console.log("안녕");
        }
    }

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const reservationPeopleUp = (e) => {
        formData.reservationCount++;
    }

    const reservationPeopleDown = (e) => {
        formData.reservationCount--;
    }


    return(
        <div className="div-container-asd">
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
                    rules={[
                        {
                            required:true,
                            message: "이름을 입력하지 않았습니다."
                        },
                    ]}
                >
                    {/*<Input
                    type="text"
                    name="reservationName"
                    // value={currentUser.userName}
                    value="123"
                    size="middle"
                    disabled
                />*/}
                    <Typography>
                        <pre>{currentUser.userName}</pre>
                    </Typography>
                </Form.Item>

                <Form.Item
                    label="전화번호"
                    name="reservationNumber"
                    rules={[
                        {
                            required:true,
                            message: "전화번호을 입력하지 않았습니다."
                        },
                    ]}
                >
                    {/*<Input
                    name="reservationNumber"
                    value={formData.reservationNumber}
                    disabled
                />*/}
                    <Typography>
                        <pre>{currentUser.phoneNumber}</pre>
                    </Typography>
                </Form.Item>

                <Form.Item
                    label="날짜"
                    name="reservationDate"
                    rules={[
                        {
                            required:true,
                            message: "날짜을 입력하지 않았습니다."
                        },
                    ]}
                >
                    {/*<Input
                    placeholder="날짜을 입력해주세요"
                    name="reservationDate"
                    value={formData.reservationDate}
                    onChange={onInputChange}
                />*/}
                    <Calendar
                        fullscreen={false}
                        onChange={onInputChange}
                        locale={locale}
                        value={formData.reservationDate}
                    />
                </Form.Item>

                <Form.Item
                    label="인원 수"
                    name="reservationCount"
                >
                </Form.Item>
                <button onClick={onUserReservation}>예약하기</button>
            </Form>
        </div>
    );
};

export default Reservation;