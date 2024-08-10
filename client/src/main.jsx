
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import "@fontsource/bungee-shade";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound.jsx";
import RestaurantDetail from "./pages/RestaurantDetail.jsx";
import Cart from './components/Cart/Cart.jsx';
import Success from './pages/Success.jsx';

// Apollo Client setup
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

// Router setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetail />
      },
      {
        path: '/cart',
        element: <Cart />
      }, {
        path: '/success',
        element: <Success />
      }
    ],
  },
]);

// Render the application with ApolloProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
