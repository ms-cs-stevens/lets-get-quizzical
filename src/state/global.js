import { atom } from "recoil";

const states = {
  currentUser: atom({
    key: "currentUser", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
  }),

  ranking: atom({
    key: "ranking",
    default: undefined,
  }),
};

export default states;
