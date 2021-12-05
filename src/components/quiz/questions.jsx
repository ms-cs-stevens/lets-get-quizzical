import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
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
import firebase from "../../firebase/firebaseApp";
import Timer from "./Timer";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthProvider";
import countryQuestions from "../../dataset/country-capitals.json";
import mathematicsQuestions from "../../dataset/mathematics.json";
import antonymsQuestions from "../../dataset/antonyms.json";
import solarSystemQuestions from "../../dataset/solar-system.json";
import { categoryList } from "../../variables/constant";

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

function Questions() {
  const history = useHistory();
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

  const getQuestions = async () => {
    setLoading(true);
    // const snapshot = await db
    //   .collection('questions')
    //   .where("category", "==", currentCategory)
    //   .get();
    // let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // // Select Random Question for quiz
    // setQuestions(data.slice(0, 10))
    let allQuestions;
    switch (currentCategory) {
      case "country-capitals":
        allQuestions = countryQuestions;
        break;
      case "mathematics":
        allQuestions = mathematicsQuestions;
        break;
      case "antonyms":
        allQuestions = antonymsQuestions;
        break;
      case "solar-system":
        allQuestions = solarSystemQuestions;
        break;
      default:
        break;
    }

    // TODO: Randomly select 10 questions
    setQuestions(allQuestions.slice(0, 10));
    setLoading(false);
  };

  const handleAnswerOptionClick = async (choice) => {
    const answers = quizAnswers;
    if (choice === questions[currentQuestion].answer) {
      // save question with ans
      answers[questions[currentQuestion].id] = {
        statement: questions[currentQuestion].statement,
        isCorrect: true,
        selected: choice,
        correctChoice: questions[currentQuestion].answer,
      };
    } else {
      answers[questions[currentQuestion].id] = {
        statement: questions[currentQuestion].statement,
        isCorrect: false,
        selected: choice,
        correctChoice: questions[currentQuestion].answer,
      };
    }
    setQuizAnswers(answers);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const correctQuestions = Object.entries(quizAnswers).filter(
        ([key, value]) => value.isCorrect
      ).length;
      let totalScore = correctQuestions * 3 - (10 - correctQuestions);
      let endTime = startTime + 300000;
      const currentTime = +new Date();
      let timeBonus = false;
      if(timer && endTime >= currentTime) {
        // give extra points if finished within time
        totalScore += correctQuestions;
        timeBonus = true
      }


      const payload = {
        category: currentCategory,
        score: totalScore,
        userId: currentUser.uid,
        startTime: startTime,
        endTime: currentTime,
        actualEndTime: startTime + 300000, // TODO: Save actual End time
        questions: quizAnswers,
        timer: timer === 'true',
        timeBonus: timeBonus,
        correctQuestions: correctQuestions,
      };

      const quiz = await addDoc(collection(db, "quizes"), payload);
      history.push(`${quiz.id}/summary`);
    }
  };

  useEffect(() => {
    if (currentCategory) {
      // setStartTime(+new Date());
      getQuestions();
    } else {
      setCategory("country-capitals");
    }
  }, [currentCategory]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <Container maxWidth="md">
      {questions && questions.length > 0 && (
        <>
          <br />
          <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item>
              <h1>QUIZ - {categoryList[currentCategory]}</h1>
            </Grid>
            {timer && (
              <Grid item>
                <Timer></Timer>
              </Grid>
            )}
          </Grid>
          <Card sx={{ minWidth: 275 }} variant="outlined" className={cx(shadowStyles.root)}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, mt: 2 }}
                color="text.secondary"
                gutterBottom
              >
                Question {currentQuestion + 1} / {questions.length}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 5, mt: 3 }}
              >
                {questions[currentQuestion].statement}
              </Typography>

              <Typography variant="body2">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {questions[currentQuestion].choices.map(
                      (answerOption, index) => (
                        <Grid item xs={6} key={index}>
                          <Item
                            onClick={() => handleAnswerOptionClick(answerOption) }
                            key={index}
                            elevation={0}
                            variant='outlined'
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
        </>
      )}
    </Container>
  );
}

export default Questions;
