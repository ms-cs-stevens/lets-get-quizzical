import { atom } from "recoil";

const states = {
  currentUserState: atom({
    key: "currentUser", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
  }),

  timerState: atom({
    key: "timer",
    default: true,
  }),

  currentCategoryState: atom({
    key: "currentCategory",
    default: undefined,
  }),
};

export default states;
