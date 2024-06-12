import React, { useState, useEffect, useContext } from "react";
import { fetchRecords } from "./recordContext";
import { loginUser, signoutUser } from "./userContext";

export const AAContext = React.createContext();

export const AAProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [selectedCityID, setSelectedCityID] = useState(
    JSON.parse(localStorage.getItem("selectedCityID")) || null
  );
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("records")) || []
  );
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Whenever the user or selectedCityID changes, update localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("selectedCityID", JSON.stringify(selectedCityID));
    localStorage.setItem("records", JSON.stringify(records));
  }, [user, selectedCityID, records]);

  useEffect(() => {
    fetchRecords(setRecords);
  }, []);

  const globalState = {
    appName: "AirWare",

    user,
    setUser,
    loginUser,
    signoutUser,

    selectedCityID,
    setSelectedCityID,

    records,
    setRecords,
    fetchRecords,

    // rating,
    // setRating,
    // fetchRating,
    // fetchAllRatings,
    // updateRating,
  };

  return (
    <AAContext.Provider value={globalState}>{children}</AAContext.Provider>
  );
};

export const useAAContext = () => {
  const context = useContext(AAContext);
  if (context === undefined) {
    throw new Error("useAAContext must be used within an AAProvider");
  }
  return context;
};
