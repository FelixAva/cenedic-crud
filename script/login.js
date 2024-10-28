import { validUserToken, redirectToHome } from '../utils/userTokenValidation.js';

window.addEventListener('load', () => {
  if ( validUserToken() ) redirectToHome();
});
