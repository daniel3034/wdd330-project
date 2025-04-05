const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function searchRecipes() {
    const searchInput = document.getElementById("search-input").value;
    const response = await fetch(API_URL + searchInput);
    const data = await response.json();
    displayRecipes(data.meals);
}

export function displayRecipes(recipes) {
    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.innerHTML = ""; // Clear previous results

    if (!recipes) {
        recipesContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strInstructions.slice(0, 100)}...</p>
            <button onclick="viewRecipe('${recipe.idMeal}')">View Recipe</button>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}