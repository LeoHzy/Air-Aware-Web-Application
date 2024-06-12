// everythign in this file falls under /comment
const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
/**
 * Comment Endpoints Summary:
 *
 * GET /:locid
 * - Retrieves all comments for a specified location and the total number of comments.
 *
 * GET /:locid/:uid
 * - Fetches all comments made by a specific user at a specified location.
 *
 * POST /:locid/:uid
 * - Allows a user to post a comment at a specified location. The user ID and location ID are in the URL, and the comment content is in the request body.
 *
 * PUT /:locid/:commentid
 * - Enables a comment specified by its ID to be updated. The comment ID and user ID who made the comment are required, with the new content provided in the request body.
 *
 * DELETE /:locid/:commentid
 * - Allows for the deletion of a comment specified by its ID. The comment ID is in the URL, and the user ID who made the comment is expected to be in the request body.
 */

// Get all the comments of the specific location id, as well as the total number of it
router.get("/:locid", async (req, res) => {
  const { locid } = req.params;
  try {
    const comments = await Comment.getCommentsByLocation(locid);
    const totalComments = await Comment.getCommentsCountByLocation(locid);
    res.json({ comments, totalComments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.message });
  }
});

// Get all the comments left by the specific user on the location id
router.get("/:locid/:uid", async (req, res) => {
  const { locid, uid } = req.params;
  try {
    const userComments = await Comment.getCommentsByUserForLocation(uid, locid);
    res.json({ userComments });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user comments",
      error: error.message,
    });
  }
});

// A user creates a comment on the location id
router.post("/:locid/:uid", async (req, res) => {
  const { locid, uid } = req.params;
  const { content } = req.body;
  const timeStamp = new Date(); // Get the current date and time
  try {
    await Comment.createComment(uid, locid, content, timeStamp);
    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
});

// Comment specified by the commentId is updated
router.put("/:commentid", async (req, res) => {
  const { commentid } = req.params;
  const { content } = req.body; // Assuming uid is sent in request body
  try {
    await Comment.updateComment(commentid, content);
    res.json({ message: "Comment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
});

// Comment specified by the commentId is deleted
router.delete("/:commentId/:userId", async (req, res) => {
  const { commentId, userId } = req.params;

  try {
    // Fetch the comment from the database
    // const query = "SELECT * FROM Comments WHERE commentID = ?";
    // const [comments] = await pool.query(query, [commentId]);

    // if (comments.length === 0) {
    //     return res.status(404).send('Comment not found');
    // }

    // const comment = comments[0];

    // // Check if the user is the owner of the comment
    // if (comment.userID !== userId) {
    //     return res.status(403).send('You do not have permission to delete this comment');
    // }

    // Delete the comment
    Comment.deleteComment(commentId);

    res.status(200).send("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("Error deleting comment");
  }
});

module.exports = router;
