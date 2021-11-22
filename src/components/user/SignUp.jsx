import { React } from "react";
import { Button, TextField } from "@material-ui/core";

export default function SignUp() {
  return (
    <>
      <div className="formStyle">
        <h2 className="heading">Sign Up</h2>
        <form>
          <TextField fullWidth label="Name"></TextField>
          <TextField fullWidth label="Email"></TextField>
          <TextField type="password" fullWidth label="Password"></TextField>
          <TextField
            type="password"
            fullWidth
            label="Confirm Password"
          ></TextField>
          <Button type="submit" color="primary" variant="contained">
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
