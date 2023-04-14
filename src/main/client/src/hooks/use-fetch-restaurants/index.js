import axios from "axios";
import { useState } from "react";

const useFetchRestaurants = () => {
  const [isFetchingRestaurants, setIsFetchingRestaurants] = useState(false);

  const fetchRestaurants = async (params) => {
    setIsFetchingRestaurants(true);

    console.log("use-fetch-restaurants's params",params); //{location: 'Seoul', category: 'pizza'}

    try {
      const response = await axios.get("/api/restaurants", { params });
      console.log("use-fetch-restaurants's response.data",response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingRestaurants(false);
    }
  };

  return [isFetchingRestaurants, fetchRestaurants];
};

export default useFetchRestaurants;
