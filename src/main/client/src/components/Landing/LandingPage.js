import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Layout, Input, Affix, Tooltip } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import LandingFooter from "components/Footer/LandingFooter";
import SearchFilter from "./SearchFilter";
import MeatIcon from "../../img/icons/meaticon.png";
import PizzaIcon from "../../img/icons/pizzaicon.png";
import HamburgerIcon from "../../img/icons/hamburgericon.png";

const { Content, Footer } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();

  //const [isMenu, Menu] = useSearchMenu();

  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [inputLocation, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useState({
    location: "",
    category: "",
  });

  const PostMenu = () =>{
      //const response = isMenu(inputLocation , category);
      navigateToSearch();
  }

  const handleChangeCategory = (e) =>{
      setCategory(e.target.value);
      setSearchParams({ ...searchParams, category: e.target.value });
  }


  const handleChangeLocation = (e) =>{
      setLocation(e.target.value);
      setSearchParams({ ...searchParams, location: e.target.value });
  }

  const onInputChange = (e) => {
      console.log(e.target.value);
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
              <input
                  className="input-location"
                  id="pizza"
                  type="radio"
                  value="피자"
                  checked={category === '피자'}
                  onChange={handleChangeCategory}
              /><img src={PizzaIcon} alt="피자"/>

              <input
                  className="input-location"
                  id="hamburger"
                  type="radio"
                  value="햄버거"
                  checked={category === '햄버거'}
                  onChange={handleChangeCategory}
              /><img src={HamburgerIcon} alt="햄버거"/>

              <input
                  className="input-location"
                  id="meat"
                  type="radio"
                  value="고기"
                  checked={category === '고기'}
                  onChange={handleChangeCategory}
              /><img src={MeatIcon} alt="고기"/>
          </div>

          <div>
              <button onClick={PostMenu}>검색</button>
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
        <LandingFooter />
      </Footer>
    </Layout>
  );
};

export default LandingPage;
