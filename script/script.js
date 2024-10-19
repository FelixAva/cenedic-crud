import { Task } from "./taskClass.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
let taskCounter = 0;
let tasksList = [];

const createTask = (taskID, taskName) => {
  const task = new Task(taskID, taskName, deleteTask);

  taskCounter++;

  return task;
};

const deleteTask = (id) => {
  tasksList.map((task, index) => {
    if ( task.id === id ) {
      tasksList.splice(index, 1);
      console.log(tasksList)
    }
  })
  document.getElementById(id).remove();
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
});

saveButton.addEventListener('click', () => {
  storageTasks();
  storageTaskCounter();
  alert('State saved succesfully');
});

window.addEventListener('load', () => {
  getStoragedTasks();

  if (!tasksList) return tasksList = [];

  renderTasks();
  taskCounter = getTaskCounter();
});
