import axios from "axios";
import { useState } from "react";

const useTableInfo = () => {
    const [isTableInfo, setIsTableInfo] = useState(false);

    const tableInfo = async (restaurantId) => {
        console.log(typeof(restaurantId));
        setIsTableInfo(true);
        try {
            const response = await axios.get(`/api/table/${restaurantId}`);
            return response.data;
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsTableInfo(false);
        }
    };

    return [isTableInfo, tableInfo];
};

export default useTableInfo;
