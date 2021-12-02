import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Account from "./components/user/Account";
import Questions from "./components/quiz/questions";
import HomePage from "./components/HomePage";
import firebaseApp from "./firebase/firebaseApp";
import Faqs from "./components/faqs/Faqs_comp.js";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useRecoilState, useSetRecoilState } from "recoil";
import state from "./state/global";
import { amber, deepOrange, grey } from "@mui/material/colors";

const App = () => {
  const [loading, setLoading] = useState(true);
  const setCurrentUser = useSetRecoilState(state.currentUserState);
  const [themeMode, setThemeMode] = useRecoilState(state.themeModeState);

  const getDesignTokens = (themeMode) => ({
    palette: {
      themeMode,
      ...(themeMode === "light"
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
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
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          setThemeMode(themeMode === "dark" ? "light" : "dark");
        }}
        color="inherit"
      >
        {themeMode}
        {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Router>
        <div className="App">
          <Navigation />
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={SignIn} />
              <Route path="/quiz" component={Questions} />
              {/* <Route path="/add_questions" component={AddQuestions} /> */}
              {/* <Route path="/categories" component={Categories} /> */}
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
