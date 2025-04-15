import { displayRecipes} from './recipes.js';
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-button");

    // Fetch and display featured recipes on the homepage
    if (document.getElementById("recipes")) {
        fetchFeaturedRecipes();
    }

    searchBtn?.addEventListener("click", async () => {
        const searchInput = document.getElementById("search-input").value;
        const response = await fetch(API_URL + searchInput);
        const data = await response.json();
        displayRecipes(data.meals);
    });
});

async function fetchFeaturedRecipes() {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.meals) {
        // Shuffle the array of recipes
        const shuffledRecipes = data.meals.sort(() => Math.random() - 0.5);
        const featuredRecipes = shuffledRecipes.slice(0, 6); // Get 6 random recipes

        const recipesContainer = document.getElementById("recipes");
        recipesContainer.innerHTML = ""; // Clear existing content

        featuredRecipes.forEach(recipe => {
            const recipeItem = document.createElement("li");
            recipeItem.innerHTML = `
                <div class="recipe-card">
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal} loading="lazy" width="300" height="200"/>
                    <h3>${recipe.strMeal}</h3>
                    <p>${recipe.strInstructions.slice(0, 100)}...</p>
                </div>
            `;
            recipesContainer.appendChild(recipeItem);
        });
    }
}

async function loadTemplate(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    return response.text();
}

function renderWithTemplate(template, element) {
    element.innerHTML = template;
}

function qs(selector) {
    return document.querySelector(selector);
}

export const loadHeaderFooter = async () => {
    try {
        const header = await loadTemplate('partials/header.html');
        const headerElement = qs('#header');
        renderWithTemplate(header, headerElement);

        const footer = await loadTemplate('partials/footer.html');
        const footerElement = qs('#footer');
        renderWithTemplate(footer, footerElement);

        console.log('Header and footer loaded successfully.');

        // Add authentication state logic here
        const authLink = document.getElementById('auth-link');
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                authLink.innerHTML = `<a href="#" id="logout-link">Logout</a>`;
                const logoutLink = document.getElementById('logout-link');
                logoutLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        await signOut(auth);
                        alert('You have been logged out.');
                        window.location.reload(); // Reload the page to update the UI
                    } catch (error) {
                        console.error('Error logging out:', error);
                    }
                });
            } else {
                // User is logged out
                authLink.innerHTML = `<a href="register.html">Login/Register</a>`;
            }
        });
    } catch (error) {
        console.error('Error loading header or footer:', error);
    }
};

loadHeaderFooter();;
