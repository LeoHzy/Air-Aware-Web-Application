const express = require("express");
const router = express.Router();
const Rating = require("../models/Location");

router.get("/:locid", async (req, res) => {
    try {
      const { locid } = req.params;
      const city = await Rating.getCityName(locid);
      if (city === null) {
        return res
          .status(404)
          .json({ message: "No city found for this locationId." });
      }
      res.json({ city });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving city", error: error.message });
    }
  });

module.exports = router;