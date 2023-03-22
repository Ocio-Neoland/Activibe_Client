import './Carousel.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ prop }) => {
  return (
    <section className="container">
      <button type="button">◁</button>
      {prop.length &&
        prop.map((item) => (
          <Link to={`/${item.type}/${item._id}`} key={item._id}>
            <div
              className="item"
              style={{ backgroundImage: `url(${item.image})`, backgroundSize: `cover` }}
              key={item._id}
            >
              <h3 className="nm">
                <span>⭐</span>
                {item.mediaStars}
              </h3>
              <h3 className="na">{item.name}</h3>
            </div>
          </Link>
        ))}
      <button type="button">▷</button>
    </section>
  );
};

export default Carousel;
