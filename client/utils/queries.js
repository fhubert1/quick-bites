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
