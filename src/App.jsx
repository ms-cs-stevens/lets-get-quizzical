import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Questions from "./components/quiz/questions";
// import AddQuestions from "./components/quiz/AddQuestion";
import Categories from "./components/quiz/Categories";
import LearnCategories from "./components/learn/SelectCategory";
import Learn from "./components/learn/Learn";
import Account from "./components/user/Account";
import HomePage from "./components/HomePage";
import Faqs from "./components/faqs/Faqs_comp.js";
import { AuthProvider } from "./AuthProvider.jsx";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Summary from "./components/quiz/Summary";
import UserQuizzes from "./components/quiz/UserQuizzes";

const theme = createTheme({
  typography: {
    subtitle1: {
      color: "#333",
      fontSize: 12,
    },
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navigation />
          <br />
          <div className="App">
            <div className="App-body">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/register" component={Signup} />
                <Route path="/login" component={SignIn} />
                <div className="app-bg">
                  <Route path="/quiz" component={Questions} />
                  {/* <Route path="/add_questions" component={AddQuestions} /> */}
                  <Route path="/select-quiz-category" component={Categories} />
                  <Route
                    path="/select-learning-category"
                    component={LearnCategories}
                  />
                  <Route path="/learn" component={Learn} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/how-to-play" component={Faqs} />
                  <Route path="/:id/summary" component={Summary} />
                  <Route path="/user/account" component={Account} />
                  <Route path="/quizzes" component={UserQuizzes} />
                  <br />
                  <br />
                </div>
              </Switch>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
