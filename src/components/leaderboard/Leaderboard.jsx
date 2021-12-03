import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";

const Leaderboard = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return <div>Leaderboard for {currentUser && currentUser.displayName}</div>;
};

export default Leaderboard;
