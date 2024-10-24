import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import app from './db-config.js';

const db = getFirestore(app);

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
