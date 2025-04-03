import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showAlert from "./utils/showAlert";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");


  const isPageRefresh = performance.getEntriesByType("navigation")[0]?.type === "reload";

  useEffect(() => {
    // If user is logged in and page is refreshed, remove session
    if (isPageRefresh && userToken) {
      showAlert("error", "Session expired", "edirecting to Home...")
      localStorage.removeItem("token");
      sessionStorage.removeItem("sessionActive");
      navigate("/");
    }
  }, [navigate, userToken, isPageRefresh]);

  return <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
