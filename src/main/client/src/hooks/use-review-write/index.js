import axios from "axios";
import {useState} from "react";

const useReviewWrite = () => {
    const [isReviewWrite, setIsReviewWrite] = useState(false);

    const reviewWrite = async (reviewerId,reviewerName,rating,content) => {
        setIsReviewWrite(true);
        try {
            const response = await axios.post("/api/reviewWrite", { reviewerId,reviewerName,rating,content});
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReviewWrite(false);
        }
    };

    return [isReviewWrite,reviewWrite];
};

export default useReviewWrite;
