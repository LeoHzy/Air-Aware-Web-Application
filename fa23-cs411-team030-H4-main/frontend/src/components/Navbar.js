// src/components/Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAAContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between", // Aligns children to the left and right
  },
  rightToolbar: {
    display: "flex",
    alignItems: "center",
  },
  greeting: {
    marginRight: theme.spacing(4), // Adjust the spacing as needed
  },
}));

function Navbar() {
  const { user, signoutUser, setUser } = useAAContext();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signoutUser(setUser); // Update the user state to null to "sign out" the user
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Button color="inherit" component={Link} to="/">
          Main
        </Button>

        <div className={classes.rightToolbar}>
          {user ? (
            <>
              <Typography color="inherit" className={classes.greeting}>
                Hello, {user.username}
              </Typography>
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
