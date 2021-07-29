const btn = document.getElementById("btn");
const user = document.getElementById("user");
const password = document.getElementById("password");
const database = firebase.database();

//auto login
userfound();

//event listeners
btn.addEventListener("click", signin);

//for auto login
function userfound() {
  if (getCookie("username")) {
    document.location.replace(document.location.origin + "/pages/home.html");
  }
}
//
function signin() {
  event.preventDefault(); //no loading or submitting
  if (user.value == "" || password.value == "") {
    //checking
    alert("Please fill everything in.");
  } else {
    const rootRef = database.ref("users/");
    rootRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data[user.value] != undefined) {
        if (data[user.value]["password"] == password.value) {
          setCookie("username", user.value, 360); //will be signed out by force after 360days
          document.location.replace(
            document.location.origin + "/pages/home.html"
          );
        } else {
          alert("Wrong username or password");
        }
      } else {
        alert("Wrong username or password");
      }
    });
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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
