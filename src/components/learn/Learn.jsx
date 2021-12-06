import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import state from "../../state/global";
import Container from "@mui/material/Container";
import FlashcardList from "./FlashcardList";
import { AuthContext } from "../../AuthProvider";
import { categoryList, allQuestions, DEFAULT_CATEGORY } from "../../variables/constant";

const Learn = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCategory] = useRecoilState(state.currentCategoryState);

  const getQuestions = async () => {
    setLoading(true);
    setQuestions(allQuestions[currentCategory]);
    setLoading(false);
  };

  useEffect(() => {
    if(currentCategory) {
      getQuestions();
    } else {
      setCategory(DEFAULT_CATEGORY)
    }
  }, [currentCategory]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div className="learn">
      <h1>Learn - {categoryList[currentCategory]}</h1>
      <Container>
        {questions.length > 0 && <FlashcardList flashcards={questions} />}
      </Container>
    </div>
  );
};

export default Learn;
