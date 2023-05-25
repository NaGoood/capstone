import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, message, Modal, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {useFetchCurrentUser, useSaveRestaurant} from "../../hooks";
import {Option} from "antd/es/mentions";

const AppFooter = () => {

    //#region 변수
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [isSaveRestaurant, saveRestaurant] = useSaveRestaurant();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mounted = useRef(false);

    const [currentUser, setCurrentUser] = useState({});
    const [restInfo, setRestInfo] = useState({
        restaurantName:"",
        restaurantLocation:"",
        restaurantImg:"",
        restaurantCategory:""
    });

    const { restaurantName, restaurantLocation, restaurantImg, restaurantCategory } = restInfo;

    const [isModal , setModal] = useState(false);
    //#endregion

    async function uploadImg(imageFile) {
        const apiKey = "6ea836ffc50696823b9566bfa44f6d78";

        const formData = new FormData();
        formData.append('image', imageFile);
        const test = formData.get('image');
        console.log(test);

        const response = await fetch('https://api.imgbb.com/1/upload?key='+apiKey, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);
        return data.data.url;
    }

    const onFinish = (values) => {
        if(values.restaurantName != null) {
            console.log(restInfo);
            onInputFinish();
            setIsModalOpen(false);
        }
    }

    //#region 모달 값변경 이벤트
    const onChangRestaurantName = (e) => {
        setRestInfo({...restInfo , restaurantName: e.target.value})
    }

    const onChangRestaurantLocation = (e) => {
        setRestInfo({...restInfo , restaurantLocation: e.target.value})
    }

    const onChangRestaurantImg = async (e) => {
        const fileInput = document.getElementById(e.target.id);
        const file = fileInput.files[0];
        const imageUrl = await uploadImg(file);
        console.log(imageUrl);
        setRestInfo({...restInfo , restaurantImg: imageUrl})
    }

    const onChangRestaurantCategory = (value) => {
        setRestInfo({...restInfo , restaurantCategory: value})
    }
    //#endregion


    //#region 모달 창 여부
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    //#endregion

    //#region 모달 클릭 이벤트
    const modalClick = async () => {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        isModal == false ? setModal(true) : (isModal == true ? setModal(false) : console.log("모달"));
    }
    //#endregion

    const onInputFinish = async () => {
        form.resetFields();
        const responseStatus = await saveRestaurant(restaurantName, restaurantLocation, restaurantImg, restaurantCategory, currentUser.userId);
        console.log(responseStatus);
        switch (responseStatus) {
            case 201:
                message.success("가게 등록 성공");
                break;
            case 500:
                message.error("현재 서버 문제로 가게 등록을 할 수 없습니다.");
            default:
                message.error("가게 등록 실패");
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        else if (!currentUser) {
            message.error("로그인이 필요합니다.");
            navigate("/login", {
                state: { form:window.location.pathname },
            });
            setCurrentUser(null);
        } else  {
            console.log("LandingFooter" , currentUser); //현재 이용자 데이터 확인하기
            currentUser.userType === "사장님" ? showModal() : message.error("권한이 없습니다");
        }
    }, [isModal])

    return (
        <Row justify="space-evenly">
            <Col className="footer-col" span={8}>
                <a
                    onClick={modalClick}
                >
                    가게 등록
                </a>
                <Modal
                    title="가게 등록하기"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    okButtonProps={{ style: {display:'none'}}}
                >
                    <Form
                        name="restaurantInfo"
                        //layout="vertical"
                        autoComplete="off"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="가게 이름"
                            name="restaurantName"
                            rules={[
                                {
                                    required: true,
                                    message: "가게 이름을 입력해주세요",
                                },
                            ]}
                        >
                            <Input
                                className="footer-item"
                                placeholder="가게 이름을 입력해주세요"
                                name="restaurantName"
                                onChange={onChangRestaurantName}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="가게 위치"
                            name="restaurantLocation"
                            rules={[
                                {
                                    required: true,
                                    message: "가게 위치를 입력해주세요",
                                },
                            ]}
                        >
                            <Input
                                className="footer-item"
                                placeholder="가게 위치를 입력해주세요"
                                name="restaurantLocation"
                                onChange={onChangRestaurantLocation}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="가게 사진"
                            name="restaurantImg"
                            rules={[
                                {
                                    required: true,
                                    message: "가게 사진을 등록해주세요",
                                },
                            ]}
                        >
                            <Input
                                className="footer-item"
                                type="file"
                                placeholder="사진을 선택해주세요"
                                name="restaurantImg"
                                id="file-input"
                                onChange={onChangRestaurantImg}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="3D 이미지"
                            name="restaurant3DImg"
                            rules={[
                                {
                                    required: true,
                                    message: "좌석 사진을 등록해주세요",
                                },
                            ]}
                        >
                            <Input
                                className="footer-item"
                                type="file"
                                placeholder="사진을 선택해주세요"
                                name="restaurantImg"
                                id="file-input"
                                onChange={onChangRestaurantImg}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="가게 종류"
                            name="restaurantCategory"
                            rules={[
                                {
                                    required: true,
                                    message: "가게 종류를 선택해주세요",
                                },
                            ]}
                        >
                            <Select placeholder="가게 종류를 선택해주세요" onChange={onChangRestaurantCategory}>
                                <Option value="햄버거">햄버거</Option>
                                <Option value="피자">피자</Option>
                                <Option value="정육">정육</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="addRestaurant"
                                type="primary"
                                onClick={onFinish}
                                htmlType="submit"
                            >등록하기</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Col>


            <Col className="footer-col" span={8}>
                <a
                    href="https://github.com/NaGoood/capstone"
                >
                    도움말
                </a>
            </Col>

        </Row>
    );
};

export default AppFooter;