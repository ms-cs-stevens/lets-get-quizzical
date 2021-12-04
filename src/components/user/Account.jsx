import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider.jsx";
import Card from "./StatsCard.jsx";
import ProfileCard from "./ProfileCard.jsx";
import EditUser from "./EditUser.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

import { Container, CssBaseline, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Account() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        setUser({
          firstName: currentUser.displayName.split(" ")[0],
          lastName: currentUser.displayName.split(" ")[1],
          email: currentUser.email,
        });
      }
    }
    fetchUser();
  }, [currentUser]);

  const updateUser = (user) => {
    setUser(user);
    setOpen(false);
  };

  if (user) {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <EditIcon
            onClick={() => setOpen(true)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "20%",
              top: "20%",
            }}
          />
          <ProfileCard firstName={user.firstName} lastName={user.lastName} />
          <br />
          <Card />
          <br />
          <Dialog
            maxWidth={"sm"}
            onClose={() => setOpen(false)}
            fullWidth={true}
            open={open}
            align="left"
          >
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                <EditUser user={user} updateUser={updateUser} />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    );
  } else {
    return "Loading";
  }
}

export default Account;
