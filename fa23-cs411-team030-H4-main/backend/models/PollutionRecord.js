const pool = require("../dbConfig");

const PollutionRecord = {
  async getRecords(count) {
    let query = `
      SELECT 
        L.locationID,
        L.state,
        TRIM(TRAILING '\r' FROM L.city) AS city,
        AVG(CASE WHEN PR.gas = 'CO' THEN PR.AQI ELSE NULL END) AS avgAQI_CO,
        AVG(CASE WHEN PR.gas = 'O3' THEN PR.AQI ELSE NULL END) AS avgAQI_O3,
        AVG(CASE WHEN PR.gas = 'NO2' THEN PR.AQI ELSE NULL END) AS avgAQI_NO2,
        AVG(CASE WHEN PR.gas = 'SO2' THEN PR.AQI ELSE NULL END) AS avgAQI_SO2,
        MAX(PR.unit) AS unit,
        COALESCE(AVG(score), 0) AS rating
      FROM 
        Locations L
      JOIN 
        PollutionRecords PR ON L.locationID = PR.locationID
      LEFT OUTER JOIN
        Ratings R ON R.locationID = PR.locationID
      GROUP BY 
        L.locationID
      ORDER BY
        L.locationID ASC
    `;

    if (count !== -1) {
      query += " LIMIT ?";
    }

    let values = count !== -1 ? [count] : [];
    const [records] = await pool.query(query, values);
    return records;
  },

  async getPollutionByLocationId(locationId) {
    const query = `
      SELECT 
        L.locationID,
        L.state,
        TRIM(TRAILING '\r' FROM L.city) AS city,
        AVG(CASE WHEN PR.gas = 'CO' THEN PR.AQI ELSE NULL END) AS avgAQI_CO,
        AVG(CASE WHEN PR.gas = 'O3' THEN PR.AQI ELSE NULL END) AS avgAQI_O3,
        AVG(CASE WHEN PR.gas = 'NO2' THEN PR.AQI ELSE NULL END) AS avgAQI_NO2,
        AVG(CASE WHEN PR.gas = 'SO2' THEN PR.AQI ELSE NULL END) AS avgAQI_SO2,
        MAX(PR.unit) AS unit
      FROM 
        Locations L
      JOIN 
        PollutionRecords PR ON L.locationID = PR.locationID
      WHERE 
        L.locationID = ?
      GROUP BY 
        L.locationID;
      `;
    const [records] = await pool.query(query, [locationId]);
    return records;
  },
};

module.exports = PollutionRecord;
