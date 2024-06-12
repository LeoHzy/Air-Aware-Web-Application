import axios from "axios";
import config from "../config";

export const fetchRecords = async (setRecords) => {
  console.log("fetch records");
  try {
    const response = await axios.get(`${config.SERVER_URL}/p`);
    setRecords(response.data);
  } catch (error) {
    console.error("Error fetching pollution records", error);
  }
};
