import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import { Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { useAAContext } from "../context/Context";
import axios from "axios";
import config from "../config";

const goldColor = "#ffc107"; // Standard gold color for rating stars
const lightGreyColor = "#d3d3d3"; // Light grey color for no rating

// Custom styles for the rating component
const StyledRating = withStyles({
  iconFilled: {
    color: goldColor,
  },
  iconHover: {
    color: goldColor,
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#ff5252",
    },
  },
})(Rating);

function RatingBar({ locationID }) {
  const { user, setRecords } = useAAContext();
  const [isRatingDisabled, setIsRatingDisabled] = useState(!user);
  const [rating, setRating] = useState(0);

  const fetchRating = async () => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/rating/${locationID}`
      );
      let rating = Number(0);
      if (
        response.data.averageRating !== null ||
        response.data.averageRating !== undefined
      ) {
        rating = Number(response.data.averageRating);
      }
      setRating(rating);
      console.log(rating);
    } catch (error) {
      console.error("Error fetching rating", error);
      return "N/A"; // Return "N/A" if there is an error fetching the rating
    }
  };

  const updateRating = async (newRating) => {
    console.log("update rating.");
    try {
      let response;
      console.log(Number(rating));
      if (Number(rating) === 0) {
        console.log("post");
        // If there was no rating, send a POST request to create a new rating
        response = await axios.post(
          `${config.SERVER_URL}/rating/${locationID}/${user.userID}`,
          { score: newRating }
        );
      } else {
        // If a rating existed, send a PUT request to update the rating
        console.log("put");
        response = await axios.put(
          `${config.SERVER_URL}/rating/${locationID}/${user.userID}`,
          { score: newRating }
        );
      }
      console.log("Response from server:", response);
      console.log(newRating);
      setRating(newRating);
    } catch (error) {
      console.error("Error updating rating", error);
    }
  };

  useEffect(() => {
    console.log(`location id: ${locationID}`);
    setIsRatingDisabled(!user);
    fetchRating();
  }, []);

  const handleRatingUpdate = (newRating) => {
    updateRating(newRating); // Update global state
  };

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledRating
        name="customized-color"
        value={rating}
        onChange={(event, newRating) => {
          handleRatingUpdate(newRating);
        }}
        icon={<StarIcon style={{ fontSize: "2rem" }} />} // Update the size here
        disabled={isRatingDisabled}
        emptyIcon={<StarBorderIcon style={{ fontSize: "2rem" }} />} // And here for the empty icon
        max={10}
      />
      {rating && rating !== undefined && (
        <Box sx={{ ml: 2 }}>
          {typeof rating === "number" ? rating.toFixed(1) : "No rating given"}
        </Box>
      )}
    </Box>
  );
}

export default RatingBar;
