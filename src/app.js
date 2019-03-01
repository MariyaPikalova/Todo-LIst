const filterTask = document.querySelector('#filter');
const sortTaskAz = document.getElementById('sort-task-az');
const sortTaskZa = document.getElementById('sort-task-za');
const addTask = document.getElementById('addTask');
const sortDate09 = document.getElementById('sort-dates-09');
const sortDate90 = document.getElementById('sort-dates-90');
const filterDate = document.getElementById('start-date');
let filteredTask = [];


class TaskList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('TASKS'));
    if (!this.tasks) {
      this.tasks = [
        {task: 'TASK1', date: '2019-02-01', isComplete: false},
        {task: 'TASK2', date: '2019-02-02', isComplete: true}
      ];
    }
    this.loadTasks();
    this.addEventListeners();
  }

  addEventListeners() {
    addTask.addEventListener('keypress', (event) => {
      if (event.key === 13) {
        this.addTask(event.target.value);
        event.target.value = '';
      }
    });

    sortTaskAz.addEventListener('click', () => {
        this.sortTasksAz();
    });
    sortTaskZa.addEventListener('click', () => {
      this.sortTasksZa();
    });
    sortDate09.addEventListener('click', () => {
      this.sortDates09();
    });
    sortDate90.addEventListener('click', () => {
      this.sortDates90();
    });
    filterTask.addEventListener('keyup',  this.filterTasks.bind(this), false);
    filterDate.addEventListener('change', this.filterDates.bind(this), false);
  }


  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }

  deleteTask(event, index) {
    event.preventDefault();
    this.tasks.splice(index, 1);
    this.loadTasks();
  }

  addTaskClick() {
    let target = document.getElementById('addTask');
    let dtarget = document.getElementById('start');
    this.addTasks(target.value, dtarget.value);
    target.value = "";
    dtarget.value = "";
  }

  addTasks(task, date) {
    let newTask = {
      task,
      date,
      isComplete: false
    };
    let parentDiv = document.getElementById('start').parentElement;
    let parentDiv1 = document.getElementById('addTask').parentElement;
    if (task === '') {
      parentDiv.classList.add('has-error');
      parentDiv1.classList.add('has-error');
    } else {
      parentDiv.classList.remove('has-error');
      parentDiv1.classList.remove('has-error');
      this.tasks.push(newTask);
      console.log(this.tasks);
      this.loadTasks();
    }
  }

  filterTasks(e) {
    const searchStr = e.target.value.toLowerCase();
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
       filteredTask = jsonTask.filter(function (el) {
      return (el.task.toLowerCase().indexOf(searchStr) !== -1);
    });
     let filterLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = filterLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }
  filterDates(e){
    const searchDate = e.target.value;
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
    console.log(searchDate);
    filteredTask = jsonTask.filter(function (el) {
      return el.date.indexOf(searchDate) !== -1;
    });
    let filterLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = filterLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }

  sortTasksAz(){
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
    filteredTask =jsonTask.sort(function (taskObjectOne, taskObjectTwo) {
      return taskObjectOne.task.localeCompare(taskObjectTwo.task);
    });
    let tasksLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }
  sortTasksZa(){
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
    filteredTask = jsonTask.sort(function (taskObjectOne, taskObjectTwo) {
      return taskObjectTwo.task.localeCompare(taskObjectOne.task);
    });
    let tasksLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }

  sortDates09(){
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
    filteredTask = jsonTask.sort(function (taskObjectOne, taskObjectTwo) {
      return new Date(taskObjectOne.date).getTime() - new Date(taskObjectTwo.date).getTime();
    });
    let tasksLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }
  sortDates90(){
    let jsonTask = JSON.parse(localStorage.getItem('TASKS'));
    filteredTask = jsonTask.sort(function (taskObjectOne, taskObjectTwo) {
      return new Date(taskObjectTwo.date).getTime() - new Date(taskObjectOne.date).getTime();
    });
    let tasksLoad = filteredTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }


  renderTask(task,index) {
    return`
      <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label>
            <input type="checkbox" 
                   onchange="toDo.toggleTaskStatus(${index})" 
                   value="" 
                   class="" ${task.isComplete ? 'checked' : ''}>
            </label>
          </div>
          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text 
               ${task.isComplete ? 'complete' : ''}">
            <p>${task.task} ${task.date}</p>
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/" 
               onClick="toDo.deleteTask(event, ${index})">
            <i id="deleteTask" 
               data-id="${index}" 
               class="delete-icon glyphicon glyphicon-trash"></i>
            </a>
          </div>
        </div>
      </li>
    `;
  }

  loadTasks() {
    let tasksLoad = this.tasks.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }
}


let toDo;
window.addEventListener('load', () => {
  toDo = new TaskList();
});