const submitTaskButtonEl = document.getElementById("submitTaskButton");
const inputTaskTitleEl = document.getElementById("inputTaskTitle");
const inputDateEl = document.getElementById("inputDate");
const todoEl = document.getElementById("todo-cards");
const inpu1tContentEl = document.getElementById("inpu1tContent");
const formModalEl = document.getElementById("formModal");
const inProgressCardsEl = document.getElementById("in-progress-cards");
const todoContEl = document.getElementById("to-do");
const inprogressEl = document.getElementById("in-progress");
const doneEl = document.getElementById("done");
const doneCardsEl = document.getElementById("done-cards");
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let storedTasks = JSON.parse(localStorage.getItem('tasks'));
let storedId = parseInt(JSON.parse(localStorage.getItem('nextId')))  
let currentId = 0;
let tasks = [];

if (storedId > 0){
    currentId = storedId
}

// generates a unquie ID
function generateTaskId() {
    currentId += 1;
    return currentId;
}

// helper function to return background class givin a task
function getTaskBackgroundColor(task){
    const taskDate = task.date;
    const todayDate = dayjs();
    const dateDiff = todayDate.diff(taskDate, 'day');

    if (dateDiff > 0 && task.status != "done"){
        return "taskBackgroundRed";
    }else if(dateDiff <= 0 && dateDiff >= -7 && task.status != "done"){
        return "taskBackgroundYellow";
    }else{
        return "taskBackgroundWhite";
    }
}

// creates html for a new task card
function createTaskCard(task) {
    const taskBackgroundColor = getTaskBackgroundColor(task);
    // div container
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add(taskBackgroundColor);
    taskCard.classList.add('text-center');
    taskCard.setAttribute("draggable", "true");
    taskCard.setAttribute("id", "task" + task.id);
    // div body
    const taskCardBody = document.createElement('div');
    taskCardBody.classList.add('card-body');
    // card header
    const taskHeader = document.createElement('h5');
    taskHeader.classList.add('card-title');
    taskHeader.classList.add('h1');
    taskHeader.innerText = task.title;    
    // card content    
    const taskContent = document.createElement('p');
    taskContent.classList.add('card-text');
    taskContent.innerText = task.content; 
    // card due date
    const taskDueDate = document.createElement('p');
    taskDueDate.classList.add('card-text');
    taskDueDate.innerText = dayjs(task.date).format('dddd, MMMM D YYYY');
    // card delete button
    const buttonDeleteEl = document.createElement('button');
    buttonDeleteEl.classList.add('btn');
    buttonDeleteEl.classList.add('btn-primary');
    buttonDeleteEl.innerText = "Delete"; 
    // append the card depending on its status
    if (task.status === "to-do"){
        todoEl.appendChild(taskCard);
    }else if (task.status === "in-progress"){
        inProgressCardsEl.appendChild(taskCard);
    }else if(task.status === "done"){
        doneCardsEl.appendChild(taskCard);
    }
    // append the rest of the elements
    taskCard.appendChild(taskCardBody);
    taskCardBody.appendChild(taskHeader);
    taskCardBody.appendChild(taskContent);
    taskCardBody.appendChild(taskDueDate);
    taskCardBody.appendChild(buttonDeleteEl);
    buttonDeleteEl.addEventListener('click', handleDeleteTask);
}

// renders the task list on reloads
function renderTaskList() {
    if (storedTasks != null){
        for(let i=0; i<storedTasks.length; i++){
            currentTask = storedTasks[i];
            tasks.push(currentTask);
            createTaskCard(currentTask);
        }
    }
}   

// adds a new task
function handleAddTask(event){
    event.preventDefault();
    // hide the form modal
    $('#formModal').modal('hide');
    // create new task object
    const task = {
        title : inputTaskTitleEl.value,
        date : inputDateEl.value,
        content: inpu1tContentEl.value,
        status: "to-do",
        id : generateTaskId()
    };
    // zero out old default values
    inputTaskTitleEl.value = "";
    inputDateEl.value = "";
    inpu1tContentEl.value = "";
    // push new task to list
    tasks.push(task);
    // save to local storage
    localStorage.setItem('tasks',JSON.stringify(tasks));
    localStorage.setItem('nextId',JSON.stringify(currentId));
    // create html for the new task
    createTaskCard(task);
}

// deletes task from dom and local storage
function handleDeleteTask(event){
    let elementId = event.currentTarget.parentElement.parentElement.id;
    elementId = elementId.split("task")[1];
    // delete task in html
    event.currentTarget.parentElement.parentElement.remove();
    // delete task in local storage
    for(let i=0; i< tasks.length; i++){
        if(tasks[i].id == elementId){
            tasks.splice(i, 1, );
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// hanlds the drop task feature
function handleDrop(event) {
    event.preventDefault();
    // append task to new bucket
    var data = event.dataTransfer.getData("html");
    const droppedTaskEl = document.getElementById(data);
    event.currentTarget.children[1].children[0].appendChild(droppedTaskEl)
   // change status of task
    const newStatus = event.currentTarget.id;
    for(let i=0; i<tasks.length; i++){
        if ("task" + tasks[i].id == data){
            tasks[i].status = newStatus;
        }
        if (tasks[i].status == "done"){
            droppedTaskEl.classList.add("taskBackgroundWhite");
        }else{
            try {
                droppedTaskEl.classList.remove("taskBackgroundWhite");
            } catch (error) {
                console.log(error);
            }
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// adds a white background to done tasks
function taskDone(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("html");
    const droppedTaskEl = document.getElementById(data);
    droppedTaskEl.classList.add("taskBackgroundWhite");
}

$(document).ready(function () {
    renderTaskList();
    formModalEl.addEventListener('submit', handleAddTask);
    todoContEl.addEventListener('drop', handleDrop);
    inprogressEl.addEventListener('drop', handleDrop);
    doneEl.addEventListener('drop', handleDrop);
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
    document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("html", event.target.id);
});
