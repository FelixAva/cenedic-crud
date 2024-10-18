class Task {
  id;
  name;
  content = document.getElementById('content');

  constructor( id, name ) {
    this.id = id;
    this.name = name;
  }

  createTaskContainer = () => {
    const task = document.createElement('div');

    this.content.appendChild(task);
  }
}
