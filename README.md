# Quick Bites Food Delivery

## Table of Contents
1. [Introduction](#introduction)
2. [Challenge Elements](#challenge-elements)
3. [Features](#features)
4. [Installation Guide](#installation-guide)
5. [Technologies Used](#technologies-used)
6. [Contribution](#contribution)
7. [License](#license)
8. [Deployed Link](#deployed-link)

## Introduction
Welcome to the Food Delivery App, a modern and intuitive web application built using React. This application provides a seamless food ordering experience, allowing users to browse restaurants, view menus, and place orders directly from their browser.

## Challenge Elements

### User Story
- As a user, I want to be able to securely log in and register so that I can manage my orders and have a personalized experience.
- As a user, I want to browse through a list of restaurants to find those that offer the food I'm craving.
- As a user, I want to view a restaurant’s menu to see available food items and their prices.
- As a user, I want to add items to my cart and place an order so that I can receive my food.
- As a user, I want to securely pay for my order so that I can complete my purchase confidently.
- As a user, I want the application to work well on both desktop and mobile devices so that I can access it from any device.

### Acceptance Criteria
- Users must be able to register with a unique email, password. They should be able to log in with their credentials and be redirected to the home page upon successful login, or see an error message for incorrect credentials. Logout functionality should be available, redirecting users to the login page upon success.
- The application should display a list of restaurants with names, images and allow users to choose their restaurant.
- The menu should display food items with descriptions, prices, and images if available and users should be able to add items to their cart.
- Users should be able to view, update, and remove items in their cart, with the total price and applicable taxes displayed. During checkout, users should review their order, enter delivery information, and select a payment method.
- The checkout page must integrate with a secure payment provider like Stripe, allowing users to enter payment details and complete the transaction securely. A payment confirmation and order receipt should be provided upon successful payment.
- The application should be fully functional and visually appealing on various screen sizes, with mobile responsiveness ensuring easy navigation and interaction. On desktop devices, the application should make full use of available screen space.

## Features
- **Restaurant Listings**: Browse a wide range of restaurants with filters to help you find exactly what you're craving.
- **Menu Navigation**: View detailed menus with food items, prices, and descriptions.
- **Order Placement**: Easily add items to your cart and place orders with a few clicks.
- **User Authentication**: Secure login and registration for a personalized experience.
- **Secure Payment**: Checkout your cart using a secure payment method with Stripe.
- **Responsive Design**: Optimized for both desktop and mobile devices to ensure a smooth user experience.
- **PWA feature: to make the app installable and  works offline or on low-quality networks thanks to service worker caching.

## Installation Guide
- `git clone https://github.com/fhubert1/quick-bites`
- `npm install` to install dependencies.
- `npm install` on the server side followed by `npm run seed`.
- `npm run develop` in the root folder to launch the server.

## Technologies Used
- **React**: For building the user interface with reusable components and state management.
- **React Router**: For handling navigation and routing within the application.
- **Apollo Client**: For managing GraphQL queries and state.
- **CSS Modules**: For modular and scoped styling.
- **Vite**: For fast development and build tooling.

## Contribution
We welcome contributions to the Food Delivery App! If you have suggestions, bug reports, or want to contribute code, please follow these guidelines:
- Fork the repository.
- Create a new branch (`git checkout -b feature/YourFeatureName`).
- Make your changes and commit them (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature/YourFeatureName`).
- Create a new Pull Request.

## License
This project is licensed under the MIT License.

## Deployed Link
Link to the deployed application: 
