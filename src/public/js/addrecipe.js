import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { loadHeaderFooter } from './script.js';

// Load header and footer
loadHeaderFooter();

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert('You must be logged in to access this page.');
        window.location.href = '/login.html'; // Redirect to login page
    }
});

// Handle form submission
const addRecipeForm = document.getElementById('add-recipe-form');
addRecipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    const recipeImage = document.getElementById('recipe-image').files[0];

    if (!recipeImage) {
        alert('Please upload an image for the recipe.');
        return;
    }

    try {
        // Save the recipe details and image (Using Firebase Storage and Firestore)
        const storageRef = firebase.storage().ref(`recipes/${recipeImage.name}`);
        await storageRef.put(recipeImage);
        const imageUrl = await storageRef.getDownloadURL();

        const recipeData = {
            name: recipeName,
            ingredients: ingredients,
            instructions: instructions,
            imageUrl: imageUrl,
            createdBy: auth.currentUser.uid,
            createdAt: new Date().toISOString()
        };

        // Save recipe data to Firestore
        const db = firebase.firestore();
        await db.collection('recipes').add(recipeData);

        alert('Recipe added successfully!');
        addRecipeForm.reset();
    } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Failed to add recipe. Please try again.');
    }
});