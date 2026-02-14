// js/dashboard.js

import { auth } from "./firebase.js";

import { 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


const userData = JSON.parse(localStorage.getItem("raviUser"));

if (!userData) {
  window.location.href = "login.html";
} else {
  document.getElementById("welcome").innerText =
    "Welcome " + userData.name;
}

window.logout = async function () {
  await signOut(auth);
  localStorage.removeItem("raviUser");
  window.location.href = "login.html";
};
