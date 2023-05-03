import React, {useEffect, useState} from "react";
import {createSearchParams, useNavigate,createRoot} from "react-router-dom";
import {Row, Col, Tooltip, Button,Form,Modal,Input,Checkbox,message,Space} from "antd";
import {icons} from "antd/es/image/PreviewGroup";
import ReviewRate from "./ReviewRate";
import ReviewContent from "./ReviewContent";
import ReviewVote from "./ReviewVote";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import {useFetchCurrentUser, useReviewUpdate,useReviewDelete} from "hooks";

const ReviewItem = ({
  restaurantName,
  restaurantId,
  rating,
  funnyCount,
  usefulCount,
  coolCount,
  content,
  date,
  imageUrl,reviewId,reviewerId
}) => {
  const navigate = useNavigate();

  // region 수정 Modal 관련
  const [isModalOpen,setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
          content = values.content;
          if(values.rating && values.rating.length > 0){
              rating = values.rating[0];
              onReviewUpdate();
          }
          reviewId = reviewId;
        setIsModalOpen(false);
    };
  const onFinishFailed = (errorInfo) => {
      setIsModalOpen(false);
      console.log('Failed:', errorInfo);
      alert("수정 실패")
    };

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const [isReviewUpdate, reviewUpdate] = useReviewUpdate();
    const [isReviewDelete, reviewDelete] = useReviewDelete();
    // endregion


  // region 삭제 Modal 관련
    const [isDModalOpen, setIsDModalOpen] = useState(false);
    const showDModal = () => {
        setIsDModalOpen(true);
    };
    const DhandleOk = () => {
        setIsDModalOpen(false);
        onReviewDelete();
    };
    const DhandleCancel = () => {
        setIsDModalOpen(false);
    };
    // endregion

    const [reviewOwner,setReviewOwner] = useState(true);
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const user = await fetchCurrentUser();
                setCurrentUser(user.userId);
                if(user.userId == reviewerId){
                    console.log("[수정/삭제 버튼 활성화]")
                    setReviewOwner(false);
                }
        };
        fetchUser();
    }, []);


    const onReviewUpdate = async () => {
        const response = await reviewUpdate(reviewId,rating,content);
        if(response.status == 200){
            window.location.replace("/reviewer/"+reviewerId)
            message.success('리뷰 수정 성공!');
        }
    }

    const onReviewDelete = async () => {
        const response = await reviewDelete(reviewId);
        if(response.status == 200){
            window.location.replace("/reviewer/"+reviewerId)
            message.success('리뷰 삭제 성공!');
        }
    }
  return (
    <div className="revitem-container">
      <Row wrap={false}>
        <Col>
          <Tooltip placement="bottom" title="View Restaurant">
            <img
              src={imageUrl}
              className="revitem-image"
              alt="restaurant"
              onClick={() =>
                navigate(`/restaurant/${restaurantId}`, {
                  state: { from: window.location.pathname },
                })
              }
            />
          </Tooltip>
        </Col>
        <Col>
          <div className="revitem-name">{restaurantName}</div>

          <ReviewRate rating={rating} date={date} />

          <div className="revitem-vote">
            <ReviewVote
              usefulCount={usefulCount}
              funnyCount={funnyCount}
              coolCount={coolCount}
            />
          </div>
          <div>
            <Button type="primary" size="" disabled={reviewOwner}
              onClick={showModal}>수정</Button>
              <Modal title="리뷰 수정" open={isModalOpen} onOk={onFinish} onCancel={handleCancel}
                     okButtonProps={{
                        disabled: true,}}
                     cancelButtonProps={{
                         disabled: true}}>
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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="별점"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: '별점을 입력해주세요 !!',
                            },
                        ]}
                    >
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={onChange}
                    >
                    <Row>
                        <Col span={3}>
                            <Checkbox value="1">1</Checkbox>
                        </Col>
                        <Col span={3}>
                            <Checkbox value="2">2</Checkbox>
                        </Col>
                        <Col span={3}>
                            <Checkbox value="3">3</Checkbox>
                        </Col>
                        <Col span={3}>
                            <Checkbox value="4">4</Checkbox>
                        </Col>
                        <Col span={3}>
                            <Checkbox value="5">5</Checkbox>
                        </Col>
                    </Row>
                    </Checkbox.Group>
                    </Form.Item>
                  <Form.Item
                      label="리뷰내용"
                      name="content"
                      initialValue={content}
                      rules={[
                        {
                          required: true,
                          message: '리뷰 내용을 입력하세요!!',
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
                      수정
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Button type="dashed" onClick={showDModal} >
                  삭제
              </Button>
                  <Modal title="리뷰 삭제" open={isDModalOpen} onOk={DhandleOk} onCancel={DhandleCancel}>
                      <p>정말 삭제 하시겠습니까?</p>
                  </Modal>
          </div>
        </Col>
      </Row>
      <ReviewContent content={content} />
    </div>
  );
};

export default ReviewItem;
