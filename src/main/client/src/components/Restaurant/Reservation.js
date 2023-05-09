import {useEffect, useState} from "react";
import { Calendar, Form, message, Typography} from "antd";
import {useFetchCurrentUser, useReservation, useSignup} from "hooks";
import {useNavigate} from "react-router-dom";
import locale from "antd/es/calendar/locale/ko_KR";

const Reservation = ({restaurantId}) =>{
    const navigate = useNavigate();
    const [isReservation, reservation] = useReservation();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

    const [reservNumber , setreservNumber] = useState(0)
    const [currentUser, setCurrentUser] = useState({});
    const [reservDate, setreservDate] = useState("");

    function onSelect(value) {
        setreservDate(value.format("YYYY-MM-DD"));
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
            }
        }
        fetchUserData();
    }, [])

    const onUserReservation = async () => {
        const response = await reservation(currentUser.userId,restaurantId, reservDate, reservNumber);
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
                >
                    <Typography>
                        <pre>{currentUser.userName}</pre>
                    </Typography>
                </Form.Item>

                <Form.Item
                    label="전화번호"
                    name="reservationNumber"
                >
                    <Typography>
                        <pre>{currentUser.phoneNumber}</pre>
                    </Typography>
                </Form.Item>

                <Form.Item
                    label="날짜"
                    name="reservDate"
                >
                    <Calendar
                        fullscreen={false}
                        onSelect={onSelect}
                        locale={locale}
                    />
                </Form.Item>

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
                <button onClick={onUserReservation}>예약하기</button>
            </Form>
        </div>
    );
};

export default Reservation;