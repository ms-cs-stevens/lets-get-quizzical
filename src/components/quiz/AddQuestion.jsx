import { useEffect, useState } from 'react';
import firebase from '../../firebase/firebaseApp';
import countryQuestions from '../../dataset/countries.json'

function AddQuestions() {
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();

  const addQuestions = async () => {
    setLoading(true);
    let batch = db.batch()

    let options = [];
    countryQuestions.forEach((doc) => {
      options.push(doc.capital);
    })

    // Shuffle array
    const shuffled = options.sort(() => 0.5 - Math.random());
    let choices;

    countryQuestions.forEach((doc, index) => {
      choices = [doc.capital, ...shuffled.slice(index, index + 3)];

      let newDoc = {
        answer: doc.capital,
        statement: doc.name,
        category: 'country-capitals',
        choices: choices
      }
      // console.log(newDoc)
      let docRef = db.collection('questions').doc(); //automatically generate unique id
      batch.set(docRef, newDoc);
    });

    batch.commit()
    setLoading(false)
  }

  useEffect(() => {
    addQuestions();
  }, [])


  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Add Questions</h1>
    </div>
  );
}

export default AddQuestions;
