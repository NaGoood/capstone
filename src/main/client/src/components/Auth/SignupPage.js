import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Button, Form, Input, Row, message, DatePicker, Radio} from "antd";
import SplitLayout from "./SplitLayout";
import { useSignup } from "hooks";
import moment from "moment";

const SignupPage = () => {
    const [isSigningUp, signup] = useSignup();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [birthDay, setBirthDay] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        userId:"",
        userPW: "",
        phoneNumber: "",
        userType: ""
    });

    function onSelectBirth(value) {
        setBirthDay(value.format("YYYY-MM-DD"))
    }

    const { userName, userId, userPW, phoneNumber, userType } = formData;

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onInputFinish = async () => {
        form.resetFields();
        const responseStatus = await signup(userName, userId, userPW, phoneNumber, birthDay, userType);
        console.log(birthDay);
        switch (responseStatus) {
            case 201:
                message.success(`Registration Success!`);
                navigate("/login", { state: { from: window.location.pathname } });
                break;
            case 409:
                message.error("Registration Failed: You already have an account.");
                navigate("/login", { state: { from: window.location.pathname } });
                break;
            default:
                message.error("Registration Failed: Something went wrong!");
        }
    };

    return (
        <>
            <img
                className="auth-logo"
                src="/images/logo.svg"
                alt="logo"
                onClick={() =>
                    navigate("/", { state: { from: window.location.pathname } })
                }
            />
            <SplitLayout imageUrl="images/signup.jpeg" contentLayout="right">
                <Row className="auth-form-container" justify="center">
                    <div className="auth-form">
                        <div className="auth-form-header"> 회원가입 </div>
                        <Form
                            name="signup-form"
                            layout="vertical"
                            form={form}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onInputFinish}
                            requiredMark={false}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="이름"
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: "이름을 입력하지 않았습니다.",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="이름을 입력해주세요"
                                    name="userName"
                                    value={formData.username}
                                    onChange={onInputChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="아이디"
                                name="userId"
                                rules={[
                                    {
                                        required: true,
                                        message: "아이디를 입력하지 않았습니다.",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="아이디를 입력해주세요"
                                    name="userId"
                                    value={formData.id}
                                    onChange={onInputChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="비밀번호"
                                name="userPW"
                                rules={[
                                    {
                                        required: true,
                                        message: "비밀번호를 입력하지 않았습니다.",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="비밀번호를 입력해주세요"
                                    name="userPW"
                                    value={formData.userPW}
                                    onChange={onInputChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="전화번호"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: "전화번호를 입력하지 않았습니다.",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="전화번호를 입력해주세요"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={onInputChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="생일"
                                name="birthDay"
                                rules={[
                                    {
                                        required: true,
                                        message: "생일을 입력하지 않았습니다.",
                                    },
                                ]}
                            >
                                <DatePicker
                                    onChange={onSelectBirth}
                                    placeholder="생년월일을 선택해주세요"
                                    format="YYYY-MM-DD"
                                    defaultValue={moment('1990-01-01', 'YYYY-MM-DD')}
                                />
                            </Form.Item>
                            <Form.Item
                                label="사용자 구분"
                                rules={[
                                    {
                                        required:true,
                                        message:"신원을 선택하지 않았습니다"
                                    }
                                ]}
                            >
                                <Radio.Group
                                    onChange={onInputChange}
                                    value={formData.userType}
                                    name="userType"
                                >
                                    <Radio value="손님">일반 고객</Radio>
                                    <Radio value="사장님">관리자</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className="auth-form-button"
                                    htmlType="submit"
                                    type="primary"
                                    block
                                    loading={isSigningUp}
                                >
                                    회원가입
                                </Button>
                            </Form.Item>
                        </Form>

                        <Row className="auth-prompt">
                            <div>
                                <span>아이디가 있으신가요? </span>
                                <Link to="/login" state={{ from: window.location.pathname }}>
                                    로그인
                                </Link>
                            </div>
                        </Row>
                    </div>
                </Row>
            </SplitLayout>
        </>
    );
};

export default SignupPage;