import React from "react";
import CommentBoard from "../components/CommentBoard.js";
import CityChart from "../components/CityChart";
import { Typography, Container, Grid } from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import RatingBar from "../components/RatingBar";

function City() {
  const { locationID } = useParams(); // This retrieves the locationID from the URL

  const location = useLocation();
  const record = location.state.record;

  return (
    <Container>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item>
          <Typography variant="h2" gutterBottom></Typography>
          <Typography variant="h2" gutterBottom>{`${record.city}`}</Typography>
          <Typography
            variant="h4"
            style={{ color: "gray" }}
          >{`${record.state}`}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h2" gutterBottom></Typography>
          <RatingBar locationID={locationID} />
        </Grid>
      </Grid>

      <CityChart record={record} />
      <CommentBoard locationId={locationID} />
    </Container>
  );
}

export default City;
