import './Home.css';

import React, { useContext, useEffect, useState } from 'react';

import Carousel from '../../Components/Carousel/Carousel';
import { CityContext } from '../../Context/CityContext';
import { hero } from '../../data/data';
import { API } from '../../Services/API';

const Home = () => {
  const { city } = useContext(CityContext);
  const [activities, setActivities] = useState('');
  const [naturaleza, setNaturaleza] = useState('');
  const [deportes, setDeportes] = useState('');
  const [adrenalina, setAdrenalina] = useState('');
  const [exoticos, setExoticos] = useState('');
  const [juegos, setJuegos] = useState('');
  const [otros, setOtros] = useState('');
  const [loaded, setLoaded] = useState(false);

  const filters = (data) => {
    if (!data.length) {
      setLoaded(false);
    } else {
      const naturActivities = data.filter((activity) => activity.type === 'Naturaleza');

      const deporActivities = data.filter((activity) => activity.type === 'Deportes');
      const adreActivities = data.filter((activity) => activity.type === 'Adrenalina');
      const exoActivities = data.filter((activity) => activity.type === 'Exoticos');
      const otroActivities = data.filter((activity) => activity.type === 'Otros');
      const juegosActivities = data.filter(
        (activity) => activity.type === 'Juegos de mesa',
      );
      setNaturaleza(naturActivities.slice(0, 10));
      setDeportes(deporActivities.slice(0, 10));
      setAdrenalina(adreActivities.slice(0, 10));
      setExoticos(exoActivities.slice(0, 10));
      setOtros(otroActivities.slice(0, 10));
      setJuegos(juegosActivities.slice(0, 10));
    }
  };
  const getAllActivities = () => {
    API.get(`/activities/${city}`).then((res) => {
      filters(res.data);
    });
  };

  const getTop10 = () => {
    API.get(`/activities/${city}/top10`).then((res) => {
      setActivities(res.data);
    });
  };

  // const typesCarousel = [
  //   [activities, 'Top 10 →'],
  //   [naturaleza, 'Para los amantes de la Naturaleza → '],
  //   [deportes, 'Para los más Deportistas → '],
  //   [adrenalina, 'Para los más Atrevidos → '],
  //   [juegos, 'Para los amantes de los Juegos de Mesa → '],
  //   [exoticos, 'Para los más Exóticos →'],
  //   [otros, 'Otras Actividades... → '],
  // ];

  useEffect(() => {
    getAllActivities();
    getTop10();
    setLoaded(true);
  }, [city]);

  const filter = hero.filter((filt) => filt.name === city);

  return (
    <main className="ocio-home">
      {loaded ? (
        <div className="ocio-container-home">
          {/* {typesCarousel.map((type) => {
            console.log(type[1]);
            <Carousel prop={type[0]} title={type[1]} />;
          })} */}

          <div
            className="hero-home"
            style={{ backgroundImage: `url(${filter[0].img})`, backgroundSize: `cover` }}
          >
            <h1 className="hero-name">{filter[0].name}</h1>
          </div>
          <div className="subHero-home">
            <p>{filter[0].quote}</p>
          </div>
          <h2>Top 10 →</h2>
          <Carousel prop={activities} />
          <h2>Para los amantes de la Naturaleza →</h2>
          <Carousel prop={naturaleza} />
          <h2>Para los más Deportistas →</h2>
          <Carousel prop={deportes} />
          <h2>Para los más Atrevidos →</h2>
          <Carousel prop={adrenalina} />
          <h2>Para los amantes de los Juegos de Mesa →</h2>
          <Carousel prop={juegos} />
          <h2>Para los más Exóticos →</h2>
          <Carousel prop={exoticos} />
          <h2>Otras Actividades... →</h2>
          <Carousel prop={otros} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </main>
  );
};

export default Home;
