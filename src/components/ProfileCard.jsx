import React, { useContext, useEffect, useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import { AuthContext } from "../AuthProvider";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: "-webkit-fill-available",
    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
    alignContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
}));

export const ProfileCardDemo = React.memo(function ProfileCard({username}) {
  const styles = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
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
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} />
        <h3 className={styles.heading}>
        {/* {user ? user.firstName + " " + user.lastName : ""}
         */}
         {username}
        </h3>
      </CardContent>
      <Divider light />
      <Box display={"flex"} textAlign={"center"}>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Game Wins</p>
          <p className={styles.statValue}>12</p>
        </Box>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Highest Score</p>
          <p className={styles.statValue}>6941</p>
        </Box>
      </Box>
    </Card>
  );
});

export default ProfileCardDemo;
