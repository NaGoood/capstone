import axios from "axios";
import {useState} from "react";

const useSaveRestaurant = () => {
  const [isSaveRestaurant, setIsRestaurant] = useState(false);

  const saveRestaurant = async (restaurantName, address, imageUrl, categories, userId) => {
    try {
      const response = await axios.post("/api/restaurant/save", {
        restaurantName,
        address,
        imageUrl,
        categories,
        userId,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    } finally {
      setIsRestaurant(true);
    }
  };

  return [isSaveRestaurant, saveRestaurant];
};

export default useSaveRestaurant;