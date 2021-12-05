import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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

const theme = createTheme({
  h5: {
    fontFamily: ['Roboto Condensed'].join(','),
  },
  typography: {
    subtitle1: {
      color: '#333',
      fontSize: 12,
    },
    // fontFamily: ["Dancing Script", "cursive"].join(","),
    // fontFamily: ["Baloo Bhaijaan 2", "cursive"].join(","),
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
        <br />
        <br />
        <div className="App">
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={SignIn} />
              <Route path="/quiz" component={Questions} />
              {/* <Route path="/add_questions" component={AddQuestions} /> */}
              <Route path="/select-quiz-category" component={Categories} />
              <Route
                path="/select-learning-category"
                component={LearnCategories}
              />
              <Route path="/learn" component={Learn} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/user/account" component={Account} />
              <Route path="/how-to-play" component={Faqs} />
              <Route path="/:id/summary" component={Summary} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
