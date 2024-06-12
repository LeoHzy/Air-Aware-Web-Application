import axios from "axios";
import { useAAContext } from "./Context";
import config from "../config";
import { fetchRecords } from "./recordContext";

// export const fetchAllRatings = async (
//   records,
//   setRecords,
//   setIsLoadingRatings
// ) => {
//   // Instead of using the context hook here, we use the provided records and setRecords
//   setIsLoadingRatings(true);

//   const updatedRecords = [];
//   let count = 0;
//   for (const record of records) {
//     count += 1;
//     console.log(count);
//     const rating = await fetchRating(record.locationID);
//     updatedRecords.push({ ...record, rating: rating || "N/A" });
//   }
//   setRecords(updatedRecords);
//   setIsLoadingRatings(false);
// };
