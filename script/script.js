import { Task } from "./taskClass.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
let taskCounter = 0;
let tasksList = [];

const createTask = (taskName) => {
  return new Task(taskCounter, taskName, deleteTask);
};

const deleteTask = (id) => {
  tasksList.splice(id, 1);
  document.getElementById(id).remove();
};

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();

  tasksList.push(createTask(taskName));

  taskCounter++;
});
