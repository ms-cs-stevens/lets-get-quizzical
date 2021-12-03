import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import state from "../../state/global";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import firebase from "../../firebase/firebaseApp";
import Timer from "./Timer";
import Summary from "./Summary";
import { AuthContext } from "../../AuthProvider";
import countryQuestions from "../../dataset/country-capitals.json";
import mathematicsQuestions from "../../dataset/mathematics.json";
import antonymsQuestions from "../../dataset/antonyms.json";
import solarSystemQuestions from "../../dataset/solar-system.json";

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
  const { currentUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [startTime, setStartTime] = useState();
  const [currentCategory, setCategory] = useRecoilState(
    state.currentCategoryState
  );
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
    let questions;
    switch (currentCategory) {
      case "country-capitals":
        questions = countryQuestions;
        break;
      case "mathematics":
        questions = mathematicsQuestions;
        break;
      case "antonyms":
        questions = antonymsQuestions;
        break;
      case "solar-system":
        questions = solarSystemQuestions;
        break;
      default:
        break;
    }

    setQuestions(questions);
    setLoading(false);
  };

  const handleAnswerOptionClick = async (questionId, choice, correctAns) => {
    if (choice === correctAns) {
      setScore(score + 1);
      // save question with ans
      let answers = quizAnswers;
      answers[questionId] = { isCorrect: true, selected: choice };
      setQuizAnswers(answers);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // generate quiz record in db
      setShowScore(true);
      setCategory(undefined);
    }
  };

  useEffect(() => {
    if (currentCategory) {
      const d = new Date();
      setStartTime(d.getTime());
      getQuestions();
    } else {
      setCategory("country-capitals");
      getQuestions();
    }
  }, [currentCategory]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div className="App">
      <Container maxWidth="lg">
        <br />
        {showScore ? (
          <Summary score={score} questionLength={questions.length} />
        ) : (
          <>
            <h1>QUIZ</h1>
            {questions && questions.length > 0 && (
              <>
                <Timer></Timer>
                <Card sx={{ minWidth: 275 }} variant="outlined">
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
                                  onClick={() =>
                                    handleAnswerOptionClick(
                                      questions[currentQuestion].id,
                                      answerOption,
                                      questions[currentQuestion].answer
                                    )
                                  }
                                  key={index}
                                  elevation={3}
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
          </>
        )}
      </Container>
    </div>
  );
}

export default Questions;
