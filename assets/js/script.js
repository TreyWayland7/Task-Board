const inputTaskTitleEl = $('#inputTaskTitle');
const inputDateEl = $('#inputDate');
const todoEl = $('#todo-cards');
const inpu1tContentEl = $('#inpu1tContent');
const formModalEl = $('#formModal');
const inProgressCardsEl = $('#in-progress-cards');
const todoContEl = $('#to-do');
const inprogressEl = $('#in-progress');
const doneEl = $('#done');
const doneCardsEl = $('#done-cards');
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
    const taskCard = $('<div>');
    taskCard.addClass('card');
    taskCard.addClass(taskBackgroundColor);
    taskCard.addClass('text-center');
    taskCard.draggable({
        snap: false,
        revert: true
    });
    taskCard.css( "zIndex", 2 );
    taskCard.attr("id", "task" + task.id);
    // div body
    const taskCardBody = $('<div>');
    taskCardBody.addClass('card-body');
    // card header
    const taskHeader = $('<h5>');
    taskHeader.addClass('card-title');
    taskHeader.addClass('h1');
    taskHeader.text(task.title);    
    // card content    
    const taskContent = $('<p>');
    taskContent.addClass('card-text');
    taskContent.text(task.content); 
    // card due date
    const taskDueDate = $('<p>');
    taskDueDate.text(dayjs(task.date).format('dddd, MMMM D YYYY'));
    // card delete button
    const buttonDeleteEl = $('<button>');
    buttonDeleteEl.addClass('btn');
    buttonDeleteEl.addClass('btn-primary');
    buttonDeleteEl.text("Delete"); 
    // append the card depending on its status
    if (task.status === "to-do"){
        todoEl.append(taskCard);
    }else if (task.status === "in-progress"){
        inProgressCardsEl.append(taskCard);
    }else if(task.status === "done"){
        doneCardsEl.append(taskCard);
    }
    // append the rest of the elements
    taskCard.append(taskCardBody);
    taskCardBody.append(taskHeader);
    taskCardBody.append(taskContent);
    taskCardBody.append(taskDueDate);
    taskCardBody.append(buttonDeleteEl);

    buttonDeleteEl.on('click', handleDeleteTask);
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
        title : inputTaskTitleEl.val(),
        date : inputDateEl.val(),
        content: inpu1tContentEl.val(),
        status: "to-do",
        id : generateTaskId()
    };
    // zero out old default values
    inputTaskTitleEl.val('');
    inputDateEl.val('');
    inpu1tContentEl.val('');
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
function handleDrop(event, ui) {
    if (this == todoContEl[0]){
        todoEl.append($(ui.draggable));
        $(ui.draggable).removeClass("taskBackgroundWhite");
    }else if (this == inprogressEl[0]){
        inProgressCardsEl.append($(ui.draggable));
        $(ui.draggable).removeClass("taskBackgroundWhite");

    }else if (this == doneEl[0]){
        doneCardsEl.append($(ui.draggable));
        $(ui.draggable).addClass("taskBackgroundWhite");
    }

    let data = $(ui.draggable)[0].id;
    let newStatus = this.id;

    for(let i=0; i<tasks.length; i++){
        if ("task" + tasks[i].id == data){
            tasks[i].status = newStatus;
        }
    }

    localStorage.setItem('tasks',JSON.stringify(tasks));
    return;
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
    formModalEl.on('submit', handleAddTask);

    todoContEl.droppable({
        drop: handleDrop
    });
    todoContEl.on('drop', handleDrop);

    inprogressEl.droppable({
        drop: handleDrop
    });
    inprogressEl.on("drop", handleDrop);

    doneEl.droppable({
        drop: handleDrop
    });
    doneEl.on('drop', handleDrop);

});
