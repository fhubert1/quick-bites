import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState.jsx';
import { REMOVE_FROM_CART, ADD_TO_CART } from '../../utils/actions.js';
import { useMutation } from '@apollo/client';
import { ADD_DISH } from '../../utils/mutations';
import { getRandomMenu,menu } from '../../utils/menuItems.js'; // Make sure this import is correct
import { idbPromise } from '../../utils/helper';
import '../assets/styles/RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state?.restaurant || {};
  const [randomDishes, setRandomDishes] = useState([]);
  const [state, dispatch] = useStoreContext();
  const [addDish] = useMutation(ADD_DISH);
  const cart = state.cart || [];

  useEffect(() => {
    if (restaurant && restaurant.id) {
      // Simulate fetching dishes
      const dishes = getRandomMenu(menu, 5);
      setRandomDishes(dishes);
    }
  }, [restaurant]);

  const handleAddToCart = async (dish) => {
    try {
      if (restaurant.id) {
        await addDish({
          variables: { 
            name: dish.name, 
            description: dish.description, 
            price: dish.price, 
            restaurantId: restaurant.id,
          }
        });

        dispatch({
          type: ADD_TO_CART,
          dish: { ...dish, purchaseQuantity: 1, id: `${restaurant.name}-${dish.name}` }
        });

        idbPromise('cart', 'put', { ...dish, purchaseQuantity: 1, id: `${restaurant.name}-${dish.name}` });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = (dish) => {
    console.log("Removing dish from cart:", dish);
    dispatch({
      type: REMOVE_FROM_CART,
      id: `${restaurant.name}-${dish.name}`
    });
    idbPromise('cart', 'delete', { id: `${restaurant.name}-${dish.name}` });
  };

  const isInCart = (dish) => {
    return cart.some((p) => p.id === `${restaurant.name}-${dish.name}`);
  };

  return (
    <div className='result-container'>
      {restaurant.name ? (
        <>
          <div className='card-body'>
            <img src={restaurant.image_url || '/path/to/default/image.png'} alt={restaurant.name || 'Restaurant'} className='menu' />
            <h1 className='restaurant-name'>{restaurant.name}</h1>
            <p className='location'>{restaurant.location || 'Location not available'}</p>
            <p className='rating'>Rating: {restaurant.rating || 'No rating'}</p>
          </div>
          <h2 className='title'>Menu</h2>
          <ul className='random-dish'>
            {randomDishes.map((dish, index) => (
              <li key={index}>
                <p className='dish'><strong>{dish.name}</strong> - ${dish.price}</p>
                <p className='dish-description'>{dish.description}</p>
                <button onClick={() => handleAddToCart(dish)}>Add item to cart</button>
                <button
                  disabled={!isInCart(dish)}
                  onClick={() => handleRemoveFromCart(dish)}
                >
                  Remove from Cart
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No restaurant details available.</p>
      )}
    </div>
  );
};

export default RestaurantDetail;
