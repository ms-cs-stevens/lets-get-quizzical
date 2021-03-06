import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../firebase/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import { Paper } from "@material-ui/core";
import InfoCard from "./InfoCard";
import TimerIcon from "@mui/icons-material/Timer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GradeIcon from "@mui/icons-material/Grade";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PercentIcon from "@mui/icons-material/Percent";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red, orange, green, blue, purple } from "@material-ui/core/colors";
import { WHITE_COLOR, PURPLE_COLOR } from "../../variables/constant";
import { yellow } from "@mui/material/colors";
import { categoryList } from "../../variables/constant";

const useStyles = makeStyles(({ palette }) => ({
  header: {
    color: WHITE_COLOR,
  },
}));

const Summary = () => {
  const history = useHistory();
  const styles = useStyles();
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [quiz, setQuiz] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    async function fetchQuiz() {
      const snapshot = await getDoc(doc(db, "quizes", id));
      const data = { id: snapshot.id, ...snapshot.data() };
      setQuiz(data);
      setLoading(false);
    }

    fetchQuiz();
  }, [id, db]);

  if (!currentUser) {
    history.push("/login");
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {quiz && (
        <div className="app-bg">
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  component={"h1"}
                  variant="h4"
                  className={styles.header}
                >
                  Quiz Summary
                </Typography>
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Accuracy"
                  value={`${quiz.correctQuestions * 10}%`}
                  icon={<PercentIcon />}
                  color={yellow}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Correct"
                  value={quiz.correctQuestions}
                  icon={<CheckIcon />}
                  color={green}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Incorrect"
                  value={10 - quiz.correctQuestions}
                  icon={<CloseIcon />}
                  color={red}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Total Time"
                  value={`${millisToMinutesAndSeconds(
                    quiz.endTime - quiz.startTime
                  )} (mm:ss)`}
                  icon={<AccessTimeIcon />}
                  color={purple}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Time Bonus"
                  value={quiz.timeBonus ? quiz.correctQuestions : 0}
                  icon={quiz.timer ? <TimerIcon /> : <TimerOffIcon />}
                  color={blue}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Total Score"
                  value={quiz.score}
                  icon={<GradeIcon />}
                  color={orange}
                />
              </Grid>
            </Grid>
            <br />
            <Paper>
              <br />
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 1, mt: 2, color: PURPLE_COLOR }}
              >
                Review Questions
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {categoryList[quiz.category]}
              </Typography>
              <Grid
                container
                justifyContent="space-evenly"
                alignItems="center"
                alignContent="center"
                style={{ padding: "20px" }}
                spacing={1}
              >
                {Object.entries(quiz.questions).map(([key, value]) => (
                  <Grid item xs={4}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderColor: value.isCorrect ? "green" : " red",
                        minHeight: "180px",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="body2"
                          style={{ color: PURPLE_COLOR }}
                        >
                          {value.statement} [{value.isCorrect ? "+3" : "-1"}]
                          <hr />
                          <Grid container>
                            Your Choice: {value.selected}
                            <br />
                            Correct Answer: {value.correctChoice}
                          </Grid>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <br />
            </Paper>
            <br />
          </Container>
        </div>
      )}
    </>
  );
};

export default Summary;
