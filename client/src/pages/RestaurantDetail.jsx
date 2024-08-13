import React, { useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/styles/RestaurantDetail.css';
import { getRandomMenu, menu } from '../../utils/menuItems.js';
import { useStoreContext } from '../../utils/GlobalState.jsx';
import { REMOVE_FROM_CART, ADD_TO_CART } from '../../utils/actions.js';
import { useMutation } from '@apollo/client';
import { ADD_DISH } from '../../utils/mutations';

const RestaurantDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state.restaurant;
  const [randomDishes, setRandomDishes] = useState([]);
  const [state, dispatch] = useStoreContext();
  const [addDish] = useMutation(ADD_DISH);
  const cart = state.cart || [];

  useEffect(() => {
    console.log("Restaurant Object:", restaurant);
    console.log('Restaurant ID:', restaurant.id);

    //Calling getRandomMenu to dynamically render menu dishes
    const dishes = getRandomMenu(menu, 5);
    setRandomDishes(dishes);
    console.log("Random Dishes:", dishes);
  }, []);

  const handleAddToCart = async (dish) => {
    console.log("Dish Object:", dish);
    try {
      await addDish({
        variables: { 
          name: dish.name, 
          description: dish.description, 
          price: dish.price, 
          restaurantId: restaurant.id, //not sure this is right
        }
      });
    
      dispatch({
        type: ADD_TO_CART,
        dish: { ...dish, id: `${restaurant.name}-${dish.name}` }
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = (dish) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: `${restaurant.name}-${dish.name}`
    });
  };


  return (
    <div className='result-container'>
      <div className=' card-body'>
      <img src={restaurant.image_url} alt={restaurant.name} className='menu-tab'/>
      
      <h1 className='restaurant-name'>{restaurant.name}</h1>
      <p className='location'>{restaurant.location}</p>
      <p  className='rating'>Rating: {restaurant.rating}</p>
      </div>
      <h2 className='title'>Menu</h2>
      <ul className='random-dish'>
        {randomDishes.map((dish, index) => (
          <li key={index}>
            <p className='dish'><strong>{dish.name}</strong> - ${dish.price}</p>
            <p  className='dish-description'>{dish.description}</p>
          <button onClick={() => handleAddToCart(dish)}>Add item to cart</button>
          <button
              disabled={!cart.find((p) => p.id === dish.id)}
              onClick={() => removeFromCart(dish)}> Remove from Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
