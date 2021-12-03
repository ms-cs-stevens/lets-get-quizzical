import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import state from "../../state/global";
import Button from "@mui/material/Button";
import firebase from "../../firebase/firebaseApp";
import Timer from "./Timer";

import countryQuestions from "../../dataset/country-capitals.json";
import mathematicsQuestions from "../../dataset/mathematics.json";
import antonymsQuestions from "../../dataset/antonyms.json";
import solarSystemQuestions from "../../dataset/solar-system.json";

function Questions() {
  const history = useHistory();
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
      console.log("--before---", quizAnswers);
      setQuizAnswers(
        quizAnswers.push({
          questionId: { isCorrect: true, selected: choice },
        })
      );

      console.log("---quiz ans---", quizAnswers);
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
      // redirect to category page to select category
      // give alert before redirecting
      history.push("/categories");
    }
  }, [currentCategory]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <h1>Quiz</h1>
          <Timer></Timer>
          {questions.length > 0 && (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].statement}
                </div>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].choices.map((answerOption) => (
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAnswerOptionClick(
                        questions[currentQuestion].id,
                        answerOption,
                        questions[currentQuestion].answer
                      )
                    }
                  >
                    {answerOption}
                  </Button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;
