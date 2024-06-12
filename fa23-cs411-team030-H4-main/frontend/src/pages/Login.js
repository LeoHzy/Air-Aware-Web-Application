import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom"; // Import to use for routing
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AAContext } from "../context/Context";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Ensure the form takes the full width of the paper
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2), // Adjust bottom margin for spacing after the button
  },
  link: {
    display: "flex",
    justifyContent: "center", // Center the link now that there is only one
    marginTop: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState(""); // Use state to store the email
  const [password, setPassword] = useState(""); // Use state to store the password
  const [loginError, setLoginError] = useState("");
  const { loginUser, setUser } = useContext(AAContext);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    try {
      const response = await axios.post(`${config.SERVER_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data); // Handle the response data as you see fit
      // You can redirect the user to another page or set the user data in global state
      loginUser(response.data.user, setUser);
      navigate("/");
    } catch (error) {
      console.error("Login error", error.response || error.message);
      // Handle the error, maybe show an error message to the user
      setLoginError(
        error.response.data.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        {loginError && <Typography color="error">{loginError}</Typography>}
        <form className={classes.form} noValidate onSubmit={handleLogin}>
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
            LOGIN
          </Button>
        </form>
        <div className={classes.link}>
          {/* Updated link for Create account that redirects to the Register page */}
          <RouterLink to="/register" style={{ textDecoration: "none" }}>
            <Button color="primary">Create account</Button>
          </RouterLink>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
