import React, {useEffect, useState} from "react";
import {Col, Form, Input, message, Modal, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {useFetchCurrentUser} from "../../hooks";

const AppFooter = () => {

    const navigate = useNavigate();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRestaurant, setRestaurant] = useState([""]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await fetchCurrentUser();
            if (!user) {
                message.error("로그인이 필요합니다.")
                /*navigate("/login", {
                    state: { form:window.location.pathname },
                });*/
                setCurrentUser(null);
            } else  {
                console.log("currentUser={}"); //현재 이용자 데이터 확인하기
                setCurrentUser(user);
            }
        }
        fetchUserData();
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const addRestaurant = () => {

    }

    const modalClick = () => {
        if (currentUser == null) {
            navigate("/login", {
                state: { form:window.location.pathname },
            });
        }
        else if(currentUser.peopleType == 1) {

        }
        showModal();
    }




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
                    /*// href="https://github.com/ruichen199801/cis550-fa22-project"
                    href="https://github.com/ruichen199801"
                    target="_blank"
                    rel="noopener noreferrer"*/
                >
                    도움말
                </a>
            </Col>

        </Row>
    );
};

export default AppFooter;
