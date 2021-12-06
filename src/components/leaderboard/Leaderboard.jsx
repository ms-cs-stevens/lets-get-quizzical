import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { useHistory } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import {
  Grid,
  Typography,
  Fab,
  Container,
  ListItemText,
  ListItem,
  List,
  makeStyles,
  Divider,
} from "@material-ui/core";
import {
  WHITE_COLOR,
  PURPLE_COLOR,
  PINK_COLOR,
  HEADER_CSS,
} from "../../variables/constant";
import firebase from "../../firebase/firebaseApp";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

const useStyles = makeStyles(() => ({
  header: HEADER_CSS,
  cuWinner: {
    color: PINK_COLOR,
  },
  ncuWinner: {
    color: WHITE_COLOR,
  },
  currentUserLI: {
    background: PINK_COLOR,
  },
  notCurrentUserLI: {
    background: "#fff",
  },
  winnersImages: {
    width: "100px",
    height: "100px",
    border: `2px solid ${WHITE_COLOR}`,
    borderRadius: "50%",
  },
  rankButton: {
    position: "absolute",
    top: "0",
    right: "0",
    fontWeight: "700",
    background: PINK_COLOR,
    color: PURPLE_COLOR,
    fontSize: "16px",
  },
  rankButtonRP: {
    background: PINK_COLOR,
    color: PURPLE_COLOR,
    fontSize: "16px",
  },
  score: {
    color: WHITE_COLOR,
    opacity: 0.8,
    fontSize: "2rem",
    lineHeight: "10%",
    fontWeight: "200",
  },
}));

const Leaderboard = () => {
  const styles = useStyles();
  const history = useHistory();
  const db = firebase.firestore();
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const isCurrentUser = (id) => id === currentUser.uid;

  useEffect(() => {
    async function fetchData() {
      const snapshot = await db.collection("users").get();

      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedData = data.sort((a, b) => (a.score > b.score ? -1 : 1));
      setUsers(sortedData);
    }

    fetchData();
  }, [db]);

  if (!currentUser) {
    history.push("/login");
  }

  function gridCore(data, position) {
    if (data) {
      return (
        <ThemeProvider theme={theme}>
          <div style={{ position: "relative" }}>
            <img
              src="avatar-default.png"
              alt="userImage"
              className={styles.winnersImages}
            />
            <br />
            <Tooltip title="Total Score" placement="bottom">
              <p className={styles.score}> {data.score}</p>
            </Tooltip>
            <Typography
              variant="button"
              gutterBottom
              className={
                isCurrentUser(data.id) ? styles.cuWinner : styles.ncuWinner
              }
            >
              {data.firstName} {data.lastName}
              {isCurrentUser(data.id) ? "*" : ""}
            </Typography>
            <Tooltip title="Rank" placement="right-start">
              <Fab size="small" className={styles.rankButton}>
                {position}
              </Fab>
            </Tooltip>
          </div>
        </ThemeProvider>
      );
    } else {
      return "";
    }
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
            <ListItem
              className={
                k.id === currentUser.uid
                  ? styles.currentUserLI
                  : styles.notCurrentUserLI
              }
            >
              <ListItemText>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <Tooltip title="Rank" placement="right-start">
                      <Fab size="small" className={styles.rankButtonRP}>
                        {i + 4}
                      </Fab>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={2}>
                    <img
                      src="avatar-default.png"
                      alt="userImage"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    ></img>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="button"
                      style={{ color: PURPLE_COLOR }}
                    >
                      {k.firstName} {k.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Tooltip title="Total Score" placement="left-start">
                      <Typography
                        variant="button"
                        style={{ color: PURPLE_COLOR }}
                      >
                        {k.score}
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <Divider light />
          </>
        ))}
      </List>
    );
  }

  return (
    <div className="app-bg">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography component={"h1"} variant="h4" className={styles.header}>
              Leaderboard
            </Typography>
          </Grid>
          {/* winners grid */}
          <Grid item xs={8} style={{ marginTop: "20vh" }}>
            {generateWinners(users.slice(0, 3))}
          </Grid>
          {/* Runner ups */}
          <Grid item xs={6}>
            <Grid container justifyContent="center">
              {generateRunnerUp(users.slice(3, users.length))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Leaderboard;
