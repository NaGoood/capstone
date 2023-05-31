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
import {useFetchReviews, useFetchRestaurant, useFetchCurrentUser} from "hooks";
import { PAGE_SIZE } from "constants/constants";
import Reservation from "./Reservation";
import MenuPage from "../Menu/MenuPage";
import { FormOutlined } from '@ant-design/icons'
import ManagerReservation from "./ManagerReservation";

const { Content, Footer } = Layout;

const RestaurantPage = () => {
  const navigate = useNavigate();
  const [isFetchingRestaurant, fetchRestaurant] = useFetchRestaurant();
  const [isFetchingReviews, fetchReviews] = useFetchReviews();
  const [isFetchCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

  const [restaurantItemData, setRestaurantItemData] = useState({});
  const [reviewListData, setReviewListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [fetchRestId,setfetchRestId] = useState();    //
  const [fetchUserId,setfetchUserId] = useState();    //현재 유저
  const [restOwnerId,setrestOwnerId] = useState();    //가게 등록된 유저

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
      console.log("RestaurantPage's" ,routeParams);

      const restaurantResults = await fetchRestaurant(restaurantId);
      if (restaurantResults && restaurantResults.length === 1) {
        const currentUser = await fetchCurrentUser();
        setRestaurantItemData(restaurantResults[0]);
        setfetchRestId(restaurantId);
        setfetchUserId(currentUser.userId);
        setrestOwnerId(restaurantResults[0].userId);
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
        console.log(reviewResults);
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



  return (
      <Layout>
        <Affix>
          <AppHeader />
        </Affix>

        <Content>
          {isFetchingRestaurant ? (
              <LoadingContainer type="restaurant" />
          ) : (
              <RestaurantDetail userId ={fetchUserId}  ownerId = {restOwnerId} {...restaurantItemData} />
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
                                <RestaurantReviewItem ownerId = {restOwnerId} {...reviewItem} />
                            )}
                        />
                    )
                );
              case "menu":
                return <MenuPage  currentId={fetchUserId} {...restaurantItemData}/>;
              case "reservation":
                return ( fetchUserId==restOwnerId ? <ManagerReservation {...restaurantItemData}/>   : <Reservation restaurantId={fetchRestId}></Reservation>)
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
                                <RestaurantReviewItem userId ={fetchUserId} ownerId = {restOwnerId} {...reviewItem} />
                            )}
                        />
                    )
                );
            }
          })()}
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
  );
};

export default RestaurantPage;