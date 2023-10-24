"use strict";
let todoList = []; //declares a new array for Your todo list

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
    let todoTable = $("#todoTableView").find("tbody");

    //remove all elements
    todoTable.empty();

    //add all elements
    let filterInput = $("#inputSearch").val().toLowerCase(); 
    let dateFromFilterInput = $("#inputSearchDateFrom");   
    let dateToFilterInput = $("#inputSearchDateTo");   
    
    for (let todo in todoList) {
      if (
          ((filterInput == "") ||
          (todoList[todo].title.toLowerCase().includes(filterInput)) ||
          (todoList[todo].description.toLowerCase().includes(filterInput)))
          &&
          (((dateFromFilterInput.val() == "") || (dateToFilterInput.val() == "")) ||
          ((new Date(todoList[todo].dueDate) >= new Date(dateFromFilterInput.val())) &&
          (new Date(todoList[todo].dueDate) <= new Date(dateToFilterInput.val()))))
      ) {
            let newRow = $("<tr>");
           
            newRow.append($("<td>").text(todoList[todo].dueDate));
            newRow.append($("<td>").text(todoList[todo].place));
            newRow.append($("<td>").text(todoList[todo].description));
            newRow.append($("<td>").text(todoList[todo].title));
            
            let newDeleteButton = $("<input>");
            newDeleteButton
              .attr("type", "button")
              .addClass("btn btn-danger")
              .val("x")
              .on('click', function() { 
                deleteTodo(todo);
              });
                
            let buttonCell = $("<td>");
            buttonCell.append(newDeleteButton);

            newRow.append(buttonCell);
            todoTable.append(newRow);
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
      let inputTitle = $("#inputTitle");
      let inputDescription = $("#inputDescription");
      let inputPlace = $("#inputPlace");
      let inputDate = $("#inputDate");
    //create new item
      let newTodo = {
          title: inputTitle.val(),
          description: inputDescription.val(),
          place: inputPlace.val(),
          dueDate: inputDate.val()
      };
    //add item to the list
      todoList.push(newTodo);
      updateJSONbin();
  }