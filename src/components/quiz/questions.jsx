import { useEffect, useState } from 'react';
import firebase from '../../firebase/firebaseApp';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([])
  const [startTime, setStartTime] = useState()
  const db = firebase.firestore();

  const getQuestions = async () => {
    setLoading(true);
    const snapshot = await db
      .collection('questions')
      .where("category", "==", 'country-capitals')
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
      // quizAnswers
      setQuizAnswers[questionId] = choice
    }
  }

  useEffect(() => {
    getQuestions();
  }, [])


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
          {questions.map((question) => (
            <div key = {question.id}>
              <div className='question-text'>{question.statement}</div>
              <div>{question.id}</div>
              <div className='answer-section'>
                {question.choices.map((choice, index) => (
                  <button onClick={() => handleAnswerOptionClick(question.id, choice, question.answer)}>{choice}</button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={() => handleSubmit()}>Submit</button>
        </>
      )}
    </div>
  );
}

export default Questions;
