import { Task } from "./taskClass.js";
import { validUserId, redirectToLogin } from '../utils/userTokenValidation.js';
import { getFromLocalStorage, removeFromLocalStorage } from "../utils/localStorage.js";
import {
  getUserTasksFromFirebase,
  getUserTaskCountFromFirebase,
  storageUserTasksListToFirebase,
  deleteUserTasks,
  storageUserTaskCounterToFirebase
} from "../api/store.js";
import { userSignOut } from "../api/auth.js";

const userId = getFromLocalStorage('userId');

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const signOutButton = document.getElementById('signOutButton');

let taskCount = 0;
let tasksList = [];
let localTasksList = [];
let deletedTasks = [];

const createTask = ( taskId, taskName ) => {
  const task = new Task( taskId, taskName, deleteTask );
  return task;
};

const deleteTask = ( id ) => {
  localTasksList.map( ( task, index ) => {
    if ( task.id === id ) {
      return localTasksList.splice( index, 1 );
    }
  });
  tasksList.map( ( task, index ) => {
    if ( task.id === id ) {
      return tasksList.splice( index, 1 );
    }
  });
  document.getElementById(id).remove();
  deletedTasks.push(id);

  storageDeletedTasksToLocalStorage();
  storageLocalTasksListToLocalStorage();

  if ( navigator.onLine ) storageDeletedTasksToLocalStorage();

  deleteUserTasks( userId, deletedTasks );
  deletedTasks = [];

  storageDeletedTasksToLocalStorage();

  if ( navigator.online ) {
    storageUserTasksListToFirebase( userId, tasksList );
    storageUserTaskCounterToFirebase( userId, taskCount );
  }
};

const storageTasksListToLocalStorage = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const storageLocalTasksListToLocalStorage = () => {
  localStorage.setItem('localTasksList', JSON.stringify(localTasksList));
};

const storageTaskCountToLocalStorage = () => {
  localStorage.setItem('taskCount', taskCount);
};

const storageDeletedTasksToLocalStorage = () => {
  localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

const clearInput = () => taskInput.value = '';

const getTaskCounterFromLocalStorage = () => {
  return Number(localStorage.getItem('taskCount'));
};

const getLocalTasksListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('localTasksList'));
};

const renderTasksFromFirebase = () => {
  tasksList.map( task => createTask( task.id, task.name ) );
};

const renderTasksFromLocalStorage = () => {
  localTasksList.map( task => createTask( task.id, task.name ) );
};

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();
  if ( taskName.length === 0) return alert('Empty field');

  const task = createTask( taskCount, taskName );

  localTasksList.push( task );

  storageLocalTasksListToLocalStorage();

  taskCount++;

  storageTaskCountToLocalStorage();

  tasksList = tasksList.concat(localTasksList);

  if ( !navigator.onLine ) {
    return alert('Tarea guardada en local');
  }

  localTasksList = [];
  storageUserTasksListToFirebase( userId, tasksList );
  storageUserTaskCounterToFirebase( userId, taskCount );
  storageLocalTasksListToLocalStorage();
  clearInput();
});

window.addEventListener('online', () => {
  alert('You are online again');

  if ( localTasksList.length > 0 ) {
    tasksList = tasksList.concat(localTasksList);
    localTasksList = [];

    storageUserTasksListToFirebase( userId, tasksList );
    storageUserTaskCounterToFirebase( userId, taskCount );
    storageLocalTasksListToLocalStorage();
  }

  if ( deleteTask.length > 0 ) {
    storageUserTasksListToFirebase( userId, tasksList );
    storageUserTaskCounterToFirebase( userId, taskCount );
  }
});

window.addEventListener('offline', () => {
  alert('Your are using the offline mode')
});

signOutButton.addEventListener('click', async() => {
  await userSignOut().then(() => {
    localStorage.clear();
    // removeFromLocalStorage('userId');
    // removeFromLocalStorage('tasksList');
    // removeFromLocalStorage('localTasksList');
    // removeFromLocalStorage('taskCount');
    // removeFromLocalStorage('deletedTasks');
  });
});

window.addEventListener('load', async() => {
  if ( !validUserId() ) redirectToLogin();

  const list = await getUserTasksFromFirebase( userId ) || [];
  const count = await getUserTaskCountFromFirebase( userId ) | 0;
  const localList = getLocalTasksListFromLocalStorage() || [];
  const localCount = getTaskCounterFromLocalStorage() | 0;

  if ( list.length === 0 && localList.length === 0 ) console.log('No tasks');
  if ( list ) tasksList = list;
  if ( localList ) localTasksList = localList;

  taskCount = localCount > count
    ? localCount
    : count
  ;

  storageTasksListToLocalStorage();
  storageTaskCountToLocalStorage();
  renderTasksFromFirebase();
  renderTasksFromLocalStorage();
});
