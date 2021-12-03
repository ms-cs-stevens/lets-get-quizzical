import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useHistory } from "react-router";

const Leaderboard = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    history.push("/login");
  }
  return (
    <div className="homePage">
      <h1>Leaderboard for {currentUser && currentUser.displayName}</h1>
    </div>
  );
};

export default Leaderboard;
