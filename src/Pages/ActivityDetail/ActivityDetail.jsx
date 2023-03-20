import './ActivityDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../Services/API';

const ActivityDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState('');
  const [loaded, setLoaded] = useState(false);

  const getSection = async () => {
    API.get(`/activities/${id}`).then((res) => {
      setDetails(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  return (
    <main>
      {loaded ? (
        <figure key={details._id}>
          <h2>{details.name}</h2>
          <img src={details.image} alt={details.name} />
        </figure>
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default ActivityDetail;
