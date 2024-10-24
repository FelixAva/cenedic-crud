import { signUp } from "../api/auth.js";

const emailInput = document.getElementById('email')
const pwdInput = document.getElementById('pwd')
const confirmPwdInput = document.getElementById('cpwd')
const registerBtn = document.getElementById('button');

registerBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const pwd = pwdInput.value;
  const cPwd = confirmPwdInput.value;

  if ( pwd === cPwd ) return signUp(email, pwd);

  alert('Password must be equal');
});
