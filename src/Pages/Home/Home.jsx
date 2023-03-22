import './Home.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Carousel from '../../Components/Carousel/Carousel';
import { API } from '../../Services/API';

const Home = () => {
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
    API.get(`/activities`).then((res) => {
      filters(res.data);
    });
  };

  const getTop10 = () => {
    API.get(`/activities/top10`).then((res) => {
      setActivities(res.data);
    });
  };

  useEffect(() => {
    getAllActivities();
    getTop10();
    setLoaded(true);
  }, []);

  return (
    <main className="ocio-home">
      {loaded ? (
        <div>
          <Link to="#">
            <h2>Top 10</h2>
          </Link>
          <Carousel prop={activities} />
          <Link to="#">
            <h2>Para los amantes de la Naturaleza</h2>
          </Link>
          <Carousel prop={naturaleza} />
          <Link to="#">
            <h2>Para los más Deportistas</h2>
          </Link>
          <Carousel prop={deportes} />
          <Link to="#">
            <h2>Para los más Atrevidos</h2>
          </Link>
          <Carousel prop={adrenalina} />
          <Link to="#">
            <h2>Para los amantes de los Juegos de Mesa</h2>
          </Link>
          <Carousel prop={juegos} />
          <Link to="#">
            <h2>Para los más Exóticos</h2>
          </Link>
          <Carousel prop={exoticos} />
          <Link to="#">
            <h2>Otras Actividades...</h2>
          </Link>
          <Carousel prop={otros} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </main>
  );
};

export default Home;
