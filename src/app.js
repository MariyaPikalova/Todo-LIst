const filter_task = document.querySelector('#filter');
const sort_task = document.getElementById('sort-task');
const add_task = document.getElementById('addTask')


class TaskList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('TASKS'));
    if (!this.tasks) {
      this.tasks = [
        {task: 'TASK1', date: '20-02-2019', isComplete: false},
        {task: 'TASK2', date: '20-02-2019', isComplete: true}
      ];
    }
    this.loadTasks();
    this.addEventListeners();
  }

  addEventListeners() {
    add_task.addEventListener('keypress', (event) => {
      if (event.key === 13) {
        this.addTask(event.target.value);
        event.target.value = '';
      }
    });
    filter_task.addEventListener('keyup', this.filterTasks);
    sort_task.addEventListener('click', () => {
      this.sortTask();
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
    this.addTask(target.value, dtarget.value);
    target.value = "";
    dtarget.value = "";
  }

  addTask(task, date) {
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
      this.loadTasks();
    }

  }

  filterTasks(e) {
    const searchStr = e.target.value.toLowerCase();
    let totalFiltered = 0;
    document.querySelectorAll('.list-group-item ').forEach(function (task) {
      const item = task.textContent;
      if (item.toLowerCase().indexOf(searchStr) !== -1) {
        task.style.display = 'block';
        totalFiltered++;
      } else {
        task.style.display = 'none';
      }
    });
  }

  sortTask(){
    let sortedTask = JSON.parse(localStorage.getItem('TASKS'));
    sortedTask.sort(function (taskObjectOne, taskObjectTwo) {
      return taskObjectOne.task.localeCompare(taskObjectTwo.task);
    });
    // console.log(sortedTask);
    let tasksLoad = sortedTask.reduce((html, task, index) => html += this.renderTask(task, index), '');
    // console.log(tasksLoad);
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }


  renderTask(task, index) {
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
    console.log(tasksLoad);
    document.getElementById('taskList').innerHTML = tasksLoad;
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
  }
}

let toDo;
window.addEventListener('load', () => {
  toDo = new TaskList();
});