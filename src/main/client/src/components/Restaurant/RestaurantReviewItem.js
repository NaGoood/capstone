import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col, Avatar, Tooltip, Button, message, Modal, Form, Checkbox, Input} from "antd";
import ReviewRate from "components/Reviewer/ReviewRate";
import ReviewContent from "components/Reviewer/ReviewContent";
import ReviewVote from "components/Reviewer/ReviewVote";
import {useReplyUpdate,  useFetchCurrentUser} from "hooks";
import { getInitial } from "utils";
import {FormOutlined} from "@ant-design/icons";

const RestaurantReviewItem = ({
                                  reviewerName,
                                  reviewCount,
                                  reviewerId,
                                  rating,
                                  funnyCount,
                                  usefulCount,
                                  coolCount,
                                  content,
                                  date,
                                  reply, reviewId,
                                  ownerId
                              }) => {
    const navigate = useNavigate();

    const [isReplyUpdate,replyUpdate] = useReplyUpdate();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId,setUserId] = useState([]);
    const [showButton, setShowButton] = useState(ownerId === userId && reply);

    useEffect(() => {
        setShowButton(ownerId === userId && reply);
    }, [ownerId, userId, reply]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        const getUser = async () => {
            const currentUser = await fetchCurrentUser();
            setUserId(currentUser.userId);
            console.log(userId)
        };
        getUser()
    }, [userId]);


    const onFinish = (values) => {
        if(values.content != undefined){
            console.log("undefined 아닐 때 실행")
            console.log(values.content);
            reply = values.content;
            onReplyUpdate();
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onReplyUpdate = async () => {
        const response = await replyUpdate(reviewId,reply);
        if(response.status == 200){
            window.location.reload()
            message.success('답글 쓰기/수정 성공!');
        }
    }



    return (
        <div className="restrevitem-container">
            <Row wrap={false}>
                <Col>
                    <Tooltip placement="bottom" title="Reviewer Profile">
                        <Avatar
                            className="restrevitem-avatar"
                            size={50}
                            onClick={() =>
                                navigate(`/reviewer/${reviewerId}`, {
                                    state: { from: window.location.pathname },
                                })
                            }
                        >
                            {getInitial(reviewerName)}
                        </Avatar>
                    </Tooltip>
                </Col>
                <Col>
                    <div className="restrevitem-name-container">
                        <div className="restrevitem-name">{reviewerName}</div>
                        <div className="restrevitem-count">
                            &#40;{reviewCount}{" "}
                            {reviewCount === 1 ? "Review" : "Reviews"}&#41;
                        </div>
                    </div>
                    <ReviewRate rating={rating} date={date} />
                </Col>
                <div>
                    {userId != undefined && showButton && (
                        <Button onClick={showModal}><FormOutlined />{reply ? '답글 수정' : '답글 쓰기'}</Button>
                    )}
                </div>
                <Modal title="답글 쓰기/수정" open={isModalOpen} onCancel={handleCancel}
                       okButtonProps={{ style: { display: 'none' } }}
                       cancelButtonProps={{ }}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={handleCancel}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="답글 내용"
                            name="content"
                            initialValue={reply}
                            rules={[
                                {
                                    required: true,
                                    message: '답글 내용을 입력하세요!!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={onFinish}>
                                <FormOutlined />답글 쓰기
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>

            <ReviewContent content={content} />
            {reply == null ? (<Col></Col> ) : (
                <Col style={{marginLeft: '30px'}}>
                    L     &nbsp;
                    <Tooltip placement="bottom" title="사장님 댓글">
                        <Avatar
                            className="restrevitem-avatar"
                            size={40}>
                            {getInitial("사장님")}
                        </Avatar>
                    </Tooltip>{reply}</Col>)}
            <Row>
                <ReviewVote
                    usefulCount={usefulCount}
                    funnyCount={funnyCount}
                    coolCount={coolCount}
                />
            </Row>
        </div>

    );
};

export default RestaurantReviewItem;