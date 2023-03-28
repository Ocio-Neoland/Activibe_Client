import '../Sections/Sections.css';
import './Filter.css';

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CityContext } from '../../Context/CityContext';
import { SearchContext } from '../../Context/SearchContext';
import { API } from '../../Services/API';

const Filter = () => {
  const [filter, setFilter] = useState({});
  const { city } = useContext(CityContext);
  const { setSearchFinish, searchFinish } = useContext(SearchContext);

  const [loaded, setLoaded] = useState(false);
  let search;
  const filters = (data) => {
    search = sessionStorage.getItem('search');

    if (!data.length) {
      setLoaded(false);
    } else {
      const searchActivities = data.filter((activity) =>
        activity.name.toLowerCase().includes(search),
      );
      console.log();
      setFilter(searchActivities);
    }
  };

  const getAllActivities = () => {
    API.get(`/activities/${city}`).then((res) => {
      filters(res.data);

      setLoaded(true);
    });
  };
  useEffect(() => {
    getAllActivities();
    setSearchFinish(false);
  }, [searchFinish]);
  return (
    <main>
      {' '}
      {loaded ? (
        <div className="ocio-title-center">
          <h2>
            Hemos encontrado {filter.length}
            {filter.length === 1 ? ' coincidencia' : ' coindicencias'} en tu búsqueda
          </h2>
          <div className="ocio-container-filter">
            {filter.length > 0 ? (
              filter.map((activity) => (
                <div className={activity._id} key={activity._id}>
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

                      <img
                        className="imgSection"
                        src={activity.image}
                        alt={activity.name}
                      />
                      <div className="subBox">
                        <strong>{activity.name}</strong>
                        <span>{activity.location}</span>
                        <div className="footerCard">
                          <span className="sectionCity">{activity.city}</span>
                          <p className="stars">{activity.mediaStars} ⭐</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>No hay resultados de la búsqueda</h2>
            )}
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </main>
  );
};

export default Filter;
