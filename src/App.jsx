import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Questions from "./components/quiz/questions";
import Categories from "./components/quiz/Categories";
import Learn from "./components/learn/Learn";
import Account from "./components/user/Account";
import HomePage from "./components/HomePage";
import Faqs from "./components/faqs/Faqs_comp.js";
import { AuthProvider } from "./AuthProvider.jsx";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Summary from "./components/quiz/Summary";
import UserQuizzes from "./components/quiz/UserQuizzes";
import { PURPLE_COLOR } from "./variables/constant";
// import NotFound from "./components/NotFound";

const theme = createTheme({
  typography: {
    color: "#6148be",
    subtitle1: {
      color: PURPLE_COLOR,
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
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/quiz" component={Questions} />
                  <Route path="/select-quiz-category" component={Categories} />
                  <Route path="/learn" component={Learn} />
                  <Route path="/faqs" component={Faqs} />
                  <Route path="/:id/summary" component={Summary} />
                  <Route path="/user/account" component={Account} />
                  <Route path="/quizzes" component={UserQuizzes} />
                  <br />
                  <br />
                  {/* <Route component={NotFound} /> */}
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
