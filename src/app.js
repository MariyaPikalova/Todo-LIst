const filterTask = document.querySelector('#filter');
const sortTask = document.getElementById('sort-task');
const addTask = document.getElementById('addTask');
const sortDate = document.getElementById('sort-dates');


class TaskList
{
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('TASKS'));
    this.showTasks = JSON.parse(localStorage.getItem('TASKS'));
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
    filterTask.addEventListener('keyup', this.filterTasks);
    sortTask.addEventListener('click', () => {
        this.sortTasks();
    });
    sortDate.addEventListener('click', () => {
      this.sortDates();
    })
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
    console.log(jsonTask);
    let filterTask = jsonTask.filter(function (el, task) {
      return  (el.task.toLowerCase().indexOf(searchStr) !== -1) ? task.style.display = 'block' :   task.style.display = 'none';
    })
    console.log(filterTask);
    this.tasks.push(filterTask);
    this.loadTasks()
  }


  sortTasks(){
    let sortedTask = JSON.parse(localStorage.getItem('TASKS'));
    sortedTask.sort(function (taskObjectOne, taskObjectTwo) {
      return taskObjectOne.task.localeCompare(taskObjectTwo.task);
    });
    let tasksLoad = sortedTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }



  sortDates(){
    let sortedDates = JSON.parse(localStorage.getItem('TASKS'));
    sortedDates.sort(function (taskObjectOne, taskObjectTwo) {
      return new Date(taskObjectOne.date).getTime() - new Date(taskObjectTwo.date).getTime();
    });
    // console.log(sortedDates);
    let tasksLoad = sortedDates.reduce((html, task, index) => html += this.renderTask(task, index), '');
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