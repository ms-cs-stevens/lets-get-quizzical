import * as React from "react";
import { useRecoilValue } from "recoil";
import state from "../../state/global";

export const Leaderboard = () => {
  const currentUser = useRecoilValue(state.currentUserState);
  return <div>Leaderboard for {currentUser.firstName}</div>;
};
