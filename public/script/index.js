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
const saveButton = document.getElementById('saveButton');
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


saveButton.addEventListener('click', () => {
  if ( navigator.onLine ) {
    tasksList = tasksList.concat(localTasksList);
    localTasksList = [];

    storageUserTasksListToFirebase( userId, tasksList );
    storageUserTaskCounterToFirebase( userId, taskCount );
    storageLocalTasksListToLocalStorage();
    deleteUserTasks( userId, deletedTasks );

    deletedTasks = [];

    storageDeletedTasksToLocalStorage();
  } else {
    alert('You are in offline mode');
  }
});

addButton.addEventListener('click', () => {

  const taskName = taskInput.value.toLowerCase();
  if ( taskName.length === 0) return alert('Empty field');

  const task = createTask( taskCount, taskName );

  localTasksList.push( task );

  storageLocalTasksListToLocalStorage();

  taskCount++;

  storageTaskCountToLocalStorage();
  clearInput();
});


signOutButton.addEventListener('click', async() => {
  await userSignOut().then(() => {
    removeFromLocalStorage('userId');
    removeFromLocalStorage('tasksList');
    removeFromLocalStorage('localTasksList');
    removeFromLocalStorage('taskCount');
    removeFromLocalStorage('deletedTasks');
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
