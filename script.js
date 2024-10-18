const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
let taskCounter = 0;

addButton.addEventListener('click', () => {
  const task = taskInput.value.toLowerCase();

  console.log(`
    ID: ${taskCounter}
    Task: ${task}
  `);

  taskCounter++;
});

