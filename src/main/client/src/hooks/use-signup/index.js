import axios from "axios";
import { useState } from "react";

const useSignup = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (userName, userId, userPW, phoneNumber, userBirth) => {
    setIsSigningUp(true);

    try {
      const response = await axios.post("/api/signup", {
        userName,
        userId,
        userPW,
        phoneNumber,
        userBirth
      });
      console.log("useSignup's response.status=",response.status);
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