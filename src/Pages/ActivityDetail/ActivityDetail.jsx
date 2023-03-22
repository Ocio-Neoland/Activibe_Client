import './ActivityDetail.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API } from '../../Services/API';

const ActivityDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState('');
  const [feeds, setFeeds] = useState('');
  const getSection = async () => {
    API.get(`/activities/${id}`).then((res) => {
      setDetails(res.data);
      setComments(res.data.comments);
      setFeeds(res.data.feeds);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  return (
    <main>
      {loaded ? (
        <figure>
          <div className="ocio-detail-hero">
            <div className="curve"></div>
          </div>
          <div className="ocio-top">
            <section className="ocio-activity-detail">
              <div className="ocio-container-title">
                <h2>{details.name}</h2>
                <img
                  className="ocio-img-details"
                  src={details.image}
                  alt={details.name}
                />
                <h2>Description</h2>
                <p>{details.description}</p>
                <p>{details.location}</p>
              </div>
              <p className="ocio-description"></p>
            </section>
            <section className="ocio-comments">
              <h2>Comentarios de la comunidad</h2>
              {comments.length ? (
                comments.map((comment) => (
                  <article className="ocio-comment" key={comment._id}>
                    <div className="ocio-comment-avatar">
                      <img src={comment.idUser.avatar} alt={comment.idUser.userName} />
                      <h2>{comment.idUser.userName}</h2>
                    </div>
                    <q>
                      <i className="ocio-comment-p">{comment.comment}</i>
                    </q>
                  </article>
                ))
              ) : (
                <h2>Carlos</h2>
              )}
            </section>
          </div>
          <section className="ocio-feeds">
            <h2>Valoraciones de los Usuarios</h2>
            <div className="ocio-media">
              <h2>{details.mediaStars}/5</h2>
              <div className="ocio-media-right">
                {details.mediaStars === 5 ? (
                  <h2>⭐⭐⭐⭐⭐</h2>
                ) : details.mediaStars > 5 || details.mediaStars <= 4 ? (
                  <h2>⭐⭐⭐⭐</h2>
                ) : details.mediaStars > 4 || details.mediaStars <= 3 ? (
                  <h2>⭐⭐⭐</h2>
                ) : details.mediaStars > 3 || details.mediaStars <= 2 ? (
                  <h2>⭐⭐</h2>
                ) : (
                  <h2>⭐</h2>
                )}
                <h2>
                  Basado en {details.feeds.length}
                  {details.feeds.length === 1 ? ' valoracion.' : ' valoraciones.'}
                </h2>
              </div>
            </div>
            {feeds.length ? (
              feeds.map((feed) => (
                <article className="ocio-feed" key={feed._id}>
                  <img src={feed.idUser.avatar} alt={feed.idUser.userName} />
                  <h2>{feed.idUser.userName}</h2>
                  {feed.stars === 5 ? (
                    <h2>⭐⭐⭐⭐⭐</h2>
                  ) : feed.stars > 5 || feed.stars <= 4 ? (
                    <h2>⭐⭐⭐⭐</h2>
                  ) : feed.stars > 4 || feed.stars <= 3 ? (
                    <h2>⭐⭐⭐</h2>
                  ) : feed.stars > 3 || feed.stars <= 2 ? (
                    <h2>⭐⭐</h2>
                  ) : (
                    <h2>⭐</h2>
                  )}
                  <q>
                    <i>{feed.feed}</i>
                  </q>
                </article>
              ))
            ) : (
              <h2>No feeds in this activity</h2>
            )}
          </section>
        </figure>
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default ActivityDetail;
