import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom"; // Import to use for routing
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centers the paper vertically
    alignItems: "center", // Centers the paper horizontally
    height: "100vh", // Full viewport height
    paddingTop: theme.spacing(10), // Adds some padding at the top to shift upwards
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    width: "100%", // You can set a max-width if you prefer
    maxWidth: 400, // Adjust the width of the paper as needed
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2), // Adjust bottom margin for spacing after the button
  },
  link: {
    display: "flex",
    justifyContent: "center", // Center the link
    marginTop: theme.spacing(1),
  },
}));

function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    if (!username || !email || !password) {
      setError("Please fill in all the fields!");
    }
    try {
      const response = await axios.post(`${config.SERVER_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log(response.data); // Handle the response data as you see fit
      // Redirect to login page or anywhere you wish upon successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error.response || error.message);
      // Handle the error, maybe show an error message to the user
      const errorMessage =
        error.response?.data?.message || "Failed to register.";
      setError(errorMessage);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1">
          Register
        </Typography>
        {error && (
          <Typography color="error" style={{ textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
          >
            REGISTER
          </Button>
        </form>
        <div className={classes.link}>
          <RouterLink to="/login" variant="body2">
            Already have an account?
          </RouterLink>
        </div>
      </Paper>
    </div>
  );
}

export default Register;
