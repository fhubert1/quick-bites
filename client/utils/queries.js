import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      id
      userName
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      id
      userName
      email
    }
  }
`;
export const QUERY_DISH = gql`
  query dish($id: ID!) {
    dish(id: $id) {
      id
      name
      description
      price
      image
      category {
        name
      }
    }
  }
`;
export const QUERY_ALL_DISHES = gql`
  query allDishes {
    allDishes {
      id
      name
      description
      price
      image
      category {
        name
    }
  }
}`;

export const QUERY_CHECKOUT = gql`
   query getCheckout($dish: [DishInput!]!) {
    checkout(dish: $dish) {
      session
  }
}
`;
