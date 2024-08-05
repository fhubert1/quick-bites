import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/styles/RestaurantDetail.css';
import  randomItems from '../../utils/menuItems.js';

const RestaurantDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state.restaurant;

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
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
