// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/bungee-shade";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  Menu  from "./pages/Menu";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound.jsx";
import RestaurantDetail from "./pages/RestaurantDetail.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>, 
    children: [
      {
        index: true,
        element: <Home/>
      }, {
        path: '/menu',
        element: <Menu/>
      }, {
        path: '/contact',
        element: <Contact/>
      }, {
        path: '/signup',
        element: <Signup/>
      }, {
        path: '/login',
        element: <Login/>
      }, {
        path: '/restaurant/:id',
        element: <RestaurantDetail />
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
