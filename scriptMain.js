


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const addButton = document.getElementById('add-button');
const searchFeed = document.getElementById('search-feed');

let tags = [];

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = searchInput.value.trim();
    if (inputValue) {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = inputValue;
        searchFeed.appendChild(tag);
        tags.push(inputValue);
        searchInput.value = '';
    }
});

addButton.addEventListener('click', () => {
    const inputValue = searchInput.value.trim();
    if (inputValue) {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = inputValue;
        searchFeed.appendChild(tag);
        tags.push(inputValue);
        searchInput.value = '';
    }
});
	




	/*These lines select HTML elements using their IDs and store them in variables. This is done using the document.getElementById() method, which returns the first element with the specified ID.

searchForm is the form element that contains the input field and the "Add" button.
searchInput is the input field where the user types their input.
addButton is the "Add" button that triggers the addition of a new tag.
searchFeed is the container element that displays the added tags.

Event Listeners

javascript

Verify

Open In Editor
Edit
Copy code
searchForm.addEventListener('submit', (e) => {
    // ...
});

addButton.addEventListener('click', () => {
    // ...
});
These lines add event listeners to the searchForm and addButton elements. An event listener is a function that is called when a specific event occurs on an element.

The submit event is triggered when the form is submitted (e.g., when the user presses the "Enter" key while the input field is focused).
The click event is triggered when the "Add" button is clicked.

Event Handler Functions

javascript

Verify

Open In Editor
Edit
Copy code
(e) => {
    e.preventDefault();
    const inputValue = searchInput.value.trim();
    if (isValidInput(inputValue)) {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = inputValue;
        searchFeed.appendChild(tag);
        tags.push(inputValue);
        searchInput.value = '';
    } else {
        alert('Invalid input. Please enter a valid ingredient or keyword.');
    }
}
These are the functions that are called when the submit or click events occur. Here's what they do:

e.preventDefault(): This line prevents the default behavior of the form submission (i.e., reloading the page).
const inputValue = searchInput.value.trim(): This line gets the value of the input field and trims any whitespace from the beginning and end of the string.
if (isValidInput(inputValue)) { ... }: This line checks if the input is valid using the isValidInput function. If it's valid, the code inside the if statement is executed.
const tag = document.createElement('span'): This line creates a new <span> element that will be used to display the tag.
tag.classList.add('tag'): This line adds the tag class to the new <span> element.
tag.textContent = inputValue: This line sets the text content of the new <span> element to the input value.
searchFeed.appendChild(tag): This line adds the new <span> element to the searchFeed container.
tags.push(inputValue): This line adds the input value to the tags array.
searchInput.value = '': This line clears the input field.
isValidInput Function

javascript

Verify

Open In Editor
Edit
Copy code
function isValidInput(input) {
    return input !== '' && /^[a-zA-Z0-9\s]+$/.test(input);
}
This function checks if the input string is valid. Here's what it does:

input !== '': This line checks if the input string is not empty.
/^[a-zA-Z0-9\s]+$/.test(input): This line checks if the input string only contains letters, numbers, and whitespace characters using a regular expression.
If both conditions are true, the function returns true, indicating that the input is valid. Otherwise, it returns false.
*/
















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