import { useEffect, useState } from "react";
import firebase from "../../firebase/firebaseApp";
import countryQuestions from "../../dataset/country-capitals.json";
import mathematicsQuestions from "../../dataset/mathematics.json";
import antonymsQuestions from "../../dataset/antonyms.json";
import solarSystemQuestions from "../../dataset/solar-system.json";

function AddQuestions() {
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();

  async function add(questionSet) {
    const batch = db.batch();
    questionSet.forEach((question) => {
      const docRef = db.collection("questions").doc();
      batch.set(docRef, question, question.id);
    });
    batch.commit();
  }

  useEffect(() => {
    setLoading(true);
    add(countryQuestions);
    add(mathematicsQuestions);
    add(antonymsQuestions);
    add(solarSystemQuestions);
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Add Questions</h1>
    </div>
  );
}

export default AddQuestions;
