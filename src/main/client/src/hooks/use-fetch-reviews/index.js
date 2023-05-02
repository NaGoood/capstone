import axios from "axios";
import { useState } from "react";

const useFetchReviews = () => {
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);

  const fetchReviews = async (params) => {
    console.log("useFetchReviews's params",params);
    setIsFetchingReviews(true);
    try {
      const response = await axios.get("/api/reviews", { params });
      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingReviews(false);
    }
  };

  return [isFetchingReviews, fetchReviews];
};

export default useFetchReviews;
