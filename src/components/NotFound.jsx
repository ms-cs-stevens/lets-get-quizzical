import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { WHITE_COLOR, PURPLE_COLOR, HEADER_CSS } from "../variables/constant";

const useStyles = makeStyles((theme) => ({
  header: HEADER_CSS,
  button: {
    margin: theme.spacing(1),
    background: WHITE_COLOR,
    padding: "15px 30px",
    color: PURPLE_COLOR,
    borderRadius: "30px",
  },
  buttons: {
    position: "absolute",
    top: "60%",
    left: "7.5%",
  },
}));

function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="app-bg">
      <Typography component={"h1"} variant="h4" className={classes.header}>
        <h1>404 error</h1>
        Sorry ! Page Not Found.
      </Typography>
      <Button
        onClick={() => {
          history.push("/");
        }}
        variant="contained"
        size="large"
        disableElevation
        className={classes.button}
        endIcon={<ArrowForwardIosIcon />}
      >
        Go to Home
      </Button>
    </div>
  );
}
export default NotFound;
