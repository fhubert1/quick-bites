import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                id
                email
                userName
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