import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Switch, FormControlLabel } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import firebase from "../../firebase/firebaseApp";
import { useRecoilState } from "recoil";
import state from "../../state/global";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.primary,
  width: 250,
  lineHeight: "100px",
  fontWeight: "600",
  fontSize: 20,
  borderRadius: 20,
}));

function Categories() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(
    state.currentCategoryState
  );
  const [timer, setTimer] = useRecoilState(state.timerState);

  const history = useHistory();
  const db = firebase.firestore();

  const handleCategorySelect = (e, categoryId) => {
    setCurrentCategory(categoryId);
    setOpen(true);
  };

  const handleStartQuiz = (e) => {
    history.push("/quiz");
  };

  const cancelQuiz = () => {
    setOpen(false);
    setCurrentCategory(undefined);
  };

  const getCategories = async () => {
    setLoading(true);
    // const snapshot = await db
    //   .collection('categories')
    //   .get();
    // let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    let data = [
      { id: "country-capitals", label: "Country Capitals" },
      { id: "mathematics", label: "Maths" },
      { id: "solar-system", label: "Solar System" },
    ];
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container maxWidth="md">
      <h2>Select Your Category</h2>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {categories.map((category, index) => (
          <Grid item xs={6} md={4} key={index}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Item
                style={{ cursor: "pointer" }}
                onClick={(e) => handleCategorySelect(e, category.id)}
                key={index}
                elevation={3}
              >
                {category.label}
              </Item>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog maxWidth={"md"} fullWidth={true} open={open} align="left">
        <DialogTitle>Quiz options</DialogTitle>
        <DialogContent>
          You have selected <b>{currentCategory}</b> category.
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={timer} onChange={() => setTimer(!timer)} />
              }
              label="Timer"
            />
            {timer &&
              "You'll get 1 bonus point for each correct question if finished within the timeframe"}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
          <Button color="primary" onClick={cancelQuiz}>
            Change Category
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Categories;
