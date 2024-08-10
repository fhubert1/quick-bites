import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password){
            token
            user {
                id
            }
        }
    }
`;

export const ADD_USER = gql`
   mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password){
      token
      user {
        id
      }
    }
  }
`;

export const ADD_DISH = gql`
  mutation AddDish($name: String!, $price: Float!, $description: String, $restaurantId: ID!) {
    addDish(name: $name, price: $price, description: $description, restaurantId: $restaurantId) {
      id
      name
      price
      description
    }
  }
`;

export const ADD_ORDER = gql`
mutation AddOrder($dishes: [DishInput!]!, $totalPrice: Float!) {
  addOrder(dishes: $dishes, totalPrice: $totalPrice) {
    id
    dishes {
      name
      quantity
      price
    }
    totalPrice
    status
    orderDate
  }
}
`;