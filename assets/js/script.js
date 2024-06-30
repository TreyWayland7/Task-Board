// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));



// const addTaskButtonEl = document.querySelector('#addButton')
// const modalEl = document.querySelector('#modal')
// const modalEl = document.getElementById("modal");
const submitTaskButtonEl = document.getElementById("submitTaskButton");
const inputTaskTitleEl = document.getElementById("inputTaskTitle");
const inputDateEl = document.getElementById("inputDate");
const inpu1tContentEl = document.getElementById("inpu1tContent");
const formModalEl = document.getElementById("formModal");


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    document.body.appendChild(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    console.log(inputDateEl.value);
    console.log(inpu1tContentEl.value);
    

    $('#formModal').modal('hide');

    const task = {
        title : inputTaskTitleEl.value,
        date : inputDateEl.value,
        content: inpu1tContentEl.value
    };
    createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}
// addTaskButtonEl.addEventListener('click', handleAddTask);
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
});


formModalEl.addEventListener('submit', handleAddTask);
