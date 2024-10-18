import { Task } from "./taskClass.js";

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
let taskCounter = 0;
let tasksList = [];

const deleteTask = (id) => {
  console.log('Removed ', id);
}

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.toLowerCase();

  new Task(taskCounter, taskName, deleteTask);

  taskCounter++;
});
