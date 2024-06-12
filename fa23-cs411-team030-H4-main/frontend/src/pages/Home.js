import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import PollutionList from "../components/PollutionList";
import axios from "axios";
import config from "../config";
import { useAAContext } from "../context/Context";
import BarChart from "../components/BarChart";
import ActiveUser from '../components/ActiveUser';

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    height: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  listUserContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "start",
    width: "80%",
    gap: "100px", // This creates space between the two components
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }
}));

function Home() {
  const classes = useStyles();
  const { records, setRecords } = useAAContext();


  return (
    <div className={classes.homeContainer}>
      <Typography variant="h2" gutterBottom>
        Air Aware
      </Typography>
      <BarChart />

      <div className={classes.listUserContainer}>
        <PollutionList />
        <ActiveUser />
      </div>
    </div>
  );
}

export default Home;
