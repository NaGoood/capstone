import axios from "axios";
import {useState} from "react";

const useReservationInfo = () => {
    const [isReservationInfo, setIsReservationInfo] = useState(false);

    // reviewerId,reviewerName,rating,content
    const reservationInfo = async (params) => {
        setIsReservationInfo(true);
        try {
            const response = await axios.get("/api/reservationInfo", { params });
            return response.data;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReservationInfo(false);
        }
    };

    return [isReservationInfo,reservationInfo];
};

export default useReservationInfo;
