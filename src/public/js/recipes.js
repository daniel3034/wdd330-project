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
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal} loading="lazy" width="600" height="400">
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strInstructions.slice(0, 100)}...</p>
            <div class="recipe-details" style="display: none;"></div>
            <div class="expand-container">
                <span class="expand-icon">View Recipe</span>
            </div>
        `;

        // Add click event to toggle recipe details
        const expandIcon = recipeCard.querySelector(".expand-icon");
        const detailsDiv = recipeCard.querySelector(".recipe-details");

        expandIcon.addEventListener("click", async (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up

            // If details are already visible, toggle them off
            if (detailsDiv.style.display === "block") {
                detailsDiv.style.display = "none";
                expandIcon.textContent = "View Recipe"; // Change to "View Recipe"
                return;
            }

            // Fetch full recipe details
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
            const data = await response.json();

            if (data.meals) {
                const fullRecipe = data.meals[0];
                detailsDiv.innerHTML = `
                    <p><strong>Category:</strong> ${fullRecipe.strCategory}</p>
                    <p><strong>Area:</strong> ${fullRecipe.strArea}</p>
                    <p><strong>Instructions:</strong> ${fullRecipe.strInstructions}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        ${getIngredientsList(fullRecipe)}
                    </ul>
                `;
                detailsDiv.style.display = "block"; // Show the details
                expandIcon.textContent = "Hide Recipe"; // Change to "Hide Recipe"
            }
        });

        recipesContainer.appendChild(recipeCard);
    });
}

// Helper function to extract ingredients and measurements
function getIngredientsList(recipe) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<li>${measure ? measure : ""} ${ingredient}</li>`;
        }
    }
    return ingredients;
}
