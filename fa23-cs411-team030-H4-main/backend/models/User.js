const pool = require("../dbConfig");
const bcrypt = require("bcrypt");

const User = {
  async getAllUsers() {
    const query = "CALL UserRank";
    const [users] = await pool.query(query);
    return users;
  },

  async getUserById(userId) {
    const query = "SELECT * FROM Users WHERE userID = ?";
    const [users] = await pool.query(query, [userId]);
    return users[0];
  },
  async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it
    const query = `INSERT INTO Users (username, email, psword) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [username, email, hashedPassword]);
    return result.insertId; // Return the new user's ID
  },

  // Function to retrieve a user by email
  async findUserByEmail(email) {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const [users] = await pool.query(query, [email]);
    return users[0]; // Return the first user found (emails should be unique)
  },

  // Function to validate user credentials for login
  async validateUser(email, password) {
    const user = await this.findUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.psword); // Compare hashed passwords
      if (isValid) {
        return user; // Return the user if the password is correct
      }
    }
    return null; // Return null if user is not found or password is incorrect
  },
};

module.exports = User;
