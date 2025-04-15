import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBjzVPxqRTFXAQc8hf7wQETnUc1ZOnsmok",
    authDomain: "recipe-repository-1e6cf.firebaseapp.com",
    databaseURL: "https://recipe-repository-1e6cf-default-rtdb.firebaseio.com/",
    projectId: "recipe-repository-1e6cf",
    storageBucket: "recipe-repository-1e6cf.appspot.com",
    messagingSenderId: "620937608114",
    appId: "1:620937608114:web:8dc13aa8f6a839def802ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };