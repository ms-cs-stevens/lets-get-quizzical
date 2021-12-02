import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import state from "../../state/global"
import Button from '@mui/material/Button';
import firebase from '../../firebase/firebaseApp';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([])
  const [startTime, setStartTime] = useState()
  const [currentCategory, setCategory] = useRecoilState(state.currentCategoryState)
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
    setQuestions([
      {
          "id": "0LhNFrZ0rWHWQhOqGqX2",
          "statement": "Which planet is the most likely candidate for a future human habitat?",
          "choices": [
              "Mars",
              "Jupiter",
              "Venus",
              "Neptune"
          ],
          "answer": "Mars",
          "category": "solar-system"
      },
      {
          "id": "BkTTY9DSnal7cvxKB7Kl",
          "category": "solar-system",
          "statement": "Which planet is named after the Roman goddess of beauty?",
          "answer": "Venus",
          "choices": [
              "Venus",
              "Saturn",
              "Mars",
              "Earth"
          ]
      },
      {
          "id": "KhXf0gWVbwc6c5JpLTOf",
          "choices": [
              "Mercury",
              "Earth",
              "Jupiter",
              "Mars"
          ],
          "category": "solar-system",
          "answer": "Mercury",
          "statement": "Which is the fastest planet?"
      },
      {
          "id": "g9I91xtGgD6sbNbpVMv3",
          "statement": "Which planet is known for the \"Great Red Spot\"?",
          "answer": "Jupiter",
          "category": "solar-system",
          "choices": [
              "Mars",
              "Jupiter",
              "Venus",
              "Mercury"
          ]
      },
      {
          "id": "jwWT6txpDt2TXfRmyayF",
          "statement": "How many years does it take for Uranus to orbit once around the sun?",
          "choices": [
              "165",
              "163",
              "167",
              "120"
          ],
          "answer": "165",
          "category": "solar-system"
      },
      {
          "id": "vThEBfLPxFy6mCBfpgQg",
          "choices": [
              "Earth",
              "Mars",
              "Jupiter",
              "Neptune"
          ],
          "category": "solar-system",
          "statement": "Which planet is covered largely by water?",
          "answer": "Earth"
      }
    ])
    setLoading(false)
  };

  const handleAnswerOptionClick = async (questionId, choice, correctAns) => {
    if(choice === correctAns) {
      setScore(score + 1);
      // save question with ans
      console.log("--before---", quizAnswers)
      setQuizAnswers(quizAnswers.push({
        questionId : {isCorrect: true, selected: choice}
      }))

      console.log("---quiz ans---", quizAnswers)
    }
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
      // generate quiz record in db
			setShowScore(true);
      setCategory(undefined)
		}
  }

  useEffect(() => {
    if(currentCategory) {
      getQuestions();
    } else {
      // redirect to category page to select category
    }
  }, [currentCategory])


  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <h1>Quiz</h1>
          {questions.length > 0 &&
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].statement}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].choices.map((answerOption) => (
                  <Button variant="contained" onClick={() => handleAnswerOptionClick(questions[currentQuestion].id, answerOption, questions[currentQuestion].answer)}>
                    {answerOption}
                  </Button>
                ))}
              </div>
            </>
          }
        </>
      )}
    </div>
  );
}

export default Questions;
