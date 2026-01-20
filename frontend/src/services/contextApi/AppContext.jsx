import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const backendUrl =
    import.meta.env.VITE_API_REMOTE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/is-auth`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching auth state:", error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/profile`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        setUserData(null);
        alert("Failed to fetch user data");
      }
      // return response.data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
