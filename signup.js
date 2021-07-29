const btn = document.getElementById("btn");
const user = document.getElementById("user");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const birthday = document.getElementById("birthday");
let gender = "";
const email = document.getElementById("email");
const password = document.getElementById("password");
const database = firebase.database();

btn.addEventListener("click", check);
function check() {
  event.preventDefault();
  if (document.getElementById("genderm").checked) {
    gender = "male";
  } else if (document.getElementById("genderf").checked) {
    gender = "female";
  }

  if (
    user.value == "" ||
    firstName.value == "" ||
    lastName.value == "" ||
    birthday.value == "" ||
    email.value == "" ||
    password.value == ""
  ) {
    alert("Please fill everything in.");
  } else if (/^[^@]+@\w+(\.\w+)+\w$/.test(email.value) === false) {
    // check if the email is valid
    alert("Please enter a valid email.");
  } else if (password.value.length <= 6) {
    alert("Please enter a password with a length of more than 6 letters");
  } else {
    signup();
  }
}

function signup() {
  const rootRef = database.ref("users/");
  let user_id = user.value;
  // to get the value for the users
  rootRef.once("value", (snapshot) => {
    const data = snapshot.val();
    if (data[user_id] === undefined) {
      rootRef.update({
        [user_id]: {
          first_name: firstName.value,
          last_name: lastName.value,
          birthday: birthday.value,
          gender: gender,
          email: email.value,
          password: password.value,
        },
      });
      alert(
        "Congratulations! now you can use To-Do List.\nNow you need to sign in."
      );
      document.location.replace(document.location.origin + "/index.html");
    } else {
      alert(
        "Sorry, this username already exists.\nPlease use another username."
      );
    }
  });
}
