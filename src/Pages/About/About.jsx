import './About.css';

import React from 'react';
import CardAbout from '../../Components/CardAbout/CardAbout';

const About = () => {
  return (
    <main className="About">
      <div className="containerAbout">
        <div className="mas">
          <div className="divLogo">
            <img
              className="Logo"
              src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679330249/fotos/activibe-removebg-preview_ib0l8g.png"
              alt="logo"
            />
          </div>
          <p>Sobre nosotros:</p>
        </div>
        <CardAbout />
      </div>
    </main>
  );
};

export default About;
