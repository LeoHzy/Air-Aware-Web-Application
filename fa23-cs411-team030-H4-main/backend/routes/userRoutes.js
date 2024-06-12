const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers(); // Function to retrieve all users
    res.json(users[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

// Get user by ID
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.getUserById(userid); // Function to retrieve user by ID
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
});

module.exports = router;
