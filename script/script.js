import { Task } from "./taskClass.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
let taskCounter = 0;
let tasksList = [];

const createTask = (id, taskName) => {
  const task = new Task(id, taskName, deleteTask);

  taskCounter++;

  return task;
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

const renderTasks = () => {
  tasksList.map(task => createTask(taskCounter, task.name));
}

const clearInput = () => taskInput.value = '';

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();
  tasksList.push(createTask(taskCounter, taskName));
  clearInput();
});

saveButton.addEventListener('click', () => storageTasks());

window.addEventListener('load', () => {
  getStoragedTasks();

  tasksList !== null
    ? renderTasks()
    : tasksList = []
  ;
});
