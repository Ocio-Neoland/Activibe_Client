/* eslint-disable jsx-a11y/no-static-element-interactions */
import './Sections.css';

import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CityContext } from '../../Context/CityContext';
import { UserContext } from '../../Context/UserContext';
import { types } from '../../data/data.js';
import { API } from '../../Services/API';

const Sections = () => {
  const [activities, setActivities] = useState('');
  const { city } = useContext(CityContext);
  const [loaded, setLoaded] = useState(false);
  const { id } = useContext(UserContext);
  const { name } = useParams();
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }); // cargar favoritos del almacenamiento local al cargar la página
  const getSection = () => {
    API.get(`/sections/${city}/${name}`).then((res) => {
      setActivities(res.data.results);
      setLoaded(true);
    });
  };

  const chooseFavorite = (value) => {
    const info = {
      id: id,
    };
    console.log(info);
    console.log(value);
    API.put(`/activities/favorites/${value}`, info, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    }).then(() => {
      if (favorites.includes(value)) {
        setFavorites(favorites.filter((fav) => fav !== value)); // quitar favorito
      } else {
        setFavorites([...favorites, value]); // agregar favorito
      }
    });
  };

  useEffect(() => {
    getSection();
  }, []);
  useEffect(() => {
    // Guardar los favoritos en el almacenamiento local cada vez que cambian
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filter = types.filter((filt) => filt.name === name);

  return (
    <main className="mainSection">
      <div
        className="divHero"
        style={{ backgroundImage: `url(${filter[0].img2})`, backgroundSize: `cover` }}
      >
        <h1 className="hero">{name}</h1>
      </div>
      {loaded ? (
        activities.map((activity) => (
          <div className="av-section-container" key={activity._id}>
            <div className="box">
              <div className="headerCard">
                <h3 className="activity">{activity.type}</h3>
                <Link
                  to={`/${activity.type}/${activity._id}`}
                  value={activity._id}
                  className="masInfo"
                >
                  + info
                </Link>
              </div>

              <img className="imgSection" src={activity.image} alt={activity.name} />
              <div className="subBox">
                <strong>{activity.name}</strong>
                <span>{activity.location}</span>
                <div className="footerCard">
                  <span className="sectionCity">{activity.city}</span>
                  <p className="stars">{activity.mediaStars} ⭐</p>
                </div>
                <button
                  className="deleteLike"
                  onClick={() => chooseFavorite(activity._id)}
                  style={{ color: favorites.includes(activity._id) ? 'red' : 'white' }}
                >
                  {favorites ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default Sections;
{
  /* <div onClick={handleClick}>
{isFavorite ? (
  <i className="fas fa-heart"></i>
) : (
  <i className="far fa-heart"></i>
)} */
}
