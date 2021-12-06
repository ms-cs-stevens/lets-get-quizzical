import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider.jsx";
import firebase from "../../firebase/firebaseApp";
import Card from "./StatsCard.jsx";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard.jsx";
import EditUser from "./EditUser.jsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { categoryList, HEADER_CSS } from "../../variables/constant";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: HEADER_CSS,
}));

function Account() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        setUser({
          firstName: currentUser.displayName.split(" ")[0],
          lastName: currentUser.displayName.split(" ")[1],
          email: currentUser.email,
        });
      }
    }

    fetchUser();
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await db
        .collection("quizes")
        .where("userId", "==", currentUser.uid)
        .get();

      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserQuizzes(data);
    }

    fetchData();
  }, [currentUser, db]);

  const updateUser = (user) => {
    setUser(user);
    setOpen(false);
  };

  const totalQuizzes = () => {
    return {
      count: userQuizzes.length,
      score: userQuizzes.reduce((a, b) => {
        return a + b.score;
      }, 0),
    };
  };

  const categoryData = () => {
    const data = [];
    const categories = Object.keys(categoryList);

    categories.forEach((category) => {
      let max = -1000;
      let count = 0;
      userQuizzes.forEach((quiz) => {
        console.log(quiz);
        if (quiz.category === category) {
          max = Math.max(max, quiz.score);
          count = count + 1;
        }
      });
      data.push({
        label: categoryList[category],
        count: count,
        highestScore: count === 0 ? 0 : max,
      });
    });

    return data;
  };

  if (user) {
    return (
      <div className="app-bg">
        <Typography component={"h1"} variant="h4" className={classes.header}>
          Profile
        </Typography>
        <Container component="main" maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <Tooltip title="Edit User">
                <EditIcon
                  onClick={() => setOpen(true)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "20%",
                    top: "25%",
                  }}
                />
              </Tooltip>
              <ProfileCard
                firstName={user.firstName}
                lastName={user.lastName}
                totalData={totalQuizzes()}
                categoryData={categoryData()}
              />
            </Grid>
            <Grid item xs={12}>
              <br />
              {userQuizzes.length > 0 && <Card quizData={userQuizzes} />}
            </Grid>
          </Grid>

          <Dialog
            maxWidth={"sm"}
            onClose={() => setOpen(false)}
            fullWidth={true}
            open={open}
            align="left"
          >
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                <EditUser user={user} updateUser={updateUser} />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>
      </div>
    );
  } else {
    return "Loading";
  }
}

export default Account;
