//Vars
const taskInput = document.querySelector(".task-input"); //first element in the selector when it's used not when called
const taskButton = document.querySelector(".task-button"); //first element in the selector  when it's used not when called
const toDoList = document.querySelector(".ToDoList"); //first element in the selector  when it's used not when called
const fillterOptions = document.querySelector(".filter-todo");
const signoutBtn = document.querySelector(".signout-btn"); //control the btn
const database = firebase.database(); //for our database in firebase
const username = getCookie("username"); //data for each user
const ref = database.ref("users/" + username + "/tasks/"); //identify the location of the tasks from the database

//display items **get them from the database*
display_todos();
// Event Listener
taskButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheckEdit);
fillterOptions.addEventListener("click", filterTodo);
signoutBtn.addEventListener("click", signout);

//functions
function display_todos() {
  ref.once("value", (snapshot) => {
    //scan all the tasks in the database
    snapshot.forEach((childSnapshot) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      if (childSnapshot.child("completed").val() == true) {
        todoDiv.classList.add("completed");
      }
      //ID
      todoDiv.id = childSnapshot.key;
      //creat LI for the todo itself
      const newTodo = document.createElement("li");
      newTodo.innerText = childSnapshot.child("value").val();
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
    });
  });
}

function addToDo(event) {
  event.preventDefault(); //prevent from loading and submmiting
  //creat our todo div to cointain all the tasks added
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //generate ID
  let d = new Date();
  let n = d.getTime(); // get current time
  let id = "t" + n; //adding "t" for best practice
  todoDiv.id = id; //adding the id to div
  ref.update({ [id]: { value: taskInput.value, completed: false } });
  //creat LI for the todo itself
  const newTodo = document.createElement("li");
  newTodo.innerText = taskInput.value;
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
  const item = event.target; //to know what we are clicking on and act based on that
  //check
  if (item.classList[0] === "checkbutton") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    let completed_value = ref //func
      .child(todo.id)
      .child("completed")
      .once("value", (snapshot) => {
        ref.child(todo.id).update({ completed: !snapshot.val() });
      });
  }
  //delete
  if (item.classList[0] === "deletebutton") {
    const todo = item.parentElement; //div

    ref.child(todo.id).remove();

    //animation
    todo.classList.add("removing-trans");
    //to make it wait
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //edit and save
  if (item.id === "edit" && item.classList[0] == "editbutton") {
    const todo = item.parentElement; //div
    const span = todo.firstChild; //item
    const input = document.createElement("input");
    input.classList.add("editing");
    input.type = "text";
    input.value = span.textContent;
    todo.insertBefore(input, span);
    todo.removeChild(span);
    item.innerHTML = '<i class="fas fa-check-circle"></i>';
    item.id = "save";
  } else if ((item.id = "save" && item.classList[0] == "editbutton")) {
    const todo = item.parentElement; //div
    todo.classList.add("todo-item");
    const input = todo.firstElementChild; //todo item
    const span = document.createElement("span");
    span.textContent = input.value;
    ref.child(todo.id).update({ value: input.value });
    todo.insertBefore(span, input);
    todo.removeChild(input);
    item.innerHTML = '<i class="fas fa-edit"></i>';
    item.id = "edit";
  }
}

function filterTodo(event) {
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

//get the data
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function signout() {
  eraseCookie("username");
  document.location.replace(document.location.origin + "/index.html");
  console.log("done");
}
//remove data
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
