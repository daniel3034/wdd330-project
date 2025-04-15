import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { loadHeaderFooter } from './script.js';

// Load header and footer
loadHeaderFooter();

// Handle login form submission
const loginForm = document.getElementById('login-form');

if (loginForm) {
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
}

// Export a function to check authentication state
export const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user);
        if (!user) {
            alert('You must be logged in to access this page.');
            window.location.href = '/login.html'; // Redirect to the login page
        }
    });
};
