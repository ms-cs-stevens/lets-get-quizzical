import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="homePage">
      <h1>
        {currentUser ? "Welcome to homepage" : "Please signin to continue"}
      </h1>
    </div>
  );
};

export default HomePage;
