import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { loadHeaderFooter } from './script.js';

// Load header and footer
loadHeaderFooter();

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = '/'; // Redirect to the home page or dashboard
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

export const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert('You are not logged in. Please log in to access this page.');
            window.location.href = '/login.html'; // Redirect to the login page
        }
    });
}    
