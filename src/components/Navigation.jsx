import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import { signout } from "../firebase/firebaseFunctions";
import { useRecoilState } from "recoil";
import state from "../state/global";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(5),
    border: "1px solid #fff",
    fontSize: "1em",
    color: "#333",
    fontWeight: "bold",
    height: theme.spacing(5),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useRecoilState(state.currentUserState);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const SignOut = () => {
    handleMenuClose();
    signout();
    setCurrentUser(undefined);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={NavLink}
        to={"/user/account"}
      >
        My account
      </MenuItem>
      <MenuItem onClick={SignOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar>
          <Typography component="h1" variant="h6" className={classes.title}>
            Let's Get Quizzical
          </Typography>
          {currentUser ? (
            <>
              <Button style={{ color: "#fff" }} component={NavLink} to="/quiz">
                Questions
              </Button>
              <Button
                style={{ color: "#fff" }}
                component={NavLink}
                to={"/leaderboard"}
              >
                Leaderboard
              </Button>
              &nbsp;
              <Avatar
                aria-label={currentUser.name}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                alt="user image"
                src={currentUser.photoURL}
                className={classes.avatar}
              >
                {currentUser.firstName[0]}
                {currentUser.lastName[0]}
              </Avatar>
              {renderMenu}
            </>
          ) : (
            <>
              <Button
                style={{ color: "#fff" }}
                component={NavLink}
                to={"/about"}
              >
                About
              </Button>
              <Button
                style={{ color: "#fff" }}
                component={NavLink}
                to={"/how-to-play"}
              >
                How to play
              </Button>
              <Button
                style={{ color: "#fff" }}
                component={NavLink}
                to={"/register"}
              >
                Register
              </Button>
              <Button style={{ color: "#fff" }} component={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
