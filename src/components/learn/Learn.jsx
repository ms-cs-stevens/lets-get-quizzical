import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import state from "../../state/global";
import Container from "@mui/material/Container";
import FlashcardList from "./FlashcardList";
import { AuthContext } from "../../AuthProvider";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@mui/material";
import {
  categoryList,
  allQuestions,
  HEADER_CSS,
} from "../../variables/constant";

const useStyles = makeStyles(() => ({
  header: HEADER_CSS,
}));

const Learn = () => {
  const styles = useStyles();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentCategory = useRecoilValue(state.currentCategoryState);

  const checkForRefresh = () => {
    window.addEventListener("beforeunload", function (e) {
      (e || window.event).returnValue = null;
      return null;
    });
  };

  useEffect(() => {
    checkForRefresh();
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    setQuestions(allQuestions[currentCategory]);
    setLoading(false);
  };

  useEffect(() => {
    if (currentCategory) {
      getQuestions();
    } else {
      history.push("/select-quiz-category");
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
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component={"h1"} variant="h4" className={styles.header}>
              Learn - {categoryList[currentCategory]}
            </Typography>
          </Grid>
          {questions.length > 0 && <FlashcardList flashcards={questions} />}
        </Grid>
      </Container>
    </div>
  );
};

export default Learn;
