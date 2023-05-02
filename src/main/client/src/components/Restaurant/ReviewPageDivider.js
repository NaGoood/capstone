import React from "react";
import { Row, Col, Select,Button } from "antd";
import { reviewRatingOptions, reviewSortOptions } from "constants/constants";

const ReviewPageDivider = ({ searchParams, setSearchParams }) => {
  /*const onRatingChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, rating: value });
    }
  };

  const onSortChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, sort: value });
    }
  };*/

    const onReservation = (e) =>{
        if (searchParams) {
            setSearchParams({ ...searchParams, category: e.currentTarget.value });
        }
    }

  return (
    <Row className="divid-container">
        <Col>
            <div>
                <Button type="text" className="divid-header" value="reviews" onClick={onReservation}>Reviews</Button>
                <Button type="text" className="divid-header" value="menu" onClick={onReservation}>Menu</Button>
                <Button type="text" className="divid-header" value="reservation" onClick={onReservation}>Reservation</Button>
            </div>

        </Col>

      {/*<Col>
        <div className="revdivid-filter">
          <div className="divid-text">Filter:</div>
          <Select
            className="divid-select"
            bordered={false}
            defaultValue={
              searchParams ? searchParams.rating : reviewRatingOptions[0].value
            }
            options={reviewRatingOptions}
            onChange={onRatingChange}
          />
        </div>
      </Col>

      <Col>
        <div className="revdivid-sort">
          <div className="divid-text">Sort:</div>
          <Select
            className="divid-select"
            bordered={false}
            defaultValue={
              searchParams ? searchParams.sort : reviewSortOptions[0].value
            }
            options={reviewSortOptions}
            onChange={onSortChange}
          />
        </div>
      </Col>*/}
    </Row>
  );
};

export default ReviewPageDivider;
