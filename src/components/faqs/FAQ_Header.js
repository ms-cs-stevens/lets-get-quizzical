import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles(({ palette }) => ({
  header: {
    color: '#fff',
  },
}));

function Header() {
  const styles = useStyles();
  return (
    <Grid container spacing={2} justifyContent="space-evenly">
    <Grid item>
      <Typography component={"h1"} variant="h4" className={styles.header}>
        How To Play
      </Typography>
    </Grid>
  </Grid>
  );
}

export default Header;
