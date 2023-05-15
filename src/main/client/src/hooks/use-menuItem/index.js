import axios from "axios";
import {useState} from "react";

const useMenuItem = () => {
    const [isMenuItem, setIsMenuItem] = useState(false);

    const menuItem = async (restaurantId) => {
        setIsMenuItem(true);
        try {
            const response = await axios.get(`/api/menuItem/${restaurantId}`);
            return response.data;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsMenuItem(false);
        }
    };

    return [isMenuItem,menuItem];
};

export default useMenuItem;
