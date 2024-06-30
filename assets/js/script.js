// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));



// const addTaskButtonEl = document.querySelector('#addButton')
// const modalEl = document.querySelector('#modal')
// const modalEl = document.getElementById("modal");
const submitTaskButtonEl = document.getElementById("submitTaskButton");
const inputTaskTitleEl = document.getElementById("inputTaskTitle");
const inputDateEl = document.getElementById("inputDate");
const todoEl = document.getElementById("todo-cards");
const inpu1tContentEl = document.getElementById("inpu1tContent");
const formModalEl = document.getElementById("formModal");


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add('text-center');
    const taskCardBody = document.createElement('div');
    taskCardBody.classList.add('card-body');
    
    const taskHeader = document.createElement('h5');
    taskHeader.classList.add('card-title');
    taskHeader.classList.add('h1');

    taskHeader.innerText = task.title;    
    
    
    const taskContent = document.createElement('p');
    taskContent.classList.add('card-text');
    taskContent.innerText = task.content; 


    const taskDueDate = document.createElement('p');
    taskDueDate.classList.add('card-text');
    taskDueDate.innerText = task.date; 

    const buttonDeleteEl = document.createElement('button');
    buttonDeleteEl.classList.add('btn');
    buttonDeleteEl.classList.add('btn-primary');
    buttonDeleteEl.innerText = "Delete"; 
    
    todoEl.appendChild(taskCard);
    taskCard.appendChild(taskCardBody);
    taskCardBody.appendChild(taskHeader);
    taskCardBody.appendChild(taskContent);
    taskCardBody.appendChild(taskDueDate);
    taskCardBody.appendChild(buttonDeleteEl);


    buttonDeleteEl.addEventListener('click', handleDeleteTask);
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
    console.log(event.currentTarget.parentElement);
    event.currentTarget.parentElement.remove();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}
// addTaskButtonEl.addEventListener('click', handleAddTask);
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
});


formModalEl.addEventListener('submit', handleAddTask);
