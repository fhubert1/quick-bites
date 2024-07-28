import React from "react";
import styles from "../src/App.module.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom"
import { 
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className={styles.App}>
     <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
     </ApolloProvider>
    </div>
  );
}

export default App;
