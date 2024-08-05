const typeDefs = `
  type Auth {
    token: ID
    user: User
  }

  type User {
    id: ID!
    name: String
    email: String!
    userName: String!
    address: String
    phone: String
    orders: [Order]
    reviews: [Review]
  }

  type Restaurant {
    id: ID!
    name: String!
    address: String!
    phone: String!
    menu: [MenuItem]
    sides: [Side]    
    dishes: [Dish]
    reviews: [Review]
  }

  type MenuItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Side {
    id: ID!
    name: String!
    description: String!
  }

  type Review {
    id: ID!
    user: User!
    restaurant: Restaurant!
    dish: Dish!
    rating: Int!
    comment: String!
    date: String!
  }

  type Dish {
    id: ID!
    name: String!
    description: String!
    price: Float!
    restaurant: Restaurant
    reviews: [Review] 
  }

  type Order {
    id: ID!
    user: User!
    restaurant: Restaurant!
    dishes: [OrderDish]
    totalPrice: Float!
    status: String!
    orderDate: String!
  }

  type OrderDish {
    dish: Dish!
    quantity: Int!
  }

  type Review {
    id: ID!
    user: User!
    restaurant: Restaurant!
    dish: Dish!
    rating: Int!
    comment: String
    date: String!
  }

  type Checkout {
    session: ID!
  }
      
  type Query {
    users: [User]
    user(id: ID!): User
    restaurants: [Restaurant]
    restaurant(id: ID!): Restaurant
    dishes: [Dish]
    dish(id: ID!): Dish
    orders: [Order]
    order(id: ID!): Order
    reviews: [Review]
    review(id: ID!): Review
    checkout(dish: [OrderDishInput]!): Checkout    
  }

  type Mutation {
    addUser(name: String, email: String!, userName: String!, password: String!, address: String, phone: String): Auth
    updateUser(name: String!, email: String!, userName: String!, password: String!, address: String, phone: String): User
    addRestaurant(name: String!, address: String!, phone: String!): Restaurant
    addDish(name: String!, description: String!, price: Float!, restaurantId: ID!): Dish
    addOrder(userId: ID!, restaurantId: ID!, dishes: [OrderDishInput]!, totalPrice: Float!, status: String!): Order
    addReview(userId: ID!, restaurantId: ID!, dishId: ID!, rating: Int!, comment: String): Review
    login(userName: String!, password: String!): Auth
  }

  input OrderDishInput {
    dishId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
