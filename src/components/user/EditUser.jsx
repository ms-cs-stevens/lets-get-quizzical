import React from "react";
import { updateUserName } from "../../firebase/firebaseFunctions";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
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

const EditUser = ({ user, updateUser }) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    if (data.firstName !== user.firstName || data.lastName !== user.lastName) {
      try {
        await updateUserName(data);
        updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: user.email,
        });
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
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
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
              defaultValue={user.email}
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

  return (
    <>
      <Typography component="h1" variant="h5">
        {user ? user.firstName + " " + user.lastName : ""}
        's Profile
      </Typography>
      <br />
      {userDetails()}
      <br />
    </>
  );
};

export default EditUser;
