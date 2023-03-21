import './Carousel.css';

import React from 'react';

const Carousel = ({ prop }) => {
  return (
    <div className="flex container">
      {prop.map((item) => (
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
      ))}
    </div>
  );
};

export default Carousel;
