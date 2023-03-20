import './Sections.css';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API } from '../../Services/API';

const Sections = () => {
  const [activities, setActivities] = useState('');
  const [loaded, setLoaded] = useState(false);
  const { name } = useParams();

  const getSection = async () => {
    API.get(`/sections/${name}`).then((res) => {
      setActivities(res.data.results);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getSection();
  }, [activities]);

  return (
    <main>
      {loaded ? (
        activities.map((activity) => (
          <figure key={activity._id}>
            <h2>{activity.name}</h2>
            <img src={activity.image} alt={activity.name} />
            <Link to={`/${activity.type}/${activity._id}`} value={activity._id}>
              Mas info
            </Link>
          </figure>
        ))
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default Sections;
