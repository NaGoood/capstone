import axios from "axios";
import {useState} from "react";

const useReservationList = () => {
    const [isReservationList, setIsReservationList] = useState(false);

    // reviewerId,reviewerName,rating,content
    const reservationList = async (params) => {
        setIsReservationList(true);
        console.log("params : ",params);
        try {
            const response = await axios.get("/api/reservationList", {params });
            return response.data.results;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReservationList(false);
        }
    };

    return [isReservationList,reservationList];
};

export default useReservationList;
