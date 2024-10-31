import { signIn } from '../api/auth.js';
import { saveToLocalStorage } from '../utils/localStorage.js';
import { validUserId, redirectToHome } from '../utils/userTokenValidation.js';

const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('pwd');
const loginBtn = document.getElementById('button');

window.addEventListener('load', () => {
  if ( validUserId() ) redirectToHome();
});

loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const pwd = pwdInput.value;

  if ( pwd.length === 0 || email.length === 0 ) return alert("Invalid credentials");

  signIn( email, pwd )
    .then(( userUid ) => {
      saveToLocalStorage('userId', userUid);
    }
  );
});
