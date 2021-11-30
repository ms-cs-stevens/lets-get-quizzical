import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Questions from "./components/quiz/questions";
import Account from "./components/user/Account";
import HomePage from "./components/HomePage";
import firebaseApp from "./firebase/firebaseApp";
import Faqs from './components/faqs/Faqs_comp.js';

import { useSetRecoilState } from "recoil";
import state from "./state/global";

const App = () => {
  const [loading, setLoading] = useState(true);
  const setCurrentUser = useSetRecoilState(state.currentUserState);

  // authentication and setting up current user
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
        });
      }
      setLoading(false);
    });
  }, [setCurrentUser]);

  if (loading) {
    return "";
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="App-body">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={SignIn} />
            <Route path="/quiz" component={Questions} />
            <Route path="/user/account" component={Account} />
            <Route path="/faqs" component={Faqs} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
