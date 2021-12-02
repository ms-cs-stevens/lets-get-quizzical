import { atom } from "recoil";

const states = {
  currentUserState: atom({
    key: "currentUser", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
  }),

  themeModeState: atom({
    key: "theme",
    default: "dark",
  }),
};

export default states;
