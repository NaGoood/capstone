import axios from "axios";
import {useState} from "react";

const useReviewUpdate = () => {
    const [isReviewUpdate, setIsReviewUpdate] = useState(false);

    const reviewUpdate = async (reviewId,rating,content) => {
        setIsReviewUpdate(true);
        console.log(reviewId,rating,content);
        try {
            const response = await axios.post("/api/reviewUpdate", { reviewId,rating,content});
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReviewUpdate(false);
        }
    };

    return [isReviewUpdate,reviewUpdate];
};

export default useReviewUpdate;
