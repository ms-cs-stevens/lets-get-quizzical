import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../src/components/user/SignUp";
import SignIn from "../src/components/user/SignIn";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/signup" component={Signup} />
          <Route path="/SignIn" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
