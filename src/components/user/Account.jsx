import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";
// import { updateUserName } from "../../firebase/firebaseFunctions";
import { useForm, Controller } from "react-hook-form";
import Card from "../StatsCard";
import ProfileCard from "../ProfileCard";

import {
  Avatar,
  Button,
  TextField,
  Container,
  CssBaseline,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { useRecoilValue } from "recoil";
import state from "../../state/global";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: deepPurple[800],
    fontSize: "3em",
    width: theme.spacing(15),
    height: theme.spacing(15),
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

function Account() {
  const classes = useStyles();
  const currentUser = useRecoilValue(state.currentUserState);
  const [user, setUser] = useState(null);
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        setUser(user);
      }
    }
    fetchUser();
  }, [currentUser]);

  const onSubmit = async (data) => {
    if (
      data.firstName !== currentUser.firstName ||
      data.lastName !== currentUser.lastName
    ) {
      try {
        // setUser(updatedUser);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const userDetails = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue={currentUser.firstName}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="First Name"
                  id="firstName"
                  variant="outlined"
                  value={value}
                  className={error ? classes.warningStyles : null}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "First name required" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue={currentUser.lastName}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Last Name"
                  id="lastName"
                  variant="outlined"
                  value={value}
                  className={error ? classes.warningStyles : null}
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Last name required" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText={"Email is not editable."}
              fullWidth
              id="email"
              InputProps={{
                readOnly: true,
              }}
              label="Email"
              name="email"
              defaultValue={currentUser.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update profile
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  if (currentUser) {
    return (
      <Container component="main" maxWidth="md">
        <Helmet>
          <title>{currentUser.firstName} | My Account</title>
        </Helmet>
        <CssBaseline />
        <div className={classes.paper}>
        <ProfileCard></ProfileCard>
        <br />
        <Card></Card>
          <Avatar
            alt={currentUser.firstName}
            src={currentUser.profileImage}
            className={classes.avatar}
          >
            {currentUser.firstName[0] + currentUser.lastName[0]}
          </Avatar>
          <br />
          <Typography component="h1" variant="h5">
            {currentUser
              ? currentUser.firstName + " " + currentUser.lastName
              : ""}
          </Typography>
          <br />
          {userDetails()}
          <Button className="btn-right-margin">
            <NavLink exact to="/user/change-password" activeClassName="active">
              Change password
            </NavLink>
          </Button>
          <br />
        </div>
      </Container>
    );
  } else {
    return "Loading";
  }
}

export default Account;
