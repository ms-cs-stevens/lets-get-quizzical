import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider.jsx";
import Card from "./StatsCard.jsx";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard.jsx";
import EditUser from "./EditUser.jsx";
import Dialog from "@mui/material/Dialog";
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
      <div className={classes.paper}>
        <Container component="main" maxWidth="md">
          <EditIcon
            onClick={() => setOpen(true)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "20%",
              top: "20%",
            }}
          />
          <Grid container>
            <Grid item xs={12}>
              <ProfileCard
                firstName={user.firstName}
                lastName={user.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <br />
              <Card />
            </Grid>
          </Grid>

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
        </Container>
      </div>
    );
  } else {
    return "Loading";
  }
}

export default Account;
