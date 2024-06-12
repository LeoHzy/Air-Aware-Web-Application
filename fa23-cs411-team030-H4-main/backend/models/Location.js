const pool = require("../dbConfig");

const Rating = {
  async getCityName(locationId) {
    const query = `
    SELECT TRIM(TRAILING '\r' FROM L.city) AS city
    FROM Locations L 
    WHERE L.locationID = ?`;
    const [records] = await pool.query(query, [locationId]);
    return records;
  },

};

module.exports = Rating;
