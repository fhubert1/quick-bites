require('dotenv').config();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const { User, Restaurant, Dish, Order, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // Load Stripe with the secret key from .env


const resolvers = {

    Query: {
        users: async (_, __, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('You must be logged in to view users.');
                }
                return await User.find();
            } catch (err) {
                console.error(err);
                throw new Error("Error - failed to get users");
            }
        },
        user: async (_, { _id }, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('You must be logged in to view this user.');
                }
                return await User.findById(_id);

            } catch (err) {
                console.error(err);
                throw new Error("Error - failed to get user by id");
            }
        },
        restaurants: async () => {
            try {
                return await Restaurant.find();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get restaurants');
            }
        },
        restaurant: async (_, { _id }) => {
            try {
                return await Restaurant.findById(_id);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get restaurants by id');
            }
        },
        dishes: async () => {
            try {
                return await Dish.find();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get dishes');
            }
        },
        dish: async (_, { _id }) => {
            try {
                return await Dish.findById(_id);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get dishe by id');
            }
        },
        orders: async (_, __, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('You must be logged in to view orders.');
                }
                return await Order.find({ user: user._id });
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get orders');
            }
        },
        order: async (_, { _id }, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('You must be logged in to view this order.');
                }
                return await Order.findById(_id);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get order by id');
            }
        },
        reviews: async () => {
            try {
                return await Review.find();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get reviews');
            }
        },
        review: async (_, { _id }) => {
            try {
                return await Review.findById(_id);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to get review by id');
            }
        },
        checkout: async (parent, { dish }, context) => {
            console.log("Received dish data:", dish);
            try {
                const url = new URL(context.headers.referer).origin;

                // Build line_items array for Stripe
                const line_items = await Promise.all(dish.map(async (dish) => {
                    const product = await Dish.findOne({name: dish.name});
                    if (!product) {
                        throw new Error(`Dish not found: ${dish.name}`);
                    }
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product.name,
                                description: product.description,
                                images: [`${url}/images/${product.image}`],
                            },
                            unit_amount: Math.round(product.price) * 100,
                        },
                        quantity: dish.quantity,
                    };
                }));

                // Create Stripe checkout session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items,
                    mode: 'payment',
                    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${url}/`,
                });

                return { session: session.id };
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to create checkout session');
            }
        },
    },
    Mutation: {
        addUser: async (_, { name, email, userName, password, address, phone }) => {
            try {
                const user = new User({
                    name,
                    email,
                    userName,
                    password,
                    address,
                    phone
                });
                // save user to database
                await user.save();

                // generate token for user
                const token = signToken(user);
                console.log("generated token from the server: " + token);

                return { token, user }

            } catch (err) {
                console.error(err);
                throw new Error("Error - failed to add user");
            }
        },
        login: async (parent, { userName, password }) => {
            try {
                console.log("Login attempt received");
                console.log("userName", userName)
                const user = await User.findOne({ userName });

                console.log("User found:", user);
                if (!user) {
                    console.error("User not found");
                    throw AuthenticationError;
                }

                const correctPw = await user.isCorrectPassword(password);
                console.log("Password correct:", correctPw);

                if (!correctPw) {
                    console.error("Incorrect password");
                    throw AuthenticationError;
                }

                const token = signToken(user);
                console.log("Generated token:", token);

                return { token, user };

            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to log in');
            }
        },
        updateUser: async (_, { name, email, userName, password, address, phone }) => {
            try {
                if (!user || user._id !== _id.toString()) {
                    throw new AuthenticationError('You are not authorized to update this user.');
                }

                // Find the user by ID
                const userToUpdate = await User.findById(_id);
                if (!userToUpdate) {
                    throw new Error('User not found');
                }

                // Update user fields
                if (name) {
                    userToUpdate.name = name;
                }

                if (email) {
                    userToUpdate.email = email;
                }

                if (userName) {
                    userToUpdate.userName = userName;
                }

                if (address) {
                    userToUpdate.address = address;
                }

                if (phone) {
                    userToUpdate.phone = phone;
                }

                // Hash new password if provided
                if (password) {
                    user.password = await bcrypt.hash(password, 10);
                }

                // Save the updated user
                return await userToUpdate.save();

            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to update user');
            }
        },
        addRestaurant: async (_, { name, address, phone }) => {
            try {
                const restaurant = new Restaurant({ name, address, phone });
                return await restaurant.save();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to add restaurant');
            }
        },
        addDish: async (_, { name, description, price, restaurantId }) => {
            try {
                const dish = new Dish({ 
                    name, 
                    description, 
                    price, 
                    restaurantId, 
                }); 
                return await dish.save();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to add dish');
            }
        },
        addOrder: async (_, {dishes, totalPrice }) => {
            try {
                // if (!user || user._id !== userId) {
                //     throw new AuthenticationError('You are not authorized to create an order for this user.');
                // }

                
                console.log("Incoming dishes data:", dishes);
                const order = new Order({
                    dishes: dishes.map(dishInput => ({
                      name: dishInput.name,
                      quantity: dishInput.quantity,
                      price: dishInput.price
                    })),
                    totalPrice,
                    status: 'Pending',
                    orderDate: new Date().toISOString(),
                  })
                  console.log("order:", order)
                return await order.save();

            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to add order');
            }
        },
        addReview: async (_, { userId, restaurantId, dishId, rating, comment }, { user }) => {
            try {
                if (!user || user._id !== userId) {
                    throw new AuthenticationError('You are not authorized to create a review for this user.');
                }

                const review = new Review({
                    user: ObjectId(userId),
                    restaurant: restaurantId ? ObjectId(restaurantId) : null,
                    dish: dishId ? ObjectId(dishId) : null,
                    rating,
                    comment,
                    date: new Date().toISOString(),
                });
                return await review.save();
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to add review');
            }
        },
    },
    User: {
        orders: async (user) => {
            try {
                return await Order.find({ user: user._id });
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch orders for user');
            }
        },

    },
    Restaurant: {
        dishes: async (restaurant) => {
            try {
                return await Dish.find({ restaurant: restaurant._id });
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch dishes for restaurant');
            }
        },
        reviews: async (restaurant) => {
            try {
                return await Review.find({ restaurant: restaurant._id });
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch reviews for restaurant');
            }
        },
    },
    Dish: {
        restaurant: async (dish) => {
            try {
                return await Restaurant.findById(dish.restaurant);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch restaurant for dish');
            }
        },
        reviews: async (dish) => {
            try {
                return await Review.find({ dish: dish._id });
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch reviews for dish');
            }
        },

    },
    Order: {
        user: async (order) => {
            try {
                return await User.findById(order.user);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch user for order');
            }
        },
        restaurant: async (order) => {
            try {
                return await Restaurant.findById(order.restaurant);
            } catch (err) {
                console.error(err);
                throw new Error('Error - fetch restaurant for order');
            }
        },
        dishes: async (order) => {
            try {
                return await Promise.all(order.dishes.map(async (orderDish) => {
                    const dish = await Dish.findById(orderDish.dish);
                    return { dish, quantity: orderDish.quantity };
                }));
            } catch (err) {
                console.error(err);
                throw new Error('Error - fetch dishes for order');
            }
        },
    },
    Review: {
        user: async (review) => {
            try {
                return await User.findById(review.user);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch user for review');
            }
        },
        restaurant: async (review) => {
            try {
                return await Restaurant.findById(review.restaurant);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch restaurant for review');
            }
        },
        dish: async (review) => {
            try {
                return await Dish.findById(review.dish);
            } catch (err) {
                console.error(err);
                throw new Error('Error - failed to fetch dish for review');
            }
        },
    },

};

module.exports = resolvers;
