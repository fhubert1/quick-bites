const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, Restaurant, Dish, Order, Review } = require('../models');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});

    console.log("Database cleared");

    // Seed users
    const users = [
      {
        name: "John Smith",
        email: "john@smith.com",
        userName: "johnsmith",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, Who Cares, MD 20142",
        phone: "555-456-7890",
      },
      {
        name: "Jane Smith",
        email: "jane@smith.com",
        userName: "janesmith",
        password: await bcrypt.hash("password456", 10),
        address: "456 Elm St, , Country",
        phone: "987-654-3210",
      },
      {
        name: "Tom",
        email: "tom@example.com",
        userName: "tom",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",
      },
      {
        name: "Jerry",
        email: "jerry@example.com",
        userName: "jerry",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Harry",
        email: "harry@example.com",
        userName: "harry",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Ron",
        email: "ron@example.com",
        userName: "ron",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Luke",
        email: "luke@example.com",
        userName: "luke",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Yoda",
        email: "yoda@example.com",
        userName: "yoda",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Mulder",
        email: "mulder@example.com",
        userName: "mulder",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
      {
        name: "Dana",
        email: "dana@example.com",
        userName: "dana",
        password: await bcrypt.hash("password123", 10),
        address: "123 Main St, MyCity, AZ 12345",
        phone: "555-555-5555",    
      },
    ];
  
    await User.insertMany(users);
    console.log("Users seeded");

    // Seed restaurants and dishes
    const restaurantsData = [
      {
        name: 'Freds Chicken and Waffles',
        address: '123 Fred Drive, Ellicott City, MD 21042',
        phone: '555-111-1111',
        menu: [
          { 
            name: 'Hot Honey Chicken and Waffles', 
            description: '4 Tenders in special hot honey sauce on a belgin waffle.', 
            price: 14.99 
          },
          { 
            name: 'Chicken and Waffles', 
            description: '4 Tenders on a belgin waffle.', 
            price: 11.99 
          },
          { 
            name: 'Reg Fries', 
            description: 'Waffle Fries.', 
            price: 4.99 
          },
          { 
            name: 'Lg Fries', 
            description: 'Waffle Fries.', 
            price: 6.99 
          },
          { 
            name: 'Reg Drink', 
            description: 'fountain drink.', 
            price: 1.99 
          },
          { 
            name: 'Lg Drink', 
            description: 'fountain drink.', 
            price: 2.99 
          },
        ],
        reviews: [
          { 
            user: users[2]._id, 
            rating: 10, 
            comment: 'Amazing food and service, Fred is the GREATEST!!!', 
            date: '2024-07-01' 
          },
          { 
            user: users[3]._id, 
            rating: 9, 
            comment: 'Great food great value!!.', 
            date: '2024-07-21' 
          }
        ]
      },
      {
        name: 'Shandys Shake Shack',
        address: '234 Shandy Lane, Fairfax, VA 12121',
        phone: '555-222-2222',
        menu: [
          { 
            name: 'Cheeseburger', 
            description: 'A tasty cheeseburger with all the fixings.', 
            price: 7.99 },
          { 
            name: 'Veggie Burger', 
            description: 'Delicious veggie burger.', 
            price: 6.99 
          },
          { 
            name: 'Reg Fries', 
            description: 'Waffle Fries.', 
            price: 4.99 
          },
          { 
            name: 'Lg Fries', 
            description: 'Waffle Fries.', 
            price: 6.99 
          },
          { 
            name: 'Reg Shake', 
            description: 'Delicious Shake.', 
            price: 2.99 
          },
          { 
            name: 'Lg Shake', 
            description: 'Delicious Shake.', 
            price: 4.99 
          },
        ],
        reviews: [
          { 
            user: users[4]._id, 
            rating: 10, 
            comment: 'Amazing food and service, Best Shakes in the world!!!', 
            date: '2024-06-01' 
          },
          { 
            user: users[5]._id, 
            rating: 9, 
            comment: 'Great food great value!!.', 
            date: '2024-06-21' }
        ]
      },
      {
        name: 'Sams BBQ Joint',
        address: '567 Sam Hywy, Silver Spring, MD 23233',
        phone: '555-333-3333',
        menu: [
          { 
            name: 'Half Rack Ribs Platter', 
            description: 'A tasty half rack of ribs in savior bbq sauce with 2 sides.', 
            price: 15.99 
          },
          { 
            name: 'Full Rack Ribs Platter', 
            description: 'A tasty half rack of ribs in savior bbq sauce with 3 sides.', 
            price: 23.99 
          },
          { 
            name: 'Pulled Chicken Platter', 
            description: 'Pulled chicken sandwich with fries', 
            price: 11.99 
          },
          { 
            name: 'Pulled Pork Platter', 
            description: 'Pulled pork sandwich with fries.', 
            price: 10.99 
          },
          { 
            name: 'Reg Fountain Drink', 
            description: 'Fountain Drink.', 
            price: 1.99 
          },
          { 
            name: 'Lg Fountain Drink', 
            description: 'Fountain Drink.', 
            price: 2.99 
          },
        ],
        reviews: [
          { 
            user: users[6]._id, 
            rating: 10, 
            comment: 'Amazing food and service, Ribs fall off the bone!!!', 
            date: '2024-07-12' 
          },
          { 
            user: users[7]._id, 
            rating: 9, 
            comment: 'Great food great value!!.', 
            date: '2024-06-23' 
          }
        ]
      },
      {
        name: 'Sabas Scillian Pizza Place',
        address: '789 Saba St, Columbia, MD 56565',
        phone: '555-444-4444',
        menu: [
          { 
            name: 'Pepperoni Pizza', 
            description: 'A delicious pepperoni pizza.', 
            price: 9.99 
          },
          { 
            name: 'Margherita Pizza', 
            description: 'Classic Margherita with fresh basil.', 
            price: 8.99 
          },
          { 
            name: 'Spaghetti w/ meat sauce', 
            description: 'Classic Spaghetti Noodles in a meat sauce.', 
            price: 12.99 
          },
          { 
            name: 'Chicken Fettuccine Alfredo', 
            description: 'Fettuccine Noodles in creamy Alfredo Sauce with grilled chicken.', 
            price: 20.99 
          },
          { 
            name: 'Reg Fountain Drink', 
            description: 'Fountain Drink.', 
            price: 1.99 
          },
          { 
            name: 'Lg Fountain Drink', 
            description: 'Fountain Drink.', 
            price: 2.99 
          },
        ],
        reviews: [
          { user: users[8]._id, 
            rating: 10, 
            comment: 'Amazing food and service, Great Pizza!!!', 
            date: '2024-07-01' 
          },
          { 
            user: users[9]._id, 
            rating: 9, 
            comment: 'Great food great value!!.', 
            date: '2024-07-21' 
          }
        ]
      }
    ];

    // Arrays to store references
    const restaurantInstances = [];
    const dishInstances = [];

    for (const restaurantData of restaurantsData) {
      // create new restaurant
      const restaurant = new Restaurant({
        name: restaurantData.name,
        address: restaurantData.address,
        phone: restaurantData.phone,
      });

      // save restaurant and push onto ref array
      await restaurant.save();
      restaurantInstances.push(restaurant);

      // create and save dishes using menu and menu items
      for (const menuItemData of restaurantData.menu) {
        const dish = new Dish({
          name: menuItemData.name,
          description: menuItemData.description,
          price: menuItemData.price,
          restaurant: restaurant._id,
        });

        await dish.save();
        restaurant.dishes.push(dish);
        dishInstances.push(dish);
      }

      // create and save reviews
      for (const reviewData of restaurantData.reviews) {
        const review = new Review({
          user: reviewData.user,
          restaurant: restaurant._id,
          rating: reviewData.rating,
          comment: reviewData.comment,
          date: new Date(reviewData.date),
        });

        await review.save();
        restaurant.reviews.push(review);
      }

      await restaurant.save();
    }

    console.log("Restaurants, dishes, and reviews seeded");

    // Seed orders using saved instances
    const orders = [
      {
        user: users[2]._id,
        restaurant: restaurantInstances[0]._id,
        dishes: [
          { dish: 
            dishInstances[0]._id, 
            quantity: 2 },
          { 
            dish: dishInstances[1]._id, 
            quantity: 1 },
        ],
        totalPrice: 41.97,
        status: 'Completed',
        orderDate: new Date('2024-07-28'),
      },
      {
        user: users[3]._id,
        restaurant: restaurantInstances[1]._id,
        dishes: [
          { 
            dish: dishInstances[2]._id, 
            quantity: 3 
          },
          { 
            dish: dishInstances[3]._id, 
            quantity: 1 
          },
        ],
        totalPrice: 29.95,
        status: 'Pending',
        orderDate: new Date('2024-07-29'),
      },
    ];

    for (const orderData of orders) {
      const order = new Order(orderData);
      await order.save();
    }

    console.log("Orders seeded");


  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedData;
