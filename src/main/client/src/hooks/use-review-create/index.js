import axios from "axios";
import {useState} from "react";

const useReviewCreate = () => {
    const [isReviewCreate, setIsReviewCreate] = useState(false);

    // reviewerId,reviewerName,rating,content
    const reviewCreate = async () => {
        setIsReviewCreate(true);
        try {
            const response = await axios.post("/api/reviewCreate", { });
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        } finally {
            setIsReviewCreate(false);
        }
    };

    return [isReviewCreate,reviewCreate];
};

export default useReviewCreate;
