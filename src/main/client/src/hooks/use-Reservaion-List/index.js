import axios from "axios";
import {useState} from "react";

const useStoreReservationList = () => {
    const [isStoreReservationList, setIsStoreReservationList] = useState(false);

    const fetchstoreReservationList = async (restaurantId) => {
        setIsStoreReservationList(true);
        try {
            console.log("useStoreReservationList" , restaurantId);
            const response = await axios.get(`/api/storeReservationList/${restaurantId}`);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsStoreReservationList(false);
        }
    };

    return [setIsStoreReservationList,fetchstoreReservationList];
};

export default useStoreReservationList;