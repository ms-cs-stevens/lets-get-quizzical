import { useEffect, useState } from 'react';
import firebase from '../../firebase/firebaseApp';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();

  const getQuestions = async () => {
    setLoading(true);
    const snapshot = await db
      .collection('questions')
      .where("category", "==", 'country-capitals')
      .get();
    let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setQuestions(data)
    setLoading(false)
  };

  useEffect(() => {
    getQuestions();
  }, [])


  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Questions</h1>
      {questions.map((question) => (
        <div key = {question.id}>
          <h2>{question.statement}</h2>
          <ul>
          {question.choices.map((choice) => (
            <li>{choice}</li>
          ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Questions;
