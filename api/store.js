import { getFirestore, doc, getDocs, getDoc, setDoc, updateDoc, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import app from './db-config.js';
import { saveToLocalStorage } from '../utils/localStorage.js';
import { redirectToHome } from "../utils/userTokenValidation.js";

const db = getFirestore(app);

export const createUser = async( userUid, email ) => {
  await setDoc(doc(db, 'users', userUid), {
    email: email
  }).then(() => {
    saveToLocalStorage('userId', userUid);
    redirectToHome();
  })
    .catch( ( error ) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      alert(errorMessage);
  });
}

export const storageUserTasksListToFirebase = (userId, taskList) => {
  try {
    const userRef = doc(db, "users", userId);
    const taskCollection = collection(userRef, "tasks");

    taskList.map( async( task ) => {
      const taskRef = doc(taskCollection, `${ task.id }`);

      await setDoc(taskRef, {
        id: task.id,
        name: task.name
      });
    });

    alert('Tasks saved succesfully!');
  } catch (error) {
    alert("Error añadiendo la tarea:", error);
  }
}

export const storageUserTaskCounterToFirebase = async ( userId, taskCount ) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      taskCount: taskCount
    });
  } catch( error ) {
    alert(error);
  }
};

export const getUserTasksFromFirebase = async( userId ) => {
  const userRef = doc(db, 'users', userId);
  const tasksRef = collection(userRef, 'tasks');
  const tasksSnap = await getDocs(tasksRef);
  const list = tasksSnap.docs.map(doc => (
    doc.data()
  ));

  return list;
}

export const deleteUserTasks = ( userId, deletedTasks ) => {
  try {
    const userRef = doc(db, 'users', userId);
    const taskCollection = collection(userRef, 'tasks');

    deletedTasks.map( async id => {
      const tasksRef = doc(taskCollection, `${ id }`);
      await deleteDoc(tasksRef);
    })

  } catch ( error ) {
    alert(error);
  }
}

export const getUserTaskCountFromFirebase = async ( userId ) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  return userSnap.data().taskCount;
}
