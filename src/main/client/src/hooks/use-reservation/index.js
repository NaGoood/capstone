import axios from "axios";
import {useState} from "react";

const useReservation = () => {
    const [isReservation, setIsReservation] = useState(false);

    const reservation = async (userId,restaurantId, reservDate , reservNumber,tableNumber,tableType, reservTime, [reservMenu]) => {
        setIsReservation(true);
        try {
            const response = await axios.post("/api/reservation", {
                userId,
                restaurantId,
                reservDate,
                reservTime,
                reservNumber,
                tableNumber,
                tableType,
                reservMenu,
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