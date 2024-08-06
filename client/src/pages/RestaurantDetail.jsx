import React, { useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/styles/RestaurantDetail.css';
import { getRandomMenu, menu } from '../../utils/menuItems.js';
import { useStoreContext } from '../../utils/GlobalState.jsx';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../utils/actions.js';

const RestaurantDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state.restaurant;
  const [randomItems, setRandomItems] = useState([]);
  const [state, dispatch] = useStoreContext();
  const cart = state;

  useEffect(() => {
    //Calling getRandomMenu to dynamically render menu items
    const items = getRandomMenu(menu, 5);
    setRandomItems(items);
  }, []);

  const addToCart = (item) => {
    dispatch({
      type: ADD_TO_CART,
      item: { ...item, _id: `${restaurant.name}-${item.name}` }
    });
  };

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: `${restaurant.name}-${item.name}`
    });
  };


  return (
    <div className='result-container'>
      <div className=' card-body'>
      <img src={restaurant.image_url} alt={restaurant.name} className='restaurant-image'/>
      
      <h1>{restaurant.name}</h1>
      <p>{restaurant.location}</p>
      <p>Rating: {restaurant.rating}</p>
      </div>
      <h2>Menu</h2>
      <ul>
        {randomItems.map((item, index) => (
          <li key={index}>{item.name} - {item.price}
          <button onClick={addToCart}>Add item to cart</button>
          <button
              disabled={!cart.find((p) => p._id === item._id)}//check on this
              onClick={removeFromCart}> Remove from Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
