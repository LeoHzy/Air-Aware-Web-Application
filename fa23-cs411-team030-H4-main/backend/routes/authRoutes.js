// backend/routes/authRoutes.js
// every endpoints in this file falls under /auth

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = await User.createUser(username, email, password);
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.validateUser(email, password);
    if (user) {
      // Here you should create a session or token for the user
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
