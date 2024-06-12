// backend/models/Comment.js

const pool = require("../dbConfig");

const Comment = {
  async createComment(userId, locationId, content, commentTime) {
    const query = `INSERT INTO Comments (userID, locationID, content, commentTime) VALUES (?, ?, ?, ?)`;
    await pool.query(query, [userId, locationId, content, commentTime]);
  },

  async updateComment(commentId, content) {
    const query = `UPDATE Comments SET content = ?, commentTime = NOW() WHERE commentID = ?`;
    await pool.query(query, [content, commentId]);
  },

  async getCommentsByLocation(locationId) {
    const query = `
    SELECT 
        C.*, 
        L.city, 
        L.state, 
        U.username 
    FROM 
        Comments C 
    JOIN 
        Locations L ON C.locationID = L.locationID 
    JOIN 
        Users U ON C.userID = U.userID  
    WHERE 
        C.locationID = ? 
    ORDER BY 
        C.weight DESC,
        C.commentTime DESC
    `;
    const [rows] = await pool.query(query, [locationId]);
    return rows;
  },

  async getUserComment(userId, locationId) {
    const query = `SELECT * FROM Comments WHERE userID = ? AND locationID = ?`;
    const [rows] = await pool.query(query, [userId, locationId]);
    return rows;
  },

  async deleteComment(commentId) {
    const query = `DELETE FROM Comments WHERE commentID = ?`;
    await pool.query(query, [commentId]);
  },

  async getCommentsCountByLocation(locationId) {
    const query = `SELECT COUNT(*) AS total FROM Comments WHERE locationID = ?`;
    const [rows] = await pool.query(query, [locationId]);
    return rows[0].total;
  },

  // add a method to get comments by user id for a specific location
  async getCommentsByUserForLocation(userId, locationId) {
    const query = `SELECT * FROM Comments WHERE userID = ? AND locationID = ?`;
    const [rows] = await pool.query(query, [userId, locationId]);
    return rows;
  },

  async fetchUsername(userId) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch username");
      }
      const userData = await response.json();
      return userData.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  },
};

module.exports = Comment;
