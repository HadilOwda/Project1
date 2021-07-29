//Vars
const taskInput = document.querySelector(".task-input"); //first element in the selector when it's used not when called
const taskButton = document.querySelector(".task-button"); //first element in the selector  when it's used not when called
const toDoList = document.querySelector(".To-DoList"); //first element in the selector  when it's used not when called
const fillterOptions = document.querySelector(".filter-todos");
//display items
display_items();
// Event Listener
taskButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheckEdit);
fillterOptions.addEventListener("click", filterTodos);

//functions
function display_items() {
  for (var i = 0; i < localStorage.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = "";
    //creat LI for the todo itself
    const newTodo = document.createElement("li");
    newTodo.innerText = localStorage.getItem(localStorage.key(i));
    newTodo.classList[0] = "li";
    newTodo.id = "";
    //add our todo item to it contianer
    todoDiv.appendChild(newTodo);
    //creat checking button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check-square"></i>'; //add smth to the html code --button icon
    checkedButton.classList.add("checkbutton");
    todoDiv.appendChild(checkedButton);
    //creat Deleting button
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; //add smth to the html code --button icon
    deletedButton.classList.add("deletebutton");
    todoDiv.appendChild(deletedButton);
    //creat editing button
    const editedButton = document.createElement("button");
    editedButton.innerHTML = '<i class="fas fa-edit"></i>';
    editedButton.classList.add("editbutton");
    editedButton.id = "edit";
    todoDiv.appendChild(editedButton);
    //Append it to the to do list so it is not flying --ul in the html
    toDoList.appendChild(todoDiv);
    //clear input value
    taskInput.value = "";
  }
}

function addToDo(event) {
  event.preventDefault(); //prevent from loading and submmiting
  //creat our todo div to cointain all the tasks added
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = "";
  //creat LI for the todo itself
  const newTodo = document.createElement("li");
  newTodo.innerText = taskInput.value;
  localStorage.setItem(taskInput.value, taskInput.value);
  newTodo.classList[0] = "li";
  newTodo.id = "";
  //add our todo item to it contianer
  todoDiv.appendChild(newTodo);
  //creat checking button
  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = '<i class="fas fa-check-square"></i>'; //add smth to the html code --button icon
  checkedButton.classList.add("checkbutton");
  todoDiv.appendChild(checkedButton);
  //creat Deleting button
  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; //add smth to the html code --button icon
  deletedButton.classList.add("deletebutton");
  todoDiv.appendChild(deletedButton);
  //creat editing button
  const editedButton = document.createElement("button");
  editedButton.innerHTML = '<i class="fas fa-edit"></i>';
  editedButton.classList.add("editbutton");
  editedButton.id = "edit";
  todoDiv.appendChild(editedButton);
  //Append it to the to do list so it is not flying --ul in the html
  toDoList.appendChild(todoDiv);
  //clear input value
  taskInput.value = "";
}
//functions of the buttons
function deleteCheckEdit(event) {
  const button = event.target; //to know what we are clicking on and act based on that
  //check
  if (button.classList[0] === "checkbutton") {
    const todo = button.parentElement;
    todo.classList.toggle("completed");
  }
  //delete
  if (button.classList[0] === "deletebutton") {
    const todo = button.parentElement; //div
    //remove item from local storage
    const span = todo.firstChild;
    localStorage.removeItem(span.textContent);
    //animation
    todo.classList.add("fall");
    //to make it wait
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //edit and save
  if (button.id === "edit" && button.classList[0] == "editbutton") {
    const todo = button.parentElement; //div
    const span = todo.firstChild; //item
    const input = document.createElement("input");
    input.classList.add("editing");
    input.type = "text";
    input.value = span.textContent;
    todo.insertBefore(input, span);
    todo.removeChild(span);
    button.innerHTML = '<i class="fas fa-check-circle"></i>';
    button.id = "save";
  } else if ((button.id = "save" && button.classList[0] == "editbutton")) {
    const todo = button.parentElement; //div
    todo.classList.add("todo-item");
    const input = todo.firstElementChild; //todo item
    const span = document.createElement("span");
    // span.classList.add("editing");
    span.textContent = input.value;
    todo.insertBefore(span, input);
    todo.removeChild(input);
    button.innerHTML = '<i class="fas fa-edit"></i>';
    button.id = "edit";
  }
}

function filterTodos(event) {
  const todos = toDoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}