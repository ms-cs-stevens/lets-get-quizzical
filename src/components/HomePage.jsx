import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import logo from "../images/logo.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import HomePage_ss from './faqs/HomePage_ss.js';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Landing() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div>
      {" "}
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          width: "100vw",
          // # Put a background imagebackground: "url(/img/intro-bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        wrap
      >
        <div>
         <HomePage_ss />
        </div>
      </Grid>
    </div>
  );
}
export default Landing;
