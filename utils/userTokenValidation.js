import { getFromLocalStorage } from "./localStorage.js";

export const validUserToken = () => {
  return Boolean( getFromLocalStorage('token') );
};

export const redirectToHome = () => {
  window.location.href = '/index.html';
}
