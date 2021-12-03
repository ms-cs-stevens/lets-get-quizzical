import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Questions from "./components/quiz/questions";
// import AddQuestions from "./components/quiz/AddQuestion";
import Categories from "./components/quiz/Categories";
import Account from "./components/user/Account";
import HomePage from "./components/HomePage";
import Faqs from "./components/faqs/Faqs_comp.js";
import { AuthProvider } from "./AuthProvider.jsx";
import Leaderboard from "./components/leaderboard/Leaderboard";

const App = () => {
  return (
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
              <Route path="/categories" component={Categories} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/user/account" component={Account} />
              <Route path="/faqs" component={Faqs} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
