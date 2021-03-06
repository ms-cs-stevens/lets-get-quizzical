import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import { HEADER_CSS } from "../../variables/constant";

const useStyles = makeStyles(() => ({
  header: HEADER_CSS,
}));

function Header() {
  const styles = useStyles();
  return (
    <Grid container spacing={2} justifyContent="space-evenly">
      <Grid item>
        <Typography component={"h1"} variant="h4" className={styles.header}>
          Frequently Asked Questions (F.A.Q.)
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
