import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Layout, Input, Affix, Tooltip } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import SearchFilter from "./SearchFilter";
import MeatIcon from "../../icons/meaticon.png"
import PizzaIcon from "../../icons/pizzaicon.png"
import HamburgerIcon from "../../icons/hamburgericon.png"


const { Content, Footer } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();

  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [inputLocation, setLocation] = useState("");
  const [searchParams, setSearchParams] = useState({
    name: "",
    city: "",
    category: "",
    ratingLow: "1",
    ratingHigh: "5",
    open: "Y",
    sort: "avgRating",
  });

    const handleChangeLocation = (e) =>{
        setLocation(e.target.value);
    }

  const onInputChange = (e) => {
    setSearchParams({ ...searchParams, name: e.target.value });
  };

  const navigateToSearch = () => {
    navigate(
      {
        pathname: "/restaurants",
        search: `?${createSearchParams(searchParams)}`,
      },
      { state: { from: window.location.pathname } }
    );
  };

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content className="landing-content">
        <img className="landing-logo" src="/images/logo-full.svg" alt="logo" />

        <Input
          className="landing-input"
          size="large"
          placeholder="Search Restaurants"
          value={searchParams.name}
          onChange={onInputChange}
          onPressEnter={navigateToSearch}
          prefix={
            <img
              className="landing-icon-search"
              src="/icons/search.svg"
              alt="search"
            />
          }
          suffix={
            <Tooltip
              placement="bottom"
              title={showSearchFilter ? "Hide Filter" : "Show Filter"}
            >
              <img
                className="landing-icon-menu"
                src="/icons/menu.svg"
                alt="menu"
                onClick={() => {
                  setShowSearchFilter(!showSearchFilter);
                }}
              />
            </Tooltip>
          }
        />

          <div className="div-container-location">
              <input
                  className="input-location"
                  id="서울"
                  type="radio"
                  value="서울"
                  checked={inputLocation === '서울'}
                  onChange={handleChangeLocation}
              /><label>서울</label>
              <input
                  className="input-location"
                  type="radio"
                  value="대전"
                  checked={inputLocation === '대전'}
                  onChange={handleChangeLocation}
              /><label>대전</label>
              <input
                  className="input-location"
                  type="radio"
                  value="제주"
                  checked={inputLocation === '제주'}
                  onChange={handleChangeLocation}
              /><label>제주</label>
          </div>

          <div className="div-container-food">
              <img src={PizzaIcon} alt="pizza" className="div-food"></img>
              <img src={HamburgerIcon} alt="hamburger" className="div-food"></img>
              <img src={MeatIcon} alt="meat" className="div-food"></img>
          </div>

        <div>
          {!showSearchFilter ? null : (
            <div className="landing-sf">
              <SearchFilter
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}
        </div>
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default LandingPage;
