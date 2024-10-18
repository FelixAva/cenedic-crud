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

    this.task.appendChild(id);
  }

  createTaskName = () => {
    const name = document.createElement('p');
    name.innerText = this.name;

    name.classList.add('taskName');
    this.task.appendChild(name);
  }
}
