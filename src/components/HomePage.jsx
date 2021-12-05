import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import logo from "../images/logo.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import HomePage_ss from './faqs/HomePage_ss';

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
      <HomePage_ss />
    </div>
  );
}
export default Landing;
