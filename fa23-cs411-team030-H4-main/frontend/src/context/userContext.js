import { useAAContext } from "./Context";

export const loginUser = (userData, setUser) => {
  setUser(userData);
};

export const signoutUser = (setUser) => {
  setUser(null);
};
