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
  const [number, setNumber] = useState(1);
  const [info, setInfo] = useState();

  const getSection = () => {
    API.get(`/sections/${city}/${name}?page=${number}&limit=10`).then((res) => {
      setActivities(res.data.results);
      setInfo(res.data.info);

      setLoaded(true);
    });
  };

  const chooseFavorite = (value, activity) => {
    console.log(activity.favorites.includes(id));
    const info = {
      id: id,
    };

    API.put(`/activities/favorites/${value}`, info, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    }).then(() => {
      getSection();
    });
  };

  useEffect(() => {
    getSection();
  }, [name, number]);

  const filter = types.filter((filt) => filt.name === name);

  return (
    <main className="mainSection">
      <div
        className="divHero"
        style={{ backgroundImage: `url(${filter[0].img2})`, backgroundSize: `cover` }}
      >
        <h1 className="hero">{name}</h1>
      </div>
      <div className="activitiesSections">
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
                    onClick={() => chooseFavorite(activity._id, activity)}
                    style={{ color: activity.favorites.includes(id) ? 'red' : 'white' }}
                  >
                    {activity.favorites ? (
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
          <h2>Cargando...</h2>
        )}
      </div>
      <div className="prevNext">
        {loaded ? (
          <>
            {info.prev !== null && (
              <button
                className="perfil-button"
                onClick={() => {
                  setNumber(number - 1);
                }}
              >
                Anterior
              </button>
            )}
            {info.next !== null && (
              <button
                className="perfil-button"
                onClick={() => {
                  setNumber(number + 1);
                }}
              >
                Siguiente
              </button>
            )}
          </>
        ) : (
          <h2>Cargando...</h2>
        )}
      </div>
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
