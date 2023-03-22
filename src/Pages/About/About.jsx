import './About.css';

import React from 'react';

import CardAbout from '../../Components/CardAbout/CardAbout';

const About = () => {
  return (
    <main className="About">
      <div className="containerAbout">
        <div className="mas">
          <p>Sobre nosotros:</p>
        </div>
        <CardAbout />
      </div>
    </main>
  );
};

export default About;
