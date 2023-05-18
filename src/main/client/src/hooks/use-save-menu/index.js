import axios from "axios";
import {useState} from "react";

const useSaveRestaurant = () => {
  const [isSaveMenu, setIsMenu] = useState(false);

  const saveMenu = async (menuName, menuImg, menuPrice, menuInfo, restaurantId ) => {
    try {
      const response = await axios.post("/api/menuItem/save", {
        menuName,
        menuImg,
        menuPrice,
        menuInfo,
        restaurantId,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    } finally {
      setIsMenu(true);
    }
  };

  return [isSaveMenu, saveMenu];
};

export default useSaveRestaurant;
