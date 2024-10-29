import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import app from "../api/db-config.js";

const auth = getAuth();

export const signUp = async(email, password) => {
  let userUid;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed Up
      const user = userCredential.user;
      userUid = user.uid;

      alert('User registered succesfully!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      alert(errorMessage);
    }
  );

  return userUid;
}

export const signIn = async(email, password) => {
  let userUid;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userUid = user.uid;

      alert('User logged succesfully!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    }
  );

  return userUid;
}
