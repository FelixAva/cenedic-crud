import { signUp } from '../api/auth.js';
import { createUser } from '../api/store.js';
import { validUserId, redirectToHome } from '../utils/userTokenValidation.js';

const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('pwd');
const confirmPwdInput = document.getElementById('cpwd');
const registerBtn = document.getElementById('button');

window.addEventListener('load', () => {
  if ( validUserId() ) redirectToHome();
});

const clearInputs = () => {
  emailInput.value = '';
  pwdInput.value = '';
  confirmPwdInput.value = '';
};

registerBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const pwd = pwdInput.value;
  const cPwd = confirmPwdInput.value;

  if ( pwd.length === 0 || email.length === 0 || cPwd.length === 0) return alert('Invalid credentials');

  if ( pwd === cPwd ) {
    return signUp( email, pwd )
      .then(( userUid ) => {
        createUser( userUid, email );
      })
      .finally( clearInputs );
  };

  alert('Passwords must be equal');
});
