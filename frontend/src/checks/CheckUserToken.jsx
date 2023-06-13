import React, { useEffect } from "react";
import { useValue } from "../stateManagement/context/ContextProvider";
import jwtDecode from "jwt-decode";

const UserTokenCheck = () => {
  const {state: {currentUser}, dispatch} = useValue()

  useEffect(() => {
    const checkToken = async () => {
      if (currentUser) {
        const decodedToken = jwtDecode(currentUser.token);
        if (decodedToken.exp * 1000 < Date.now()) {
          dispatch({ type: "UPDATE_USER", payload: null });
        }
      }
    };
    checkToken();
  }, [currentUser, dispatch]);

  return null; // Assuming UserTokenCheck is a utility component, it doesn't render anything
};

export default UserTokenCheck;