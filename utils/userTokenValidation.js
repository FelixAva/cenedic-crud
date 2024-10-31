import { getFromLocalStorage } from "./localStorage.js";

export const validUserId = () => {
  return Boolean( getFromLocalStorage('userId') );
};

export const redirectToHome = () => {
  window.location.href = '/index.html';
}

export const redirectToLogin = () => {
  window.location.href = '/login.html';
}
