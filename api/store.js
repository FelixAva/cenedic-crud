import { getFirestore, doc, getDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import app from './db-config.js';
import { saveToLocalStorage } from '../utils/localStorage.js';

const db = getFirestore(app);

export const createUser = async( userUid, email ) => {
  await setDoc(doc(db, 'users', userUid), {
    email: email
  }).then(() => {
    saveToLocalStorage('userUID', userUid);
    alert('User created succesfully!');
  })
    .catch( ( error ) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      alert(errorMessage);
  });
}

// export async function getUsers() {
//   const userRef = doc(db, 'users', '4Fjb6mKvwA8jnG8Fa43i');
//   const userSnap = await getDoc(userRef);
//   if (userSnap.exists()) console.log(userSnap.data())
// }

// export default async function getUserTasks() {
//   const userRef = doc(db, 'users', '4Fjb6mKvwA8jnG8Fa43i');
//   const tasksRef = collection(userRef, 'tasks');

//   const tasksSnap = await getDocs(tasksRef);
//   const list = tasksSnap.docs.map(doc => (
//     doc.data()
//   ));
//   console.log(list);
// }
