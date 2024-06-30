// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

let currentId = 0;



// const addTaskButtonEl = document.querySelector('#addButton')
// const modalEl = document.querySelector('#modal')
// const modalEl = document.getElementById("modal");
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

// Todo: create a function to generate a unique task id
function generateTaskId() {
    currentId += 1;
    return currentId;
}


// function drag(event){
// }

function getTaskBackgroundColor(task){
    const taskDate = task.date;
    const todayDate = dayjs();
    const dateDiff = todayDate.diff(taskDate, 'day');
    // console.log(dateDiff);
    if (dateDiff > 0){
        return "taskBackgroundRed";
    }else if(dateDiff <= 0 && dateDiff >= -7){
        return "taskBackgroundYellow";
    }else{
        return "taskBackgroundWhite";
    }
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskBackgroundColor = getTaskBackgroundColor(task);
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add(taskBackgroundColor);
    taskCard.classList.add('text-center');
    taskCard.setAttribute("draggable", "true");
    taskCard.setAttribute("id", "task" + generateTaskId());
    // taskCard.setAttribute("ondragstart", "drag(event)")
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
    // taskDueDate.innerText = task.date;
    taskDueDate.innerText = dayjs(task.date).format('dddd, MMMM D YYYY');
    // task.date; 

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

    // taskCard.addEventListener("mousedown", () =>{
    //     this.addEventListener("mousmove", mouseDrag)
    // })

    // taskCard.addEventListener("mousedown", mouseDrag);

}


function mouseDrag({ movementX, movementY }, event){
    console.log("her");
    el = event.currentTarget;
    let getContainerStyle = window.getComputedStyle(el);
    let leftValue = parseInt(getContainerStyle.left);
    let topValue = parseInt(getContainerStyle.top);
    el.style.left = `${leftValue + movementX}px`;
    el.style.top = `${topValue + movementY}px`;
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

    inputTaskTitleEl.value = "";
    inputDateEl.value = "";
    inpu1tContentEl.value = "";

    createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    // console.log(event.currentTarget.parentElement);
    event.currentTarget.parentElement.remove();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event) {
    event.preventDefault();
    console.log("here");
    // console.log(event.currentTarget);
    // console.log(event.dataTransfer.getData());
    var data = event.dataTransfer.getData("html");
    console.log(data);
    console.log(typeof(data));
    const droppedTaskEl = document.getElementById(data);
    console.log(event.currentTarget.children[1].children[0].appendChild(droppedTaskEl));
    // event.currentTarget.children[1].children.appendChild(droppedTaskEl);
    // appendChild(droppedTaskEl);
    // event.currentTarget.appendChild(ui);
}
// addTaskButtonEl.addEventListener('click', handleAddTask);
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

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
