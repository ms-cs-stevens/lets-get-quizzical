import { React } from "react";
import { Button, TextField } from "@material-ui/core";

export default function SignIn() {
  return (
    <>
      <div className="formStyle">
        <h2 className="heading">Sign In</h2>
        <form>
          <TextField fullWidth label="Email"></TextField>
          <TextField type="password" fullWidth label="Password"></TextField>
          <Button type="submit" color="primary" variant="contained">
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
}
