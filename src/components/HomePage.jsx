import state from "../state/global";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const currentUser = useRecoilValue(state.currentUserState);
  console.log(currentUser);
  return (
    <div className="homePage">
      <h1>
        {currentUser ? "Welcome to homepage" : "Please signin to continue"}
      </h1>
    </div>
  );
};

export default HomePage;
