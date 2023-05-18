import axios from "axios";
import {useState} from "react";

const useReplyUpdate = () => {
    const [isReplyUpdate, setIsUseReplyUpdate] = useState(false);

    const replyUpdate = async (reviewId,reply) => {
        setIsUseReplyUpdate(true);
        try {
            const response = await axios.post("/api/reply", {
                reviewId,
                reply
            });
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsUseReplyUpdate(false);
        }
    };

    return [setIsUseReplyUpdate,replyUpdate];
};

export default useReplyUpdate;