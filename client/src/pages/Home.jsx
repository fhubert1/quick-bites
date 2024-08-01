import React from 'react';
import '../assets/styles/Home.css';
import quickbitesGif from '../assets/icon/quickbitesGif.gif';

const Home = () => (
  <div className="homepage">
    <img src={quickbitesGif} alt="Central GIF" className="centeredGif" />
  </div>
);

export default Home;


