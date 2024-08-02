import React from 'react';
import '../assets/styles/Home.css';
import quickbitesGif from '../assets/icon/quickbitesGif.gif';
import SearchRestaurants from '../components/Search/Search'; 

const Home = () => (
  <div className="homepage">
    <SearchRestaurants/>
    
  </div>
);

export default Home;


//<img src={quickbitesGif} alt="Central GIF" className="centeredGif" />