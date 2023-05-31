import axios from "axios";
import {useState} from "react";

const useStoreReservationList = () => {
    const [isStoreReservationList, setIsStoreReservationList] = useState(false);
    let keyCount;

    const fetchstoreReservationList = async (restaurantId) => {
        setIsStoreReservationList(true);
        keyCount=1;
        try {
            console.log("useStoreReservationList" , restaurantId);
            let response = await axios.get(`/api/storeReservationList/${restaurantId}`);
            response.data.map(function (e){
                e.key = keyCount
                keyCount++;
            })
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