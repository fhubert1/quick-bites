import axios from 'axios';

// Yelp Fusion API search function
export const searchYelpRestaurants = async (query, location) => {
  
  const apiKey = import.meta.env.VITE_YELP_API_KEY;
  const url = 'https://api.yelp.com/v3/businesses/search';


  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        term: query,
        location: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching Yelp:', error);
    throw error;
  }
};
