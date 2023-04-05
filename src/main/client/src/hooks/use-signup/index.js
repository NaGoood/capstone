import axios from "axios";
import { useState } from "react";

const useSignup = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (userName, userId, userPW, phoneNumber, birthDay) => {
    setIsSigningUp(true);

    try {
      const response = await axios.post("/api/signup", {
        userName,
        userId,
        userPW,
        phoneNumber,
        birthDay
      });
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    } finally {
      setIsSigningUp(false);
    }
  };

  return [isSigningUp, signup];
};

export default useSignup;