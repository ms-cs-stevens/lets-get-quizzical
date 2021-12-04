import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import state from "../../state/global";
import Container from "@mui/material/Container";
import FlashcardList from "./FlashcardList";
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
  const [category, setCategory] = useState("Solar System");
  const currentCategory = useRecoilValue(state.currentCategoryState);

  const getQuestions = async () => {
    setLoading(true);
    let questions, category;
    switch (currentCategory) {
      case "country-capitals":
        questions = countryQuestions;
        category = "Country Capitals";
        break;
      case "mathematics":
        questions = mathematicsQuestions;
        category = "Mathematics";
        break;
      case "antonyms":
        questions = antonymsQuestions;
        category = "Antonyms";
        break;
      case "solar-system":
        questions = solarSystemQuestions;
        category = "Solar System";
        break;
      default:
        questions = solarSystemQuestions;
        category = "Solar System";
    }

    setQuestions(questions);
    setCategory(category);
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
      <h1>Learn - {category}</h1>
      <Container>
        {questions.length > 0 && <FlashcardList flashcards={questions} />}
      </Container>
    </div>
  );
};

export default Learn;
