import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgjTZHgeW_Mj9ob8_3OYFGx_xgBoa0yH0",
    authDomain: "meongju0o0-git-blog-todolist.firebaseapp.com",
    projectId: "meongju0o0-git-blog-todolist",
    storageBucket: "meongju0o0-git-blog-todolist.appspot.com",
    messagingSenderId: "462108512601",
    appId: "1:462108512601:web:9d5a3357bbae002828fc48",
    measurementId: "G-RHKPH551R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = function() {
    const userEmail = document.getElementById("email_field").value;
    const userPass = document.getElementById("password_field").value;
  
    signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
