import { displayRecipes} from './recipes.js';

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
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
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
    } catch (error) {
        console.error('Error loading header or footer:', error);
    }
};

loadHeaderFooter();
