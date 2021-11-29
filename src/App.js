import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../src/components/user/SignUp";
import SignIn from "../src/components/user/SignIn";
import Questions from "./components/quiz/questions";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={SignIn} />
          <Route path="/quiz" component={Questions} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
