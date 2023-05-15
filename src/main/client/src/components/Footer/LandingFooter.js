import React, {useEffect, useRef, useState} from "react";
import {Col, Form, Input, message, Modal, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {useFetchCurrentUser} from "../../hooks";

const AppFooter = () => {

    const navigate = useNavigate();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

    const mounted = useRef(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRestaurant, setRestaurant] = useState([""]);
    const [currentUser, setCurrentUser] = useState({});

    const [isModal , setModal] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const addRestaurant = () => {

    }

    const modalClick = async () => {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        isModal == false ? setModal(true) : (isModal == true ? setModal(false) : console.log("모달"));
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
                    /*href="https://forx-news.gitbook.io/forx-news-wiki"
                    target="_blank"
                    rel="noopener noreferrer"*/
                    onClick={modalClick}
                >
                    가게 등록
                </a>
                <Modal title="가게 등록하기" open={isModalOpen} onCancel={handleCancel}
                >
                    <Form
                        name="restaurantInfo"
                    >
                        <Form.Item
                            label="가게 이름"
                        >
                            <Input
                                className="footer-item"
                                placeholder="가게 이름을 입력해주세요"
                                onChange={addRestaurant}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="가게 위치"
                        >
                            <Input
                                className="footer-item"
                                placeholder="가게 위치를 입력해주세요"
                                //onChange={}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="가게 사진"
                        >
                            <Input
                                className="footer-item"
                                type="file"
                                //onChange={}
                            ></Input>
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