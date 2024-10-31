import { getFirestore, doc, getDoc, setDoc, updateDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import app from './db-config.js';
import { saveToLocalStorage } from '../utils/localStorage.js';

const db = getFirestore(app);

export const createUser = async( userUid, email ) => {
  await setDoc(doc(db, 'users', userUid), {
    email: email
  }).then(() => {
    saveToLocalStorage('token', userUid);
  })
    .catch( ( error ) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      alert(errorMessage);
  });
}

export const setUserTasksList = (userId, taskList) => {
  try {
    const userRef = doc(db, "users", userId);
    const taskCollection = collection(userRef, "tasks");

    taskList.map( async( task ) => {
      const taskRef = doc(taskCollection, `${ task.id }`);

      await setDoc(taskRef, {
        name: task.name
      });
    });

    alert('Tasks saved succesfully!');
  } catch (error) {
    alert("Error añadiendo la tarea:", error);
  }
}

export const setUserTasksCounter = async ( userId, tasksCounter ) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      tasksCounter: Number(tasksCounter)
    });
  } catch( error ) {
    alert(error);
  }
};

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
