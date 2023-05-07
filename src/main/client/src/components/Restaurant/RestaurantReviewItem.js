import React from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col, Avatar, Tooltip, Button, message} from "antd";
import ReviewRate from "components/Reviewer/ReviewRate";
import ReviewContent from "components/Reviewer/ReviewContent";
import ReviewVote from "components/Reviewer/ReviewVote";
import { getInitial } from "utils";

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
}) => {
  const navigate = useNavigate();


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
      </Row>

      <ReviewContent content={content} />

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
