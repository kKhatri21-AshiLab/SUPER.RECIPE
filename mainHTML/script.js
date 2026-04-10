






const ingredientInput = document.getElementById('ingredientInput');
const searchBtn = document.getElementById('searchBtn');
const recipeSection = document.getElementById('recipeSection');
const recipeModal = document.getElementById('recipeModal');
const closeBtn = document.getElementById('closeBtn');

let recipes = [];

searchBtn.addEventListener('click', async () => {
    const ingredients = ingredientInput.value.trim().split(',');
    if (ingredients.length > 0) {
        try {
            const response = await fetch(`https://api.example.com/recipes?ingredients=${ingredients.join(',')}`);
            const data = await response.json();
            recipes = data.recipes;
            displayRecipes();
        } catch (error) {
            console.error(error);
        }
    }
});

function displayRecipes() {
    recipeSection.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeHTML = `
            <li>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <ul>
                    ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
                </ul>
            </li>
        `;
        recipeSection.innerHTML += recipeHTML;
    });
}

recipeSection.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const recipe = event.target;
        const recipeName = recipe.querySelector('h3').textContent;
        const recipeIngredients = recipe.querySelectorAll('ul li');
        const ingredientsArray = Array.from(recipeIngredients).map((ingredient) => ingredient.textContent);
        const matchedRecipes = recipes.filter((recipe) => {
            const recipeIngredientsArray = recipe.ingredients;
            return ingredientsArray.every((ingredient) => recipeIngredientsArray.includes(ingredient));
        });
        if (matchedRecipes.length > 0) {
            displayModal(matchedRecipes);
        }
    }
});

function displayModal(recipes) {
    recipeModal.style.display = 'block';
    const modalContentHTML = `
        <h2>Matching Recipes</h2>
        <ul>
            ${recipes.map((recipe) => `<li>${recipe.name}</li>`).join('')}
        </ul>
    `;
    document.getElementById('modalContent').innerHTML = modalContentHTML;
}

closeBtn.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
});

















/* second atemtt
/* const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipeContainer = document.getElementById('recipeContainer');
const recipeModal = document.getElementById('recipeModal');
const closeBtn = document.getElementById('closeBtn');

let recipes = [];

searchBtn.addEventListener('click', async () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=YOUR_API_ID&app_key=YOUR_API_KEY`);
            const data = await response.json();
            recipes = data.hits;
            displayRecipes();
        } catch (error) {
            console.error(error);
        }
    }
});

function displayRecipes() {
    recipeContainer.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeHTML = `
            <div class="recipe">
                <h2>${recipe.recipe.label}</h2>
                <ul>
                    ${recipe.recipe.ingredients.map((ingredient) => `<li><span>${ingredient.text}</span></li>`).join('')}
                </ul>
            </div>
        `;
        recipeContainer.innerHTML += recipeHTML;
    });
}

recipeContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('recipe')) {
        const recipe = event.target;
        const recipeLabel = recipe.querySelector('h2').textContent;
        const recipeIngredients = recipe.querySelectorAll('ul li span');
        const ingredientsArray = Array.from(recipeIngredients).map((ingredient) => ingredient.textContent);
        const matchedRecipes = recipes.filter((recipe) => {
            const recipeIngredientsArray = recipe.recipe.ingredients.map((ingredient) => ingredient.text);
            return ingredientsArray.every((ingredient) => recipeIngredientsArray.includes(ingredient));
        });
        if (matchedRecipes.length > 0) {
            displayModal(matchedRecipes);
        }
    }
});

function displayModal(recipes) {
    recipeModal.style.display = 'block';
    const modalContentHTML = `
        <h2>Matching Recipes</h2>
        <ul>
            ${recipes.map((recipe) => `<li>${recipe.recipe.label}</li>`).join('')}
        </ul>
    `;
    document.getElementById('modalContent').innerHTML = modalContentHTML;
}

closeBtn.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
}); */