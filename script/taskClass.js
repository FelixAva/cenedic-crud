class Task {
  id;
  name;
  content = document.getElementById('content');
  task;

  constructor( id, name ) {
    this.id = id;
    this.name = name;
    this.task = this.createTaskContainer();
  }

  createTaskContainer = () => {
    const task = document.createElement('div');

    this.content.appendChild(task);

    return task;
  }

  createTaskId = () => {
    const id = document.createElement('p');
    id.innerText = this.id;

    id.classList.add('taskId');
    this.task.appendChild(id);
  }

  createTaskName = () => {
    const name = document.createElement('p');
    name.innerText = this.name;

    name.classList.add('taskName');
    this.task.appendChild(name);
  }

  createTaskDeleteButton = () => {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    deleteButton.classList.add('deleteButton');
    this.task.appendChild(deleteButton);
  }

  addDeleteIcon = () => {
    const deleteIcon = document.createElement('span');
    deleteIcon.innerText = 'delete';

    deleteIcon.classList.add('material-symbols-outlined');
    this.task.appendChild(deleteIcon);
  }
}
