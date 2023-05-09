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
import {useFetchReviews, useFetchRestaurant} from "hooks";
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
  const [fetchRestId,setfetchRestId] = useState();

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
        setfetchRestId(restaurantId);
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
              return <Reservation restaurantId={fetchRestId}></Reservation>;
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
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default RestaurantPage;
