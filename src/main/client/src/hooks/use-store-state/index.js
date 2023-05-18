import axios from "axios";

const useStoreState = () => {
    const storeState = async (restaurantId,open) => {
        try {
            const response = await axios.post(`/api/storeState`,{
                restaurantId,
                open
            });
            return response;
        } catch (error) {
            console.log(error.message);
            return error.response.status;
        }
    };

    return [storeState];
};

export default useStoreState;