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
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../AuthProvider";
import { useRecoilState } from "recoil";
import state from "../../state/global";
import {
  categoryList,
  WHITE_COLOR,
  PURPLE_COLOR,
  HEADER_CSS,
} from "../../variables/constant";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: PURPLE_COLOR,
  width: 305,
  height: 145,
  lineHeight: "100px",
  fontWeight: "400",
  fontSize: 18,
  backgroundColor: WHITE_COLOR,
  borderRadius: 20,
  cursor: "pointer",
}));

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: "-webkit-fill-available",
    textAlign: "center",
  },
  header: HEADER_CSS,
  popup: {
    color: PURPLE_COLOR,
  },
}));

function Categories() {
  const styles = useStyles();
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
    <div className="app-bg">
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12}>
            <Typography component={"h1"} variant="h4" className={styles.header}>
              Select a Category
            </Typography>
          </Grid>
          {Object.entries(categories).map(([key, value]) => (
            <Grid item xs={6} md={6} key={key}>
              <Box
                sx={{
                  p: 2,
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
            <Grid
              container
              direction="row"
              alignItems="center"
              className={styles.popup}
            >
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
                color: PURPLE_COLOR,
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
            <Button className={styles.btn} onClick={cancelQuiz}>
              Change Category
            </Button>
            <Button className={styles.btn} onClick={showFlashcards}>
              Show Flashcards
            </Button>
            <Button className={styles.btn} onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Categories;
