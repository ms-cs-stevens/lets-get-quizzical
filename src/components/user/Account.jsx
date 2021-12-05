import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider.jsx";
import Card from "./StatsCard.jsx";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard.jsx";
import EditUser from "./EditUser.jsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import firebase from "../../firebase/firebaseApp";
import { Container, makeStyles } from "@material-ui/core";
import quizzes from "../../dataset/quizzes.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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

  const categories = [
    {
      value: "country-capitals",
      label: "Country capitals",
    },
    {
      value: "mathematics",
      label: "Mathematics",
    },
    {
      value: "antonyms",
      label: "Antonyms",
    },
    {
      value: "solar-system",
      label: "Solar System",
    },
  ];

  const updateUser = (user) => {
    setUser(user);
    setOpen(false);
  };

  const totalQuizzes = () => {
    return {
      count: quizzes.length,
      score: quizzes.reduce((a, b) => {
        return a + b.score;
      }, 0),
    };
  };

  const categoryData = () => {
    const data = [];
    categories.forEach((category) => {
      let max = -1000;
      let count = 0;
      quizzes.forEach((quiz) => {
        console.log(quiz.category);
        if (quiz.category === category.value) {
          max = Math.max(max, quiz.score);
          count = count + 1;
        }
      });
      data.push({
        label: category.label,
        count: count,
        highestScore: count === 0 ? 0 : max,
      });
    });

    console.log(data);
    return data;
  };

  if (user) {
    return (
      <div className={classes.paper}>
        <Container component="main" maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <EditIcon
                onClick={() => setOpen(true)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "20%",
                  top: "20%",
                }}
              />
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
