import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col, Tooltip, Space, message, Button, Modal, Form, Checkbox, Input} from "antd";
import {FormOutlined, StarFilled} from "@ant-design/icons";
import {
  useFetchCurrentUser,
  useFetchSavedRestaurant, useReviewCreate,
  useSaveRestaurant, useStoreState,
  useUnsaveRestaurant,
} from "hooks";
import { splitString, formatRatingScore, formatOpen } from "utils";

const RestaurantDetail = ({
  restaurantId,
  restaurantName,
  reviewCount,
  address,
  categories,
  avgRating,
  open,
  imageUrl,
  ownerId,
}) => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
  const [fetchSavedRestaurant] = useFetchSavedRestaurant();
  const [saveRestaurant] = useSaveRestaurant();
  const [unsaveRestaurant] = useUnsaveRestaurant();
  const [storeState] = useStoreState();

  const [userId,setUserId] = useState([]);
  const [restaurantSaved, setRestaurantSaved] = useState(false);
  const [isReviewCreate, reviewCreate] = useReviewCreate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = ownerId === userId;

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchCurrentUser();
      setUserId(currentUser.userId);
      console.log("RestaurantDetail=,",userId)
    };
    getUser();
  }, [userId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {

    if(values.rating && values.rating.length > 0){
      console.log(values.rating[0]);
      console.log(values.content);
      onReviewWrite();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checkedValues) => {
    console.log('별점 선택 = ', checkedValues);
  };

  const onReviewWrite = async () => {
    // reviewerId,reviewerName,rating,content
    const response = await reviewCreate();
    if(response.status == 200){
      //window.location.replace("/restaurant/"+restaurantId)
      message.success('리뷰 쓰기 성공!');
    }
  }

  const changeState = async () =>{
    console.log(userId);
    if(open == "Y")
      open = "N"
    else
      open = "Y"

    const response = await storeState(restaurantId,open);
    if(response.status == 200){
      window.location.reload()
      message.success('가게상태 수정완료!');
    }
  }

  const categoryItems = splitString(categories).map((category) => {
    return (
        <span className="restdet-category" key={category}>
        {category}
      </span>
    );
  });


  return (
    <div className="det-container">
      <Row className="det-row" wrap={false}>
        <Col>
          <img src={imageUrl} className="restdet-image" alt="restaurant" />
        </Col>

        <Col className="restdet-details">
          <Space direction="vertical" size="middle">
            <div className="restdet-header">
              <div className="det-name">{restaurantName}</div>
            </div>

            <div className="det-stats">
              <StarFilled style={{ color: "#FF643D", fontSize: "26px" }} />
              <div className="restdet-score">
                {formatRatingScore(avgRating)}
              </div>
              <div>
                {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
              </div>
            </div>

            <div>{categoryItems}</div>

            <Tooltip placement="bottom" title={"Copy text to clipboard"}>
              <span
                className="restdet-address"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
              >
                {address}
              </span>
            </Tooltip>

            <div className={open === "Y" ? "restitem-open" : "restitem-closed"}>
              { isOwner ? (
                  <Button type="text" className={open === "Y" ? "restitem-open" : "restitem-closed"} onClick={changeState}>
                    {formatOpen(open)}
                  </Button>
              ) : (
                  <div>{formatOpen(open)}</div>
              )}
            </div>
            <div>
              <Button size={"large"} onClick={showModal} className="writeButton"><FormOutlined />리뷰 쓰기</Button>
            </div>
            <Modal title="리뷰 쓰기" open={isModalOpen} onCancel={handleCancel}
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
                    initialValue=""
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
                    <FormOutlined />리뷰 쓰기
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantDetail;
