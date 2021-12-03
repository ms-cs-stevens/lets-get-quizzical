import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import state from "../../state/global";
import Container from "@mui/material/Container";
import FlashcardList from "./FlashcardList";
import firebase from "../../firebase/firebaseApp";
import { AuthContext } from "../../AuthProvider";
import countryQuestions from "../../dataset/country-capitals.json";
import mathematicsQuestions from "../../dataset/mathematics.json";
import antonymsQuestions from "../../dataset/antonyms.json";
import solarSystemQuestions from "../../dataset/solar-system.json";

const Learn = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Solar System");
  const currentCategory = useRecoilValue(state.currentCategoryState);
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
    let questions, title;
    switch (currentCategory) {
      case "country-capitals":
        questions = countryQuestions;
        title = "Country Capitals";
        break;
      case "mathematics":
        questions = mathematicsQuestions;
        title = "Mathematics";
        break;
      case "antonyms":
        questions = antonymsQuestions;
        title = "Antonyms";
        break;
      case "solar-system":
        questions = solarSystemQuestions;
        title = "Solar System";
        break;
      default:
        questions = solarSystemQuestions;
        title = "Solar System";
    }

    setQuestions(questions);
    setTitle(title);
    setLoading(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div className="learn">
      <h1>Learn - {title}</h1>
      <Container>
        {questions.length > 0 && <FlashcardList flashcards={questions} />}
      </Container>
    </div>
  );
};

export default Learn;
