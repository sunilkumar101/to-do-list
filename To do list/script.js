let tasksArray = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.querySelector("#tasks-counter");

console.log("working");

function addTaskToDom(task) {
  let li = document.createElement("li");
  li.innerHTML = ` <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } class="custom-checkbox">
<label for="${task.id}">${task.title}</label>
<img src="bin.png" alt="delete item" class="delete" data-id="${task.id}" >`;
  taskList.append(li);
}

function renderList() {
  console.log(tasksArray);
  taskList.innerHTML = "";
  for (let task of tasksArray) {
    addTaskToDom(task);
  }

  tasksCounter.innerHTML = tasksArray.length;
}
function toggleTask(taskId) {
  tasksArray.map((data) => {
    if (data.id == taskId) {
      data.completed = !data.completed;
    }
  });
  console.log(tasksArray);
  renderList();
  showNotification("Task toggled successfully");
}
function deleteTask(taskId) {
  let newTasksArray = tasksArray.filter((data) => {
    return data.id != taskId;
  });
  tasksArray = newTasksArray;
  renderList();
  showNotification("Task deleted successfully");
}
function addTask(task) {
  console.log(task);
  tasksArray.push(task);
  console.log(tasksArray);
  renderList();
  showNotification("Task added successfully");
}
function showNotification(title) {
  alert(title);
}

function handleInputKeyPress(event) {
  // console.log(event);
  if (event.key == "Enter") {
    const text = event.target.value;
    console.log(text);

    if (!text) {
      showNotification("Task text cannot be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now().toString(),
      completed: false,
    };

    event.target.value = "";
    addTask(task);
  }
}
function handleClickListener(e) {
  // console.log(e);
  let target = e.target;
  console.log(target);
  if (target.className == "delete") {
    let taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    let taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

async function fetchTodo() {
  // fetch('https://jsonplaceholder.typicode.com/todos').then((response)=>{
  //   console.log(response);
  //   return response.json();
  // }).then((res)=>{
  //     console.log(res);
  //     tasksArray=res.slice(0,10);
  //     renderList();
  // }).catch((error)=>{
  //     console.log('error ', error);
  // })

  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/todos");
    let data = await res.json();
    tasksArray = data.slice(0, 10);
    renderList();
  } catch (error) {
    console.log(error);
  }
}
function initializeTheApp() {
  fetchTodo();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);

  document.addEventListener("click", handleClickListener);
}

initializeTheApp();
