import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink, useHistory } from "react-router-dom";
import { signout } from "../firebase/firebaseFunctions";
import { AuthContext } from "../AuthProvider";
import { WHITE_COLOR, PURPLE_COLOR } from "../variables/constant";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "3.5 rem",
    background: PURPLE_COLOR,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: WHITE_COLOR,
  },
  avatar: {
    width: theme.spacing(5),
    border: `1px solid ${WHITE_COLOR}`,
    fontSize: "1em",
    color: "#333",
    fontWeight: "bold",
    height: theme.spacing(5),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
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
    history.push("/");
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
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={NavLink} to={"/quizzes"}>
        Past Quizzes
      </MenuItem>
      <MenuItem onClick={SignOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            component="h1"
            align="left"
            variant="h6"
            className={classes.title}
          >
            <NavLink className={classes.title} to={"/"}>
              Let's Get Quizzical
            </NavLink>
          </Typography>
          {currentUser ? (
            <>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to={"/select-quiz-category"}
              >
                Quiz
              </Button>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to={"/leaderboard"}
              >
                Leaderboard
              </Button>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to={"/faqs"}
              >
                FAQs
              </Button>
              &nbsp;
              <Avatar
                aria-label={currentUser.displayName}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                alt="user image"
                src={currentUser.photoURL}
                className={classes.avatar}
              >
                {currentUser.displayName && currentUser.displayName[0]}
              </Avatar>
              {renderMenu}
            </>
          ) : (
            <>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to={"/faqs"}
              >
                FAQs
              </Button>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to={"/register"}
              >
                Register
              </Button>
              <Button
                style={{ color: WHITE_COLOR }}
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
