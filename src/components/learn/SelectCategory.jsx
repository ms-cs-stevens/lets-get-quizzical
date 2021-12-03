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
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import firebase from "../../firebase/firebaseApp";
import { AuthContext } from "../../AuthProvider";
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
  const db = firebase.firestore();

  const handleCategorySelect = (e, categoryId) => {
    setCurrentCategory(categoryId);
    setOpen(true);
  };

  const handleStartLearnig = (e) => {
    history.push("/learn");
  };

  const cancelLearn = () => {
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
    let data = {
      "country-capitals": "Country Capitals",
      mathematics: "Maths",
      "solar-system": "Solar System",
      antonyms: "Antonyms",
    };
    setCategories(data);
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
      <h2>SELECT THE CATEGORY FOR LEARNING</h2>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {Object.entries(categories).map(([key, value]) => (
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
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            You'll now see a list of flashcards for your selected category.
            Click on each card to see the answer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelLearn}>
            Change Category
          </Button>
          <Button color="primary" onClick={handleStartLearnig}>
            Show Flashcards
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Categories;
