
//Creating selections for the menu
const menu = [
    { id: 1, name: 'Burger', description: 'A juicy burger with all the fixings.', price: 10.99 },
    { id: 2, name: 'Pepperoni Pizza', description: 'A delicious pepperoni pizza.', price: 12.99 },
    { id: 3, name: 'Pasta Carbonara', description: 'Creamy pasta with pancetta.', price: 14.99 },
    { id: 4, name: 'Caesar Salad', description: 'Crispy romaine lettuce with Caesar dressing.', price: 8.99 },
    { id: 5, name: 'Grilled Cheese', description: 'Cheesy goodness between toasted bread.', price: 7.99 },
    { id: 6, name: 'Chicken Sandwich', description: 'Grilled chicken with lettuce and tomato.', price: 11.99 },
    { id: 7, name: 'Tacos', description: 'Three beef tacos with salsa and guacamole.', price: 9.99 },
    { id: 8, name: 'French Fries', description: 'Crispy golden fries.', price: 3.99 },
    { id: 9, name: 'Onion Rings', description: 'Battered and fried onion rings.', price: 4.99 },
    { id: 10, name: 'Steak', description: 'Grilled steak with a side of mashed potatoes.', price: 19.99 },
    { id: 11, name: 'Fish and Chips', description: 'Beer-battered fish with fries.', price: 13.99 },
    { id: 12, name: 'Chicken Caesar Wrap', description: 'Grilled chicken with Caesar salad in a wrap.', price: 10.99 },
    { id: 13, name: 'BBQ Ribs', description: 'Slow-cooked ribs with BBQ sauce.', price: 17.99 },
    { id: 14, name: 'Veggie Burger', description: 'A tasty veggie burger with all the fixings.', price: 9.99 },
    { id: 15, name: 'Spaghetti Bolognese', description: 'Spaghetti with a rich meat sauce.', price: 11.99 },
    { id: 16, name: 'Shrimp Scampi', description: 'Shrimp sautéed in garlic and butter.', price: 16.99 },
    { id: 17, name: 'Fried Chicken', description: 'Crispy fried chicken with a side of coleslaw.', price: 14.99 },
    { id: 18, name: 'BLT Sandwich', description: 'Bacon, lettuce, and tomato on toasted bread.', price: 8.99 },
    { id: 19, name: 'Margarita Pizza', description: 'Pizza with fresh tomatoes and basil.', price: 11.99 },
    { id: 20, name: 'Chicken Alfredo', description: 'Pasta with creamy Alfredo sauce and grilled chicken.', price: 15.99 },
    { id: 21, name: 'Clam Chowder', description: 'Creamy clam chowder soup.', price: 7.99 },
    { id: 22, name: 'Beef Tacos', description: 'Three beef tacos with salsa and cheese.', price: 10.99 },
    { id: 23, name: 'Lobster Roll', description: 'Fresh lobster in a buttered roll.', price: 18.99 },
    { id: 24, name: 'Greek Salad', description: 'Salad with feta cheese, olives, and cucumbers.', price: 9.99 },
    { id: 25, name: 'Cheeseburger', description: 'Burger with cheese, lettuce, and tomato.', price: 11.99 },
    { id: 26, name: 'Chicken Nuggets', description: 'Bite-sized pieces of chicken with dipping sauce.', price: 6.99 },
    { id: 27, name: 'Eggplant Parmesan', description: 'Breaded eggplant with marinara and cheese.', price: 12.99 },
    { id: 28, name: 'Fajitas', description: 'Grilled chicken fajitas with peppers and onions.', price: 13.99 },
    { id: 29, name: 'Cobb Salad', description: 'Salad with chicken, bacon, avocado, and eggs.', price: 10.99 },
    { id: 30, name: 'Pulled Pork Sandwich', description: 'Pulled pork with BBQ sauce on a bun.', price: 9.99 },
  ];
// Funtion to filter the menu array then push random selections into array called randomItems
  function getRandomMenu(menu, count) {
    const randomItems = [];
    while (randomItems.length < count){
        const randomItem = menu[Math.floor(Math.random() * menu.length)];
        if (!randomItems.includes(randomItem)) {
            randomItems.push(randomItem);
        }
    }
    return randomItems; 
  };

  export { getRandomMenu, menu };