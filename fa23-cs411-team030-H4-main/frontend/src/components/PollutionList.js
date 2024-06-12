// src/components/PollutionList.js

import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RatingIcon from "@material-ui/icons/StarBorder";
import { useAAContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  searchContainer: {
    padding: theme.spacing(2),
  },
  listContainer: {
    width: "100%",
    overflow: "auto",
  },
  city: {
    fontSize: "1.5em", // Larger font for city
    color: "black",
  },
  state: {
    fontSize: "1.2em", // Smaller font for state
    color: "darkgrey",
  },
  pollutant: {
    fontSize: "0.8em",
    color: "grey",
  },
  rating: {
    fontSize: "1.3em", // Creative font for the rating
    float: "right",
    display: "flex",
    alignItems: "center",
    // Add more styling as per your creativity
  },
  ratingIcon: {
    marginRight: theme.spacing(1),
    // Add more styling as per your creativity
  },
  noRating: {
    // Styling for when there is no rating
  },
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // default hover color, you can customize it
      // Add any other hover styles here
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  paperContainer: {
    margin: theme.spacing(2), // Adds margin around the Paper
    padding: theme.spacing(2), // Adds padding inside the Paper
    width: "auto", // Adjusts width, you can set it to a fixed value or percentage if required
    [theme.breakpoints.up("md")]: {
      // Only apply margin and width adjustments for larger devices
      margin: "auto", // Centers the Paper container
      width: "60%", // Sets the width to 60% on medium devices and larger
    },
  },
}));

function PollutionList() {
  const classes = useStyles();
  const { records, setRecords, fetchRecords, isLoadingRatings } =
    useAAContext(); // Use records and setRecords from context
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingRatings, setLoadingRatings] = useState(true);
  const { setSelectedCityID } = useAAContext();
  const navigate = useNavigate();

  const handleCityClick = (record) => {
    setSelectedCityID(record.locationID);
    // Navigate to the city page using React Router's useNavigate hook
    navigate(`/city/${record.locationID}`, { state: { record } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records
    ? records.filter(
        (record) =>
          // Check if record.state and record.city exist before calling toLowerCase
          (record.state &&
            record.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (record.city &&
            record.city.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  useEffect(() => {
    fetchRecords(setRecords);
  }, []);

  return (
    <Paper className={classes.paperContainer}>
      <div className={classes.searchContainer}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <List className={classes.listContainer}>
        {filteredRecords.map((record, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            className={classes.listItem}
            onClick={() => handleCityClick(record)} // Set this to be clickable
          >
            <ListItemText
              primary={
                <>
                  <Typography component="span" className={classes.city}>
                    {record.city}
                  </Typography>
                  <Typography component="span" className={classes.state}>
                    {`${record.state}`}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography component="div" className={classes.pollutant}>
                    {/* Assuming these are the pollutants' names */}
                    CO: {record.avgAQI_CO}, O3: {record.avgAQI_O3}, NO2:{" "}
                    {record.avgAQI_NO2}, SO2: {record.avgAQI_SO2}
                  </Typography>
                </>
              }
            />
            <div className={classes.rating}>
              {isLoadingRatings ? (
                <CircularProgress size={24} /> // Loading indicator
              ) : record.rating && record.rating !== "N/A" ? (
                parseFloat(record.rating).toFixed(1)
              ) : (
                <span className={classes.noRating}>N/A</span>
              )}
            </div>
          </ListItem>
        ))}
        {filteredRecords.length === 0 && (
          <Typography variant="subtitle1" align="center">
            No records found.
          </Typography>
        )}
      </List>
    </Paper>
  );
}

export default PollutionList;
