import {useState} from "react";
import {Form, Input} from "antd";
import {useReservation, useSignup} from "hooks";

const Reservation = () =>{
    const [isReservation, reservation] = useReservation();

    const [formData,setFormData] = useState({
        reservationName:"",
        reservationNumber:"",
        reservationDate:""
    });

    const {reservationName,reservationNumber,reservationDate} = formData;

    const onUserReservation = async () => {
        const response = await reservation(reservationName, reservationNumber, reservationDate);
        console.log("onUserReservation",response);
        if(response.status == 200){
            console.log("안녕");
        }
    }

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                <Input
                    placeholder="이름을 입력해주세요"
                    name="reservationName"
                    value={formData.reservationName}
                    size="middle"
                    onChange={onInputChange}
                />
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
                <Input
                    placeholder="전화번호을 입력해주세요"
                    name="reservationNumber"
                    value={formData.reservationNumber}
                    onChange={onInputChange}
                />
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
                <Input
                    placeholder="날짜을 입력해주세요"
                    name="reservationDate"
                    value={formData.reservationDate}
                    onChange={onInputChange}
                />
            </Form.Item>
                <button onClick={onUserReservation}>예약하기</button>
            </Form>
        </div>
    );
};

export default Reservation;