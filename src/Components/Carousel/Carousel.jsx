import './Carousel.css';

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ prop }) => {
  const carouselRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    carouselRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="ocio-carousel">
      <button className=" carousel-button-left" onClick={() => handleScroll(-335)}>
        ⟨
      </button>
      <section className="container-carousel" ref={carouselRef}>
        {prop.length &&
          prop.map((item) => (
            <Link to={`/${item.type}/${item._id}`} key={item._id}>
              <div
                className="item"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: `cover`,
                }}
              >
                <h3 className="na">{item.name}</h3>
                <h3 className="nm">
                  <span>⭐</span>
                  {item.mediaStars.toFixed(1)}
                </h3>
              </div>
            </Link>
          ))}
      </section>
      <button className=" carousel-button-right" onClick={() => handleScroll(335)}>
        ⟩
      </button>
    </div>
  );
};

export default Carousel;
