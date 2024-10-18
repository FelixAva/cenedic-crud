export class Task {
  id;
  name;
  content = document.getElementById('content');
  task;

  constructor( id, name, deleteTask ) {
    this.id = id;
    this.name = name;
    this.task = this.createTaskContainer();

    this.createTaskId();
    this.createTaskName();
    this.createTaskDeleteButton(deleteTask);
    this.addDeleteIcon();
  }

  createTaskContainer = () => {
    const task = document.createElement('div');
    task.classList.add('task');

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

  createTaskDeleteButton = (deleteTask) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
      deleteTask(this.id);
    });
    this.task.appendChild(deleteButton);
  }

  addDeleteIcon = () => {
    const deleteIcon = document.createElement('span');
    deleteIcon.innerText = 'delete';

    deleteIcon.classList.add('material-symbols-outlined');
    this.task.appendChild(deleteIcon);
  }
}
