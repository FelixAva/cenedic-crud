import { getFromLocalStorage } from "./localStorage.js";

export const validUserToken = () => {
  return Boolean( getFromLocalStorage('token') );
};
