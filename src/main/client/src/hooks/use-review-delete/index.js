import axios from "axios";
import {useState} from "react";

const useReviewDelete = () => {
    const [isReviewDelete, setIsReviewDelete] = useState(false);

    const reviewDelete = async (reviewId) => {
        setIsReviewDelete(true);
        try {
            const response = await axios.post("/api/reviewDelete", { reviewId});
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReviewDelete(false);
        }
    };

    return [isReviewDelete,reviewDelete];
};

export default useReviewDelete;
