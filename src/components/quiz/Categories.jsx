import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
  cursor: 'pointer',
}));

function Categories() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
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
    // let data = {}
    // snapshot.docs.map((doc) => (data[doc.id] = ...doc.data()));
    let data = { "country-capitals": "Country Capitals",
      "mathematics": "Maths",
      "solar-system": "Solar System" };
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
      <h2>SELECT THE CATEGORY FOR QUIZ</h2>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        { Object.entries(categories).map(([key, value]) => (
          <Grid item xs={6} md={4} key={key}>
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
            <br/>
            <small>10 Questions</small>
          </Grid>
        </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            You can set timer for quiz. You'll get 1 bonus point for each correct question if finished within the time.
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
              control={ <Switch checked={timer} onChange={() => setTimer(!timer)} />  }
              label="Timer"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelQuiz}>
            Change Category
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
