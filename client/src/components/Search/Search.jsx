import { useState } from 'react';
import { searchYelpRestaurants } from '../../../utils/api';
import './Search.css';
import { useNavigate } from 'react-router-dom';

const SearchRestaurants = () => {
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchInput || !location) {
      return false;
    }

    try {
      const data = await searchYelpRestaurants(searchInput, location);
      console.log('API Response:', data);
      const restaurantData = data.businesses.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        image_url: restaurant.image_url,
        url: restaurant.url,
        rating: restaurant.rating,
        location: restaurant.location.display_address.join(', '),
      }));

      setSearchedRestaurants(restaurantData);
      setSearchInput('');
      setLocation('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (restaurant) => {
    console.log('Clicked restaurant:', restaurant);
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant} });
    
  };

    return (
      
      <div className="restaurant-search">
        <div className='search-container'>
        <h1 className='title'>Find Restaurants</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for restaurants"
            className="search-input"
          />
          <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="search-input"
        />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        </div>
  
        <div className="results-container">
          {searchedRestaurants.length > 0 ? (
            searchedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card" onClick={() => handleCardClick(restaurant)}>
                <img
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-address">{restaurant.location.address1}</p>
                  <p className="restaurant-rating">Rating: {restaurant.rating}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='non-found'>No restaurants found!</p>
          )}
        </div>
      </div>
    );
  };

export default SearchRestaurants;
