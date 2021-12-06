import React from "react";
import Grid from "@material-ui/core/Grid";
import homeBG from "../images/home-bg.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import { WHITE_COLOR, PURPLE_COLOR } from "../variables/constant";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: WHITE_COLOR,
    padding: "15px 30px",
    color: PURPLE_COLOR,
    borderRadius: "30px",
  },
  home: {
    background: `url(${homeBG})`,
    backgroundSize: "cover",
  },
  buttons: {
    position: "absolute",
    top: "60%",
    left: "7.5%",
  },
}));

function Landing() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div className={classes.home}>
      {" "}
      <Grid
        container
        spacing={2}
        justify="left"
        alignItems="center"
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundRepeat: "no-repeat",
        }}
        wrap
      >
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              history.push("/select-quiz-category");
            }}
            variant="contained"
            size="large"
            disableElevation
            className={classes.button}
            endIcon={<ArrowForwardIosIcon />}
          >
            Start Quiz
          </Button>
          <Button
            onClick={() => {
              history.push("/faqs");
            }}
            variant="contained"
            size="large"
            disableElevation
            className={classes.button}
            endIcon={<ArrowForwardIosIcon />}
          >
            FAQs
          </Button>
        </div>
      </Grid>
    </div>
  );
}
export default Landing;
