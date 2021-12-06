import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { doc, increment, updateDoc } from "firebase/firestore";
import state from "../../state/global";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase/firebaseApp";
import Timer from "./Timer";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthProvider";
import { Prompt } from "react-router";
import {
  categoryList,
  allQuestions,
  DEFAULT_CATEGORY,
  HEADER_CSS,
} from "../../variables/constant";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  lineHeight: "100px",
  fontWeight: "600",
  fontSize: 20,
  borderRadius: 20,
  cursor: "pointer",
}));

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: "12px !important",
    minWidth: "-webkit-fill-available",
    textAlign: "center",
  },
  header: HEADER_CSS,
}));

function Questions() {
  const history = useHistory();
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const { currentUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [startTime, setStartTime] = useState(+new Date());
  const [currentCategory, setCategory] = useRecoilState(
    state.currentCategoryState
  );
  const timer = useRecoilValue(state.timerState);
  const db = firebase.firestore();
  const [showPrompt, setShowPrompt] = useState(true);

  const checkForRefresh = () => {
    window.addEventListener("beforeunload", function (e) {
      (e || window.event).returnValue = null;
      return null;
    });
  };

  useEffect(() => {
    checkForRefresh();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = allQuestions[currentCategory].sort(
      () => 0.5 - Math.random()
    );
    // Get sub-array of first 10 elements after shuffled
    return shuffled.slice(0, 10);
  };

  const getQuestions = () => {
    setLoading(true);
    setQuestions(shuffleQuestions());
    setLoading(false);
  };

  const updateUserScore = async (quizScore) => {
    const userRef = doc(db, "users", currentUser.uid);
    // Atomically increment the population of the city by 50.
    await updateDoc(userRef, {
      score: increment(quizScore),
    });
  };

  const submitQuiz = async () => {
    const actualEndTime = startTime + 300000;
    const correctQuestions = Object.entries(quizAnswers).filter(
      ([key, value]) => value.isCorrect
    ).length;
    let totalScore = correctQuestions * 4 - 10;
    const currentTime = +new Date();
    let timeBonus = false;
    if (timer && actualEndTime >= currentTime) {
      // give extra points if finished within time
      totalScore += correctQuestions;
      timeBonus = true;
    }

    const payload = {
      category: currentCategory,
      score: totalScore,
      userId: currentUser.uid,
      startTime: startTime,
      endTime: currentTime,
      actualEndTime: actualEndTime,
      questions: quizAnswers,
      timer: timer,
      timeBonus: timeBonus,
      correctQuestions: correctQuestions,
    };

    const quiz = await addDoc(collection(db, "quizes"), payload);
    updateUserScore(totalScore);
    return quiz;
  };

  const handleAnswerOptionClick = async (choice) => {
    const answers = quizAnswers;
    // save question with ans
    answers[questions[currentQuestion].id] = {
      statement: questions[currentQuestion].statement,
      isCorrect: choice === questions[currentQuestion].answer,
      selected: choice,
      correctChoice: questions[currentQuestion].answer,
    };

    setQuizAnswers(answers);
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowPrompt(false);
      const quiz = await submitQuiz();
      history.push(`${quiz.id}/summary`);
    }
  };

  useEffect(() => {
    if (currentCategory) {
      getQuestions();
    } else {
      history.push("/select-quiz-category");
    }
  }, [currentCategory]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div className="app-bg">
      <Container component="main" maxWidth="md">
        <Prompt
          when={showPrompt}
          message={() =>
            `Are you sure you want to go to another page? Any progress made on the quiz will be lost!`
          }
        />
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography component={"h1"} variant="h4" className={styles.header}>
              QUIZ - {categoryList[currentCategory]}
            </Typography>
          </Grid>
          {timer && <Timer></Timer>}
        </Grid>

        {questions && questions.length > 0 && (
          <Card className={cx(styles.card, shadowStyles.root)}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, mt: 2 }}
                color="text.secondary"
                gutterBottom
              >
                Question {currentQuestion + 1} / {questions.length}
              </Typography>
              <Typography variant="h5" component="div" sx={{ mb: 5, mt: 3 }}>
                {questions[currentQuestion].statement}
              </Typography>

              <Typography variant="body2">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {questions[currentQuestion].choices.map(
                      (answerOption, index) => (
                        <Grid item xs={6} key={index}>
                          <Item
                            onClick={() =>
                              handleAnswerOptionClick(answerOption)
                            }
                            key={index}
                            elevation={0}
                            className="card"
                            variant="outlined"
                          >
                            {answerOption}
                          </Item>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default Questions;
