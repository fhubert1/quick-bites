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
    const user1 = new User({
      name: "John Smith",
      email: "john@smith.com",
      password: await bcrypt.hash("password123", 10),
      //password: "password123",
      address: "123 Main St, Who Cares, MD 20142",
      phone: "555-456-7890",
    });

    const user2 = new User({
      name: "Jane Smith",
      email: "jane@smith.com",
      password: await bcrypt.hash("password456", 10),
      //password: "password123",
      address: "456 Elm St, , Country",
      phone: "987-654-3210",
    });

    await user1.save();
    await user2.save();

    console.log("Users seeded");

    // Seed restaurants
    const restaurant1 = new Restaurant({
      name: "Saba Place",
      address: "123 Eutaw St, Baltimore, MD 12121",
      phone: "555-555-5555",
    });

    const restaurant2 = new Restaurant({
      name: "Sam Burger Joint",
      address: "456 Burgermister St, French Fry, VA 21212",
      phone: "666-666-6666",
    });

    await restaurant1.save();
    await restaurant2.save();

    console.log("Restaurants seeded");

    // Seed dishes
    const dish1 = new Dish({
      name: "Pepperoni Pizza",
      description: "A simply wonderful pepperoni and pineapple pizza.",
      price: 12.99,
      restaurant: restaurant1._id,
    });

    const dish2 = new Dish({
      name: "Cheeseburger",
      description: "The cheesist cheeseburger every made.",
      price: 15.99,
      restaurant: restaurant2._id,
    });

    await dish1.save();
    await dish2.save();

    console.log("Dishes seeded");

    // Seed orders
    const order1 = new Order({
      user: user1._id,
      restaurant: restaurant1._id,
      dishes: [{ dish: dish1._id, quantity: 2 }],
      totalPrice: 19.98,
      status: "Pending",
      orderDate: new Date(),
    });

    const order2 = new Order({
      user: user2._id,
      restaurant: restaurant2._id,
      dishes: [{ dish: dish2._id, quantity: 1 }],
      totalPrice: 24.99,
      status: "Pending",
      orderDate: new Date(),
    });

    await order1.save();
    await order2.save();

    console.log("Orders seeded");

    // Seed reviews
    const review1 = new Review({
      user: user1._id,
      restaurant: restaurant1._id,
      dish: dish1._id,
      rating: 5,
      comment: "Amazing pizza!",
      date: new Date(),
    });

    const review2 = new Review({
      user: user2._id,
      restaurant: restaurant2._id,
      dish: dish2._id,
      rating: 4,
      comment: "Great burger!",
      date: new Date(),
    });

    await review1.save();
    await review2.save();

    console.log("Reviews seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedData;
