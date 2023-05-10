import axios from "axios";
import {useState} from "react";

const useReserCancel = () => {
    const [isReservCancel, setIsReservCancel] = useState(false);

    const resercancel = async (reservationId,userId,restaurantId) => {
        setIsReservCancel(true);
        try {
            const response = await axios.post("/api/reservcancel", {
                reservationId,
                userId,
                restaurantId,
            });
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReservCancel(false);
        }
    };

    return [isReservCancel,resercancel];
};

export default useReserCancel;
