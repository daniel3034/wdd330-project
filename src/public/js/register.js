import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { loadHeaderFooter } from './script.js';

// Load header and footer
loadHeaderFooter();

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
        window.location.href = '/login.html'; // Redirect to login page after successful registration
    } catch (error) {
        alert(error.message);
    }
});
