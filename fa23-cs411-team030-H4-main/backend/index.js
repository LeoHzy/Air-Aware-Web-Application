process.env.NODE_ENV = "production";

const dotenv = require("dotenv");
const result =
  process.env.NODE_ENV === "production"
    ? dotenv.config({ path: "./.env.production" })
    : dotenv.config();

if (result.error) {
  throw result.error;
}
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes"); // This will import the routes you defined in routes.js
const cors = require("cors");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the imported routes with your Express application
app.use("/", routes); // '/api' is a base path, you can change it as per your requirement

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
