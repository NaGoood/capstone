import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Layout, Affix, List, message, Button, Modal, Form, Checkbox, Row, Col, Input} from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantDetail from "./RestaurantDetail";
import ReviewPageDivider from "./ReviewPageDivider";
import RestaurantReviewItem from "./RestaurantReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import LoadingItem from "components/Common/LoadingItem";
import LoadingContainer from "components/Common/LoadingContainer";
import {useFetchReviews, useFetchRestaurant, useReviewWrite, useReviewUpdate} from "hooks";
import { PAGE_SIZE } from "constants/constants";
import Reservation from "./Reservation";
import MenuPage from "../Menu/MenuPage";
import { FormOutlined } from '@ant-design/icons'

const { Content, Footer } = Layout;

const RestaurantPage = () => {
  const navigate = useNavigate();
  const [isFetchingRestaurant, fetchRestaurant] = useFetchRestaurant();
  const [isFetchingReviews, fetchReviews] = useFetchReviews();

  const [restaurantItemData, setRestaurantItemData] = useState({});
  const [reviewListData, setReviewListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [isReviewWrite, reviewWrite] = useReviewWrite();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log(values);
    if(values.rating && values.rating.length > 0){
      console.log(values.rating[0]);
      console.log(values.content);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const [searchParams, setSearchParams] = useState({
    /*rating: "",
    sort: "date",*/
    category:""
  });

  const routeParams = useParams();
  const restaurantId = routeParams.restaurantId ? routeParams.restaurantId : "";

  useEffect(() => {
    const fetchRestaurantData = async () => {
      window.scrollTo(0, 0);
      console.log("RestaurantPage's" ,routeParams );

      const restaurantResults = await fetchRestaurant(restaurantId);
      if (restaurantResults && restaurantResults.length === 1) {
        setRestaurantItemData(restaurantResults[0]);
      } else {
        message.error("Restaurant id does not exist!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    const fetchReviewsData = async () => {
      const reviewResults = await fetchReviews({
        ...searchParams,
        restaurantId,
      });
      if (reviewResults) {
        setTotalItems(reviewResults.length);
        setReviewListData(reviewResults);
      }
    };
    fetchReviewsData();
  }, [searchParams]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      console.log(searchParams.category);
      if(searchParams === "reviews"){
        const reviewResults = await fetchReviews({
          ...searchParams,
          restaurantId,
        });
        if (reviewResults) {
          setTotalItems(reviewResults.length);
          setReviewListData(reviewResults);
        }
      }
    };
    fetchReviewsData();
  }, [searchParams]);

  const onReviewWrite = async () => {
    const response = await reviewWrite();
    if(response.status == 200){
      // window.location.replace("/reviewer/"+reviewerId)
      message.success('리뷰 쓰기 성공!');
    }
  }

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {isFetchingRestaurant ? (
          <LoadingContainer type="restaurant" />
        ) : (
          <RestaurantDetail {...restaurantItemData} />
        )}

        <ReviewPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {(() => {
          switch (searchParams.category) {
            case "reviews":
              return (
                  isFetchingRestaurant? (
                      <LoadingItem/>
                  ) : totalItems === 0 ? (
                      <EmptyItem description="No reviews yet"/>
                  ) : (
                      <List
                          className="rest-item"
                          itemLayout="vertical"
                          size="large"
                          pagination={{
                            total: totalItems,
                            pageSize,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total}`,
                            onChange: () => {
                              window.scrollTo(0, 0);
                            },
                          }}
                          dataSource={reviewListData}
                          renderItem={(reviewItem) => (
                              <RestaurantReviewItem {...reviewItem} />
                          )}
                      />
                  )
              );
            case "menu":
              return <MenuPage {...restaurantItemData}/>;
            case "reservation":
              return <Reservation></Reservation>;
            default:
              return (
                  isFetchingRestaurant? (
                      <LoadingItem/>
                  ) : totalItems === 0 ? (
                      <EmptyItem description="No reviews yet"/>
                  ) : (
                      <List
                          className="rest-item"
                          itemLayout="vertical"
                          size="large"
                          pagination={{
                            total: totalItems,
                            pageSize,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total}`,
                            onChange: () => {
                              window.scrollTo(0, 0);
                            },
                          }}
                          dataSource={reviewListData}
                          renderItem={(reviewItem) => (
                              <RestaurantReviewItem {...reviewItem} />
                          )}
                      />
                  )
              );
          }
        })()}
        <Button size={"large"} onClick={showModal} className="writeButton"><FormOutlined />리뷰 쓰기</Button>
        <Modal title="리뷰 쓰기" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              onFinish={handleOk}
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
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default RestaurantPage;
