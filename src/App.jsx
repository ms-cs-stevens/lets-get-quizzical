import "./App.css";
import { useEffect, useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, purple, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Questions from "./components/quiz/questions";
import Account from "./components/user/Account";
import HomePage from "./components/HomePage";
import firebaseApp from "./firebase/firebaseApp";
import Faqs from "./components/faqs/Faqs_comp.js";

import { useSetRecoilState } from "recoil";
import state from "./state/global";

const App = () => {
  const [loading, setLoading] = useState(true);
  const setCurrentUser = useSetRecoilState(state.currentUserState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          ...{
            // palette values for dark mode
            primary: purple,
            divider: purple[700],
            background: {
              default: "#362b6b", //purple[900],
              paper: purple[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          },
        },
      }),
    []
  );

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default App;
