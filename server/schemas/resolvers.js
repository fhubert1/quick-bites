const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const { User, Restaurant, Dish, Order, Review } = require('../models');
const { restaurants } = require('../data/restaurantData');

const resolvers = {

    Query: {
        restaurants: () => restaurants,
        restaurant: (parent, { id }) => restaurants.find(restaurant => restaurant.id === id),
    },

    Query: {
        users: async () => await User.find(),
        user: async (_, { _id }) => await User.findById(_id),
        restaurants: async () => await Restaurant.find(),
        restaurant: async (_, { _id }) => await Restaurant.findById(_id),
        dishes: async () => await Dish.find(),
        dish: async (_, { _id }) => await Dish.findById(_id),
        orders: async () => await Order.find(),
        order: async (_, { _id }) => await Order.findById(_id),
        reviews: async () => await Review.find(),
        review: async (_, { _id }) => await Review.findById(_id),
    },
    Mutation: {
        addUser: async (_, { name, email, password, address, phone }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, address, phone });
            return await user.save();
        },
        addRestaurant: async (_, { name, address, phone }) => {
            const restaurant = new Restaurant({ name, address, phone });
            return await restaurant.save();
        },
        addDish: async (_, { name, description, price, restaurantId }) => {
            const dish = new Dish({ name, description, price, restaurant: ObjectId(restaurantId) });
            return await dish.save();
        },
        addOrder: async (_, { userId, restaurantId, dishes }) => {
            const order = new Order({
                user: ObjectId(userId),
                restaurant: ObjectId(restaurantId),
                dishes: dishes.map(dish => ({ dish: ObjectId(dish.dishId), quantity: dish.quantity })),
                totalPrice: dishes.reduce((total, dish) => total + dish.price * dish.quantity, 0),
                status: 'Pending',
                orderDate: new Date().toISOString(),
            });
            return await order.save();
        },
        addReview: async (_, { userId, restaurantId, dishId, rating, comment }) => {
            const review = new Review({
                user: ObjectId(userId),
                restaurant: restaurantId ? ObjectId(restaurantId) : null,
                dish: dishId ? ObjectId(dishId) : null,
                rating,
                comment,
                date: new Date().toISOString(),
            });
            return await review.save();
        },
    },
    User: {
        orders: async (user) => await Order.find({ user: user._id }),
    },
    Restaurant: {
        dishes: async (restaurant) => await Dish.find({ restaurant: restaurant._id }),
        reviews: async (restaurant) => await Review.find({ restaurant: restaurant._id }),
    },
    Dish: {
        restaurant: async (dish) => await Restaurant.findById(dish.restaurant),
        reviews: async (dish) => await Review.find({ dish: dish._id }),
    },
    Order: {
        user: async (order) => await User.findById(order.user),
        restaurant: async (order) => await Restaurant.findById(order.restaurant),
        dishes: async (order) => {
            return order.dishes.map(async (orderDish) => ({
                dish: await Dish.findById(orderDish.dish),
                quantity: orderDish.quantity,
            }));
        },
    },
    Review: {
        user: async (review) => await User.findById(review.user),
        restaurant: async (review) => review.restaurant ? await Restaurant.findById(review.restaurant) : null,
        dish: async (review) => review.dish ? await Dish.findById(review.dish) : null,
    },
};

module.exports = resolvers;
