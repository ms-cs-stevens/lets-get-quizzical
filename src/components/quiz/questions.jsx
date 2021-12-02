import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import state from "../../state/global"
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
    const snapshot = await db
      .collection('questions')
      .where("category", "==", currentCategory)
      .get();
    let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setQuestions(data.slice(0, 10))
    setLoading(false)
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const handleAnswerOptionClick = async (questionId, choice, correctAns) => {
    if(choice === correctAns) {
      setScore(score + 1);
      // save question with ans
    }
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
  }

  useEffect(() => {
    if(currentCategory) {
      getQuestions();
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
          <><div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].statement}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].choices.map((answerOption) => (
              <button onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption}</button>
              ))}
					</div>


          <button onClick={() => handleSubmit()}>Submit</button></>
            }
        </>
      )}
    </div>
  );
}

export default Questions;
