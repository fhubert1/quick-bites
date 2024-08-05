//import React from "react";
import styles from "../src/App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Cart from './components/Cart';
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
    <ApolloProvider client={client}>
    <div className={styles.App}>
      <Navbar />
      <Cart/>
      <Outlet />
    </div>
    </ApolloProvider>
  );
}

export default App;
