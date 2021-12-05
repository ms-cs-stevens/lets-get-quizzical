import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Switch, FormControlLabel } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../../AuthProvider";
import { useRecoilState } from "recoil";
import state from "../../state/global";
import { categoryList } from "../../variables/constant";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: "#fff",
  width: 400,
  height: 200,
  lineHeight: "100px",
  fontWeight: "400",
  fontSize: 25,
  backgroundColor: "#fb8c00",
  borderRadius: 20,
  cursor: "pointer",
}));

function Categories() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [categories, setCategories] = useState({});
  const [currentCategory, setCurrentCategory] = useRecoilState(
    state.currentCategoryState
  );
  const [timer, setTimer] = useRecoilState(state.timerState);

  const history = useHistory();

  const handleCategorySelect = (e, categoryId) => {
    setCurrentCategory(categoryId);
    setOpen(true);
  };

  const handleStartQuiz = (e) => {
    history.push("/quiz");
  };

  const showFlashcards = (e) => {
    history.push("/learn");
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
    // let data = {}
    // snapshot.docs.map((doc) => (data[doc.id] = ...doc.data()));
    setCategories(categoryList);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser) {
    history.push("/login");
  }

  return (
    <Container maxWidth="md">
      <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
        SELECT A CATEGORY FOR QUIZ
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {Object.entries(categories).map(([key, value]) => (
          <Grid item xs={6} md={6} key={key}>
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
                onClick={(e) => handleCategorySelect(e, key)}
                key={key}
                className="card"
                elevation={3}
              >
                {value}
              </Item>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog maxWidth={"sm"} fullWidth={true} open={open} align="left">
        <DialogTitle>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}>
              <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                <AssignmentIcon />
              </Avatar>
            </Grid>
            <Grid item xs={10}>
              Selected Category: {categories[currentCategory]}
              <br />
              <Typography variant="subtitle1">10 Questions</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            You can set timer for quiz. You'll get 1 bonus point for each
            correct question if finished within the time.
          </DialogContentText>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelQuiz}>
            Change Category
          </Button>
          <Button color="primary" onClick={showFlashcards}>
            Show Flashcards
          </Button>
          <Button color="primary" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Categories;
