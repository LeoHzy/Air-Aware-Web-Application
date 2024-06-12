// every endpoints in the page falls under /p

const express = require("express");
const router = express.Router();
const PollutionRecord = require("../models/PollutionRecord");
const Rating = require("../models/Rating");

// Get all pollution records with unique location IDs
router.get("/", async (req, res) => {
  let count = parseInt(req.query.count, 10) || -1;
  try {
    const records = await PollutionRecord.getRecords(count);
    res.json(records);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Get detailed pollution by location ID
router.get("/:locid", async (req, res) => {
  try {

    const { locid } = req.params;
    const records = await PollutionRecord.getPollutionByLocationId(locid);
    res.json(records);

  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
