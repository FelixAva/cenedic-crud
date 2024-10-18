import { Task } from "./taskClass.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
let taskCounter = 0;
let tasksList = [];

const createTask = (taskName) => {
  return new Task(taskCounter, taskName, deleteTask);
};

const deleteTask = (id) => {
  tasksList.splice(id, 1);
  document.getElementById(id).remove();
};

const storageTasks = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const getStoragedTasks = () => {
  const auxList = localStorage.getItem('tasksList');
  tasksList = JSON.parse(auxList);
};

const clearInput = () => taskInput.value = '';

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();

  tasksList.push(createTask(taskName));
  clearInput();

  taskCounter++;
});

saveButton.addEventListener('click', storageTasks);

window.addEventListener('load', () => {
  getStoragedTasks();
});
