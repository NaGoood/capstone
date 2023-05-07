import axios from "axios";
import {useState} from "react";

const useReservation = () => {
    const [isReservation, setIsReservation] = useState(false);

    const reservation = async (reservationName, reservationPhoneNumber, reservationDate , count) => {
        setIsReservation(true);
        try {
            const response = await axios.post("/api/reservation", {
                reservationName,
                reservationPhoneNumber,
                reservationDate,
                count
            });
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReservation(false);
        }
    };

    return [isReservation,reservation];
};

export default useReservation;
