import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { loadHeaderFooter } from 'js/script.js';

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
        window.location.href = '/login'; // Redirect to login page after successful registration
    } catch (error) {
        alert(error.message);
    }
});

loadHeaderFooter();
