import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUru8IbhArwEnRhAUAOJRj9m6U-fkT6sw",
  authDomain: "steingate-blog.firebaseapp.com",
  projectId: "steingate-blog",
  storageBucket: "steingate-blog.firebasestorage.app",
  messagingSenderId: "1022465465622",
  appId: "1:1022465465622:web:b7072179f87ddaeaec0437",
  measurementId: "G-HJKDH5KD44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
    const loginStatusElement = document.getElementById('login-status');
    if (user) {
        // User is signed in
        loginStatusElement.textContent = 'Logged in';
    } else {
        // User is signed out
        loginStatusElement.textContent = 'Logged out';
    }
});

window.login = function() {
    event.preventDefault();
    const userEmail = document.getElementById("email_field").value;
    const userPass = document.getElementById("password_field").value;

    signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed in');
        // ...
    })
    .catch((error) => {
        console.log('Error signing out: ', error);
    });
}

window.logout = function() {
    event.preventDefault(); // prevent page reload
    const auth = getAuth(app);
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log('User signed out.');
    }).catch((error) => {
        // An error happened.
        console.log('Error signing out:', error);
    });
}
