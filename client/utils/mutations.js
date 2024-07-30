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
   mutation AddUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        id
        email
        userName
      }
    }
  }
`;