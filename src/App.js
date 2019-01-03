import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      taskList: []
    };

    this.openNewTask = this.openNewTask.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.checkCompletedTasks = this.checkCompletedTasks.bind(this);
    this.filterAllTasks = this.filterAllTasks.bind(this);
    this.filterCompletedTasks = this.filterCompletedTasks.bind(this);
    this.filterIncompletedTasks = this.filterIncompletedTasks.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  openNewTask(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });
  }

  createNewTask(e){
    e.preventDefault();

    if(e.target.task.value === ''){
        alert('Please type a new task');
    } else {
      this.setState({
        taskList: this.state.taskList.concat([{name: e.target.task.value, id: this.state.taskList.length + 1, completed: false, className: 'label--task'}])
      });
    }
    this.openNewTask(e);
  }

  checkCompletedTasks(taskId){
    let checkedTaskList = this.state.taskList.map(task => {
      if(task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    this.setState({
      taskList: checkedTaskList
    });
  }

  filterAllTasks() {
    let allTaskList = this.state.taskList.map(task => {
      task.className = 'label--task';
      return task;
    });

    this.setState({
      taskList: allTaskList
    });
  }

  filterCompletedTasks() {
    let completedTaskList = this.state.taskList.map(task => {
      task.className = (task.completed === true) ? 'label--task' : 'hide--task';
      return task;
    });
    
    this.setState({
      taskList: completedTaskList 
    });
  }

  filterIncompletedTasks() {
    let incompletedTaskList = this.state.taskList.map(task => {
      task.className = (task.completed === false) ? 'label--task' : 'hide--task';
      return task;
    });
  
    this.setState({
      taskList: incompletedTaskList 
    });
  }

  searchByName(e) {
    e.preventDefault();
    let query = e.target.value;

    let searchedTaskList = this.state.taskList.map(task => {
      task.className = (task.name.includes(query)) ? 'label--task' : 'hide--task';
      return task;
    });

    this.setState({
      taskList: searchedTaskList 
    });
  }

  render(){
    var today = new Date();
    console.log(this.state.taskList)
    return(
      <div className="todoapp--container">
        <div className="filters">
          <input onChange={this.searchByName} type="search" placeholder="Search" />
          <button onClick={this.filterAllTasks}>All tasks</button>
          <button onClick={this.filterCompletedTasks}>Complete</button>
          <button onClick={this.filterIncompletedTasks} >Incomplete</button>
          <button onClick={this.openNewTask}><i className="fas fa-plus"></i>New Task</button>
        </div>
        <div className="main">
          <div className="search-task">
            {this.state.open &&
            <form onSubmit={this.createNewTask}>
              <input className="main-search" type="text" name="task" placeholder="Task" />
              <input className="main-submit" type="submit" value="SAVE" />
            </form>}
          </div>
          <div className="dates">
            <h1>Today</h1>
            <p>{today.toDateString()}</p>
          </div>
          <div className="tasks">
            <h3>Tasks</h3>
            <ul>
              {this.state.taskList.map(task => {
                return(
                  <label className={task.className} key={task.id}>
                  <input type="checkbox" onClick={() => this.checkCompletedTasks(task.id)} />
                  <li>{task.name}</li>
                  </label>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
