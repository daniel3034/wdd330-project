import { auth, db } from './firebase.js'; // Import db from firebase.js
import { ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { loadHeaderFooter } from './script.js';
import { checkAuth } from './login.js';

// Load header and footer
loadHeaderFooter();

// Check if the user is logged in
checkAuth();

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
        // Convert the image to a Base64 string
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result; // Base64 string of the image

            // Save the recipe data to Realtime Database
            const recipeData = {
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions,
                image: base64Image, // Store the Base64 image here
                createdBy: auth.currentUser.uid,
                createdAt: new Date().toISOString()
            };

            const recipesRef = ref(db, 'recipes');
            await push(recipesRef, recipeData);

            alert('Recipe added successfully!');
            addRecipeForm.reset(); // Clear the form
        };

        reader.onerror = (error) => {
            console.error('Error reading image file:', error);
            alert('Failed to process the image. Please try again.');
        };

        reader.readAsDataURL(recipeImage); // Read the image as a Base64 string
    } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Failed to add recipe. Please try again.');
    }
});
