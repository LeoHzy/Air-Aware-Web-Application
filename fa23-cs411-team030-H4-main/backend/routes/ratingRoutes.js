const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");

/**
 * Rating Endpoints Summary:
 *
 * GET /:locid
 * - Retrieves the average rating for a specified location based on ratings from all users.
 *
 * GET /:locid/:uid
 * - Obtains the rating given by a specific user for a specified location.
 *
 * POST /:locid/:uid
 * - Allows a user to create a rating for a specified location. The user ID and location ID are provided in the URL, and the rating score is in the request body.
 *
 * PUT /:locid/:uid
 * - Enables a user to update their previously given rating for a specified location. The new rating score is expected to be in the request body.
 *
 * DELETE /:locid/:uid
 * - Permits a user to delete their rating for a specified location. The user ID and location ID are specified in the URL.
 */

// Get the average rating of the city (average of the rating given by all users)
router.get("/:locid", async (req, res) => {
  try {
    const { locid } = req.params;
    const averageRating = await Rating.getAverageRating(locid);
    if (averageRating === null) {
      return res
        .status(404)
        .json({ message: "No ratings found for this location." });
    }
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving average rating",
      error: error.message,
    });
  }
});

// Get the rating given by a specific user
router.get("/:locid/:uid", async (req, res) => {
  try {
    const { locid, uid } = req.params;
    const userRating = await Rating.getUserRating(uid, locid);
    if (userRating === null) {
      return res
        .status(404)
        .json({ message: "No rating found for this user and location." });
    }
    res.json({ userRating });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user rating", error: error.message });
  }
});

// A rating is added/created by a user
router.post("/:locid/:uid", async (req, res) => {
  try {
    const { locid, uid } = req.params;
    const { score } = req.body;
    await Rating.createRating(uid, locid, score);
    res.status(201).json({ message: "Rating created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating rating", error: error.message });
  }
});

// Change the rating that this user previously left to the new rating
router.put("/:locid/:uid", async (req, res) => {
  try {
    const { locid, uid } = req.params;
    const { score } = req.body;
    await Rating.updateRating(uid, locid, score);
    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating rating", error: error.message });
  }
});

// Delete the user's rating given to the location
router.delete("/:locid/:uid", async (req, res) => {
  try {
    const { locid, uid } = req.params;
    await Rating.deleteRating(uid, locid);
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting rating", error: error.message });
  }
});

module.exports = router;
