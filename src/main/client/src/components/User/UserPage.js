import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Layout, Affix, List, message, Col} from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import UserDetail from "./UserDetail";
import SavedPageDivider from "./SavedPageDivider";
import RestaurantItem from "components/RestaurantList/RestaurantItem";
import EmptyItem from "components/Common/EmptyItem";
import ReservationInfo from "components/Restaurant/ReservationInfo";
import LoadingItem from "components/Common/LoadingItem";
import LoadingContainer from "components/Common/LoadingContainer";
import { useFetchCurrentUser, useFetchSavedRestaurants,useReservationList ,useReservationInfo} from "hooks";
import { PAGE_SIZE } from "constants/constants";
import restaurantItem from "components/RestaurantList/RestaurantItem";

const { Content, Footer } = Layout;

const UserPage = () => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
  const [isReservationList, reservationList] = useReservationList();
  const [isReservationInfo,reservationInfo] = useReservationInfo();
  const [reservInfoData,setReservInfoData] = useState([]);
  const [reservationListData,setReservationListData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [searchParams, setSearchParams] = useState({
    sort: "lastUpdated",
  });

  useEffect(() => {
    const fetchPageData = async () => {
      window.scrollTo(0, 0);

      const user = await fetchCurrentUser();
      if (!user) {
        message.error("You need to log in first!");
        navigate("/login", {
          state: { from: window.location.pathname },
        });
      } else {
        setCurrentUser(user);
        console.log(user);
        const reservationLists = await reservationList({
          ...searchParams,
          userId: user.userId,
        });
        if (!reservationLists) {
          message.error("예약 내역이 없습니다");
          navigate("/", { state: { from: window.location.pathname } });
        } else {
          setTotalItems(reservationLists.length);
          setReservationListData(reservationLists);
        }

        const reservInfoItems = await reservationInfo({
          userId: user.userId
        });
        if(!reservInfoItems){
          message.error("ReservationInfo Loading failed!");
          navigate("/", { state: { from: window.location.pathname } });
        } else {
          setReservInfoData(reservInfoItems);
        }
      }
    };
    fetchPageData();
  }, [searchParams]);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {isFetchingCurrentUser ? (
          <LoadingContainer type="user" />
        ) : (
          <UserDetail username={currentUser.userName} savedCount={totalItems} />
        )}

        <SavedPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
          
          <Col className="reservRestInfo">
              [ 예약한 식당정보 ]
          </Col>

        {isReservationList ? (
          <LoadingItem />
        ) : totalItems === 0 ? (
          <EmptyItem description="No Reservation" />
        ) : (
          <List
            className="user-item"
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
            dataSource={reservationListData}
            renderItem={(restaurantItem) => (
              <RestaurantItem
                restaurantItemData={restaurantItem}
                savedIcon={true}
                userId={currentUser.userId}
              />
            )}
          />
        )}

          <Col className="reservRestInfo">
              [ 예약 내역 ]
          </Col>
          <List
              className="info-item"
              itemLayout="horizontal"
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
              dataSource={reservInfoData}
              renderItem={(reservationInfo) => (
                  <ReservationInfo
                      reservInfoData={reservationInfo}
                      savedIcon={true}
                      userName={currentUser.userName}
                      userId={currentUser.userId}
                  />
              )}
          />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default UserPage;
