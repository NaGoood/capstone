import axios from "axios";

const useSearchMenu = () => {

  const searchMenu = async (location,category) => {
    try {
      const response = await axios.post("/api/searchMenu", {
        location,
        category
      });
      return response;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [searchMenu];
};

export default useSearchMenu;
