import { Task } from "./taskClass.js";
import { validUserToken, redirectToLogin } from '../utils/userTokenValidation.js';
import { getFromLocalStorage } from "../utils/localStorage.js";
import { setUserTasksCounter, setUserTasksList } from "../api/store.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
let taskCounter = 0;
let tasksList = [];

window.addEventListener('load', () => {
  if ( !validUserToken() ) redirectToLogin();
});

const createTask = (taskID, taskName) => {
  const task = new Task(taskID, taskName, deleteTask);

  taskCounter++;

  return task;
};

const deleteTask = (id) => {
  tasksList.map((task, index) => {
    if ( task.id === id ) {
      tasksList.splice(index, 1);
    }
  });
  document.getElementById(id).remove();

  storageTasks();
  storageTaskCounter();
};

const storageTasks = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const storageTaskCounter = () => {
  localStorage.setItem('taskCounter', taskCounter);
};

const getStoragedTasks = () => {
  const auxList = localStorage.getItem('tasksList');
  tasksList = JSON.parse(auxList);
};

const renderTasks = () => {
  tasksList.map(task => createTask(task.id, task.name));
};

const getTaskCounter = () => {
  return localStorage.getItem('taskCounter');
};

const clearInput = () => taskInput.value = '';

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();

  tasksList.push(createTask(taskCounter, taskName));

  clearInput();
  storageTasks();
  storageTaskCounter();
});

saveButton.addEventListener('click', () => {
  const userUid = getFromLocalStorage('token');

  setUserTasksList(userUid, tasksList);
  setUserTasksCounter(userUid, taskCounter);
});

window.addEventListener('load', () => {
  getStoragedTasks();

  if (!tasksList) return tasksList = [];

  renderTasks();
  taskCounter = getTaskCounter();
});
