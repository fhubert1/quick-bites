import React, { useState } from "react";
import styles from "../src/App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Cart from './components/Cart/Cart';
import { Outlet } from "react-router-dom";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from "../utils/GlobalState";

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
  const [showLogin, setShowLogin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <ApolloProvider client={client}>
        <div className={styles.App}>
          <StoreProvider>
            <Navbar setShowLogin={setShowLogin} toggleCart={toggleCart} />
            {cartOpen && <Cart />}
            <Outlet />
          </StoreProvider>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
