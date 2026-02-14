// js/auth.js

import { auth, db } from "./firebase.js";

import { 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


window.login = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  errorEl.innerText = "";

  if (!email || !password) {
    errorEl.innerText = "Please enter email and password";
    return;
  }

  try {

    // 🔐 Firebase Authentication Login
    const userCredential =
      await signInWithEmailAndPassword(auth, email, password);

    const uid = userCredential.user.uid;

    // 📦 Fetch Firestore user data
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      errorEl.innerText = "User profile not found in database.";
      return;
    }

    const userData = userDoc.data();

    if (userData.isActive === false) {
      errorEl.innerText = "This account is disabled.";
      return;
    }

    // 💾 Save session locally
    localStorage.setItem("raviUser", JSON.stringify({
      uid: uid,
      name: userData.name,
      role: userData.role,
      branchId: userData.branchId
    }));

    // 🚀 Redirect
    window.location.href = "dashboard.html";

  } catch (error) {
    errorEl.innerText = error.message;
  }
};
