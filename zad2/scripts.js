"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = function() {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else
    //code creating a default list with 2 items
    todoList.push(
    {
        title: "Learn JS",
        description: "Create a demo application for my TODO's",
        place: "445",
        dueDate: new Date(2019,10,16)
    },
    {
        title: "Lecture test",
        description: "Quick test from the first three lectures",
        place: "F6",
        dueDate: new Date(2019,10,17)
    }
        // of course the lecture test mentioned above will not take place
    );
}

const BASE_URL = "https://api.jsonbin.io/v3/b/652edd3c54105e766fc394eb";
const SECRET_KEY = "$2a$10$hD8KF5mw26NxxCFfdm3Sfeh5epXb6c/pEbt28CP0jorrvLqMuRz/C";
$.ajax({
 // copy Your bin identifier here. It can be obtained in the dashboard
 url: BASE_URL,
 type: 'GET',
 headers: { //Required only if you are trying to access a private bin
   'X-Master-Key': SECRET_KEY
 },
 success: (data) => {
   //console.log(data);
   todoList = data.record;
 },
 error: (err) => {
   console.log(err.responseJSON);
 }
});

let updateJSONbin = function() {
    $.ajax({
  url: BASE_URL,
  type: 'PUT',
  headers: { //Required only if you are trying to access a private bin
    'X-Master-Key': SECRET_KEY
  },
  contentType: 'application/json',
  data: JSON.stringify(todoList),
  success: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.log(err.responseJSON);
  }
});
}

let updateTodoTable = function() {
    let todoTable = document.getElementById("tBodyID");

    //remove all elements
    while (todoTable.firstChild) {
        todoTable.removeChild(todoTable.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");   
    let dateFromFilterInput = document.getElementById("inputSearchDateFrom");   
    let dateToFilterInput = document.getElementById("inputSearchDateTo");   
    for (let todo in todoList) {
    if (
        ((filterInput.value == "") ||
        (todoList[todo].title.includes(filterInput.value)) ||
        (todoList[todo].description.includes(filterInput.value)))
        &&
        (((dateFromFilterInput.value == "") || (dateToFilterInput.value == "")) ||
        ((new Date(todoList[todo].dueDate) >= new Date(dateFromFilterInput.value)) &&
        (new Date(todoList[todo].dueDate) <= new Date(dateToFilterInput.value))))
    ) {
            let newRow = document.createElement("tr");
           
            let dueDateCell = document.createElement("td");
            dueDateCell.appendChild(document.createTextNode(todoList[todo].dueDate));
            newRow.appendChild(dueDateCell);

            let placeCell = document.createElement("td");
            placeCell.appendChild(document.createTextNode(todoList[todo].place));
            newRow.appendChild(placeCell);

            let descriptionCell = document.createElement("td");
            descriptionCell.appendChild(document.createTextNode(todoList[todo].description));
            newRow.appendChild(descriptionCell);

            let titleCell = document.createElement("td");
            titleCell.appendChild(document.createTextNode(todoList[todo].title));
            newRow.appendChild(titleCell);

            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.className = "btn btn-danger ";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function() {
                    deleteTodo(todo);
                });
            
            let buttonCell = document.createElement("td");
            buttonCell.appendChild(newDeleteButton);
            newRow.appendChild(buttonCell);

            todoTable.appendChild(newRow);
        }
    }
}

setInterval(updateTodoTable, 1000);

let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

let addTodo = function() {
    //get the elements in the form
      let inputTitle = document.getElementById("inputTitle");
      let inputDescription = document.getElementById("inputDescription");
      let inputPlace = document.getElementById("inputPlace");
      let inputDate = document.getElementById("inputDate");
    //get the values from the form
      let newTitle = inputTitle.value;
      let newDescription = inputDescription.value;
      let newPlace = inputPlace.value;
      let newDate = new Date(inputDate.value);
    //create new item
      let newTodo = {
          title: newTitle,
          description: newDescription,
          place: newPlace,
          dueDate: newDate
      };
    //add item to the list
      todoList.push(newTodo);
      //window.localStorage.setItem("todos", JSON.stringify(todoList));
      updateJSONbin();
  }