import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider.jsx";
import { useHistory } from "react-router";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import firebase from "../../firebase/firebaseApp";
import { categoryList } from "../../variables/constant.jsx";

const UserQuizzes = (props) => {
  const history = useHistory();
  const [quizzes, setQuizzes] = useState([]);
  const db = firebase.firestore();
  const { currentUser } = useContext(AuthContext);

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
      setQuizzes(data);
    }

    fetchData();
  }, [currentUser, db]);

  const redirectToQuiz = (e, link) => {
    history.push(link);
  };

  const sortedQuizzes = (quizzes) => {
    return quizzes.sort((a, b) => (a.startTime > b.startTime ? -1 : 1));
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <Container maxWidth="md">
      <br />
      <Typography variant={"h3"}>Past Quizzes</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Correct</TableCell>
              <TableCell align="right">Incorrect</TableCell>
              <TableCell align="right">Time Bonus</TableCell>
              <TableCell align="right">Time taken (mm:ss)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes &&
              sortedQuizzes(quizzes).map((quiz) => (
                <TableRow
                  key={quiz.id}
                  style={{ cursor: "pointer" }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(e) => redirectToQuiz(e, `/${quiz.id}/summary`)}
                >
                  <TableCell component="th" scope="row">
                    {categoryList[quiz.category]}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {new Date(quiz.startTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{quiz.score}</TableCell>
                  <TableCell align="right">{quiz.correctQuestions}</TableCell>
                  <TableCell align="right">
                    {10 - quiz.correctQuestions}
                  </TableCell>
                  <TableCell align="right">
                    {quiz.timeBonus ? quiz.correctQuestions : 0}
                  </TableCell>
                  <TableCell align="right">
                    {`${millisToMinutesAndSeconds(
                      quiz.endTime - quiz.startTime
                    )}`}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserQuizzes;
