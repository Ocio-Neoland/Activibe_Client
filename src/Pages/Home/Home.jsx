import './Home.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Carousel from '../../Components/Carousel/Carousel';

const Home = () => {
  return (
    <main className="ocio-home">
      <Link to="#">
        <h2>Top 10</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Para los amantes de la Naturaleza</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Para los más Deportistas</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Para los más Atrevidos</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Para los amantes de los Juegos de Mesa</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Para los más Exóticos</h2>
      </Link>
      <Carousel />
      <Link to="#">
        <h2>Otras Actividades...</h2>
      </Link>
      <Carousel />
    </main>
  );
};

export default Home;
