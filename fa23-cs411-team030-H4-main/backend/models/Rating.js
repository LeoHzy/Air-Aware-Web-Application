// backend/models/Rating.js
// every endpoints in this endpoint falls under /rating

const pool = require("../dbConfig");

const Rating = {
  async createRating(userId, locationId, score) {
    const query = `INSERT INTO Ratings (userID, locationID, score) VALUES (?, ?, ?)`;
    await pool.query(query, [userId, locationId, score]);
  },

  async updateRating(userId, locationId, score) {
    const query = `UPDATE Ratings SET score = ? WHERE userID = ? AND locationID = ?`;
    await pool.query(query, [score, userId, locationId]);
  },

  async getAverageRating(locationId) {
    const query = `SELECT AVG(score) as averageRating FROM Ratings WHERE locationID = ?`;
    const [rows] = await pool.query(query, [locationId]);
    if (rows.length > 0 && rows[0].averageRating !== null) {
      return rows[0].averageRating;
    } else {
      return 0;
    }
  },

  async getUserRating(userId, locationId) {
    const query = `SELECT score FROM Ratings WHERE userID = ? AND locationID = ?`;
    const [rows] = await pool.query(query, [userId, locationId]);
    return rows.length ? rows[0].score : null;
  },

  async deleteRating(userId, locationId) {
    const query = `DELETE FROM Ratings WHERE userID = ? AND locationID = ?`;
    await pool.query(query, [userId, locationId]);
  },
};

module.exports = Rating;
