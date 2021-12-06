import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useHistory } from "react-router";
import {
  Grid,
  Typography,
  Fab,
  Container,
  ListItemText,
  ListItem,
  makeStyles,
  List,
  Divider,
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";

// leader board dummy data
import dummyData from "../../dataset/leaderboard.json";

const useStyles = makeStyles(() => ({
  header: {
    color: "#fff",
  },
  winnersImages: {
    width: "100px",
    height: "100px",
    border: "2px solid #fff",
    borderRadius: "50%",
  },
}));

const Leaderboard = () => {
  const styles = useStyles();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    history.push("/login");
  }

  function gridCore(data, position) {
    return (
      <div style={{ position: "relative" }}>
        <img
          src={data.image}
          alt="userImage"
          className={styles.winnersImages}
        />
        <br />
        <p
          style={{
            color: "white",
            opacity: 0.8,
            fontSize: "2rem",
            lineHeight: "10%",
            fontWeight: "200",
          }}
        >
          {" "}
          {data.score}
        </p>
        <Typography
          variant="button"
          gutterBottom
          style={{ color: "white", opacity: 0.7 }}
        >
          {" "}
          {data.userName}{" "}
        </Typography>

        <Fab
          size="small"
          style={{
            position: "absolute",
            top: "0px",
            background: "#ffaada",
            fontWeight: "700",
            color: "purple",
            fontSize: "16px",
          }}
        >
          {position}
        </Fab>
      </div>
    );
  }

  function generateWinners(data) {
    return (
      <Grid container spacing={10} justifyContent="center">
        <Grid item xs4>
          {gridCore(data[2], 3)}
        </Grid>
        <Grid item xs4 style={{ transform: "translateY(-50%)" }}>
          {gridCore(data[0], 1)}
        </Grid>
        <Grid item xs4>
          {gridCore(data[1], 2)}
        </Grid>
      </Grid>
    );
  }

  function generateRunnerUp(data) {
    return (
      <List style={{ width: "100%" }}>
        {data.map((k, i, a) => (
          <>
            <ListItem style={{ background: "#fff" }}>
              <ListItemText>
                <ListItemButton>
                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <img
                        src={k.image}
                        alt="userImage"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      ></img>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="button" style={{ color: "#333" }}>
                        {k.userName}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Fab
                        size="small"
                        style={{
                          position: "absolute",
                          top: 0,
                          background: "#ffaada",
                        }}
                      >
                        {k.score}
                      </Fab>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItemText>
            </ListItem>
            <Divider light />
          </>
        ))}
      </List>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography component={"h1"} variant="h4" className={styles.header}>
            Leaderboard
          </Typography>
        </Grid>
        {/* winners grid */}
        <Grid item xs={8} style={{ marginTop: "20vh" }}>
          {generateWinners(dummyData.slice(0, 3))}
        </Grid>
        {/* Runner ups */}

        <Grid item xs={6}>
          <Grid container justifyContent="center">
            {generateRunnerUp(dummyData.slice(3, dummyData.length))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Leaderboard;
