// Example data for dishes
const dishes = [
    {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon and Parmesan cheese.',
        //image: 'IMG-20231118-WA0021.jpg'
    },
    {
        name: 'Sushi Rolls',
        description: 'Delicious Japanese sushi rolls with fresh ingredients.',
        //image: 'IMG-20231118-WA0020.jpg' 
    },
    {
        name: 'Chicken Curry',
        description: 'Spicy and flavorful chicken curry with rice.',
        //image: 'IMG-20231118-WA0018.jpg'
    },
    {
        name: 'Massaman Curry',
        description: 'Massaman cury is a rich,flavourful and spicy thai curry.',
        //image: 'IMG-20231118-WA0023.jpg'
    },
    {
        name: 'Neapolitan Pizza',
        description: 'It is  special type of pizza made with tomatoes and mozarella cheese.',
        //image: 'IMG-20231118-WA0022.jpg'
    },
    {
        name: 'Litti Chokha',
        description: 'Litti,sometimes,along with chokha,is a complete mealnthat originated from bhojpuri region of India.',
        //image: 'IMG-20231118-WA0019.jpg'
    },
    // Add more dishes as needed
];

// Function to display dishes on the webpage
function displayDishes() {
    const dishList = document.getElementById('dish-list');

    dishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.innerHTML = `
            <h2>${dish.name}</h2>
            <p>${dish.description}</p>
        `;
        dishList.appendChild(dishDiv);
    });
}

// Call the displayDishes function when the page is loaded
window.onload = displayDishes;
