import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { createUserWithEmailPass } from "../../firebase/firebaseFunctions";
import banner from "../../images/sign-in-page.jpg";
import { useForm, Controller } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../../AuthProvider";
import {
  PURPLE_COLOR,
  LIGHT_PURPLE_COLOR,
  WHITE_COLOR,
} from "../../variables/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: PURPLE_COLOR,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  warningStyles: {
    "& .MuiFormLabel-root.Mui-error": {
      color: "#e72400 !important",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#e72400 !important",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#e72400 !important",
    },
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  const [addlError, setAddlError] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { handleSubmit, control } = useForm();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/;

  const handleSignUp = async (values) => {
    try {
      const { firstName, lastName, email, password, passwordConfirmation } =
        values;

      if (!emailRegex.test(email)) {
        throw new Error("Email is Invalid!");
      }
      if (password.length < 8) {
        throw new Error("Passwords should be atleast 8 characters");
      }
      if (password !== passwordConfirmation) {
        throw new Error("Passwords did not match!");
      }

      await createUserWithEmailPass(email, password, firstName, lastName);
      history.push("/");
    } catch (error) {
      setAddlError(error.message);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <CssBaseline />
        <div className={classes.paper}>
          <br />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <br />
          <span className={classes.error}>{addlError && addlError}</span>
          <form className={classes.form} onSubmit={handleSubmit(handleSignUp)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="First Name"
                      id="firstName"
                      variant="outlined"
                      className={error ? classes.warningStyles : null}
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "First name is required" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Last Name"
                      id="lastName"
                      variant="outlined"
                      className={error ? classes.warningStyles : null}
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Last name is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Email"
                      id="email"
                      variant="outlined"
                      className={error ? classes.warningStyles : null}
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Email is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      className={error ? classes.warningStyles : null}
                      value={value}
                      fullWidth
                      type="password"
                      id="password"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Password is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Password Confirmation"
                      variant="outlined"
                      className={error ? classes.warningStyles : null}
                      value={value}
                      fullWidth
                      type="password"
                      id="passwordConfirmation"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Password confirmation is required" }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                border: "1px solid",
                background: LIGHT_PURPLE_COLOR,
                color: WHITE_COLOR,
                boxShadow: "none",
              }}
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-start">
              <Grid item>
                <Link href="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
