import './App.css';

import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';

const App = () => {
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const storedVideo = sessionStorage.getItem('video');
    if (storedVideo) {
      setVideo(true);
    }
  }, []);

  const handleSetVideo = () => {
    sessionStorage.setItem('video', true);
    setVideo(true);
  };

  return (
    <div>
      {video ? (
        <BaseLayout>
          <Header />
          <Outlet />
          <Footer />
        </BaseLayout>
      ) : (
        <div className="ocio-video">
          <video className="ocio-video-1" playsInline autoPlay muted loop>
            <source
              src="https://res.cloudinary.com/dpxyn2bps/video/upload/v1680173971/Bienvenido_a_zwhpno.mp4"
              type="video/mp4"
            />
          </video>
          <button className="ocio-btn-video" onClick={handleSetVideo}>
            Entra Aqui
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
