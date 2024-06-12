const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const pollutionRoutes = require("./pollutionRoutes");
const userRoutes = require("./userRoutes");
const ratingRoutes = require("./ratingRoutes");
const commentRoutes = require("./commentRoutes");
const locationRoutes = require("./locationRoutes");

router.use("/auth", authRoutes);
router.use("/p", pollutionRoutes);
router.use("/users", userRoutes);
router.use("/rating", ratingRoutes);
router.use("/comment", commentRoutes);
router.use("/loc", locationRoutes);

module.exports = router;
