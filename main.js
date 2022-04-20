let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
msg.innerHTML = '';



form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});


let formValidation = () => {
    if (textInput.value === '') {
        console.log('Task can not be blank !!');
        msg.classList.add('p-0', 'm-0', 'text-danger');
        msg.innerHTML = 'Task cannot be blank';
    }
    else {
        console.log('Ok !!');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        // writing an IIFE 
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
}


let data = [];

let acceptData = () => {
    data.push({
        'text': textInput.value,
        'date': dateInput.value,
        'description': textarea.value
    });
    // saving data in the local storage 
    localStorage.setItem('data', JSON.stringify(data));
    createTasks();
    console.log(data);
};

let createTasks = () => {
    tasks.innerHTML = '';
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id = "${y}">
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onclick="deleteTask(this); createTasks();" class="fa-solid fa-trash-can"></i>
        </span>
    </div>`);
    });
    resetForm();
};

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
}


let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    // console.log(e.parentElement.parentElement.id);
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
}

// Writing an IIFE to fetch all the data from the localStorage to the data array 
(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks();
    console.log(data);
})();