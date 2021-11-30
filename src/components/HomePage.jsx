import state from "../state/global";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const currentUser = useRecoilValue(state.currentUserState);
  console.log(currentUser);
  if (currentUser) {
    return "Welcome to homepage";
  } else {
    return "please signin";
  }
};

export default HomePage;
