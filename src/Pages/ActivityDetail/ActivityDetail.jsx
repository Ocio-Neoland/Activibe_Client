import './ActivityDetail.css';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Map from '../../Components/Map/Map';
import { CityContext } from '../../Context/CityContext';
import { API } from '../../Services/API';

const ActivityDetail = () => {
  const { id } = useParams();
  const { city } = useContext(CityContext);
  const [idComents] = useState(() => {
    const savedName = sessionStorage.getItem('id');
    return savedName || null;
  });

  const [details, setDetails] = useState('');
  const [alreadyFeed, setAlreadyFeed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState('');

  const [longitud, setLongitud] = useState(null);
  const [latitud, setLatitud] = useState(null);

  const hiddenStar5 = useRef('null');
  const hiddenStar4 = useRef('null');
  const hiddenStar3 = useRef('null');
  const hiddenStar2 = useRef('null');
  const hiddenStar1 = useRef('null');

  const handleDeleteButton = (ev, type) => {
    Swal.fire({
      title: '¿Seguro que quieres borrar la actividad?',
      showDenyButton: true,
      confirmButtonColor: '#ff3c00',
      denyButtonColor: '#38B6FF',
      cancelButtonColor: '#38B6FF',
      showCancelButton: false,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
      customClass: {
        popup: 'cancelButton',
        confirmButton: 'confirmButton',
        cancelButton: 'cancelButton',
        denyButton: 'denyButton',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Borrado', '', 'Éxito');
        if (type === 'feed') {
          deleteFeed(ev);
        } else {
          deleteComment(ev);
        }
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', '');
      }
    });
  };

  const [newComment, setNewComment] = useState({
    comment: '',
    idUser: idComents,
    idActivity: id,
  });

  const [newFeed, setNewFeed] = useState({
    feed: '',
    stars: 1,
    idUser: idComents,
    idActivity: id,
  });

  const [feeds, setFeeds] = useState('');

  const getLocation = async (info) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${info},Spain&format=jsonv2`,
    );
    const data = await res.json();
    setLongitud(data[0].lat);
    setLatitud(data[0].lon);
  };

  const getSection = async () => {
    API.get(`/activities/${city}/${id}`).then((res) => {
      setDetails(res.data);
      setComments(res.data.comments);
      setFeeds(res.data.feeds);
      sessionStorage.setItem('location', res.data.coordinates.replaceAll(' ', '+'));
      getLocation(sessionStorage.getItem('location'));

      const feedsOfUser = res.data.feeds.filter((feed) => feed.idUser._id === idComents);
      if (feedsOfUser.length) {
        setAlreadyFeed(true);
      }

      setLoaded(true);
    });
  };

  //Hacer un comentario

  const createComment = (ev) => {
    ev.preventDefault();

    if (!newComment.comment || !newComment.idUser || !newComment.idActivity) {
      setError('Incomplete form');
    } else {
      setError(null);
      API.post('/comments', newComment, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      }).then(() => {
        getSection();
      });
    }
  };

  const createFeed = (ev) => {
    ev.preventDefault();
    setAlreadyFeed(true);
    if (!newFeed.feed || !newFeed.idUser || !newFeed.idActivity) {
      setError('Incomplete form');
    } else {
      setError(null);

      API.post('/feeds', newFeed, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeed),
      }).then((res) => {
        console.log(res.data);
        getSection();
      });
    }
  };
  function borrarTextArea() {
    document.getElementById('miTextArea').value = '';
  }
  const countingStars = (numberOfStars) => {
    if (numberOfStars === 4) {
      hiddenStar5.current.classList.value = 'hide';
      hiddenStar4.current.classList.value = '';
      hiddenStar3.current.classList.value = '';
      hiddenStar2.current.classList.value = '';
      hiddenStar1.current.classList.value = '';
    } else if (numberOfStars === 3) {
      hiddenStar4.current.classList.value = 'hide';
      hiddenStar5.current.classList.value = 'hide';
      hiddenStar3.current.classList.value = '';
      hiddenStar2.current.classList.value = '';
      hiddenStar1.current.classList.value = '';
    } else if (numberOfStars === 2) {
      hiddenStar4.current.classList.value = 'hide';
      hiddenStar5.current.classList.value = 'hide';
      hiddenStar3.current.classList.value = 'hide';
      hiddenStar2.current.classList.value = '';
      hiddenStar1.current.classList.value = '';
    } else if (numberOfStars === 1) {
      hiddenStar4.current.classList.value = 'hide';
      hiddenStar5.current.classList.value = 'hide';
      hiddenStar3.current.classList.value = 'hide';
      hiddenStar2.current.classList.value = 'hide';
      hiddenStar1.current.classList.value = '';
    } else {
      hiddenStar4.current.classList.value = '';
      hiddenStar5.current.classList.value = '';
      hiddenStar3.current.classList.value = '';
      hiddenStar2.current.classList.value = '';
      hiddenStar1.current.classList.value = '';
    }
    setNewFeed({ ...newFeed, stars: numberOfStars });
  };

  //Borrar un comentario

  const deleteComment = (id) => {
    API.delete(`/comments/${id}`, {}).then(() => {
      getSection();
    });
  };

  const deleteFeed = (id) => {
    setAlreadyFeed(false);
    API.delete(`/feeds/${id}`, {}).then(() => {
      getSection();
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  return (
    <main className="detail-main">
      <div className="description-act">
        <div className="descrption-img">
          <img className="ocio-img-details" src={details.image} alt={details.name} />
        </div>
        <div className="description-activity2">
          <h1>{details.name}</h1>
          <p>{details.description}</p>
          <p>{details.location}</p>
        </div>
      </div>

      {loaded ? (
        <figure className="ocio-figure">
          <div className="mapVal">
            <div className="divMap">
              <Map prop1={longitud} prop2={latitud} prop3={details.location} />
            </div>
            <section className="ocio-feeds">
              <div className="ValoracionesUsers">
                <h2>Valoraciones de los Usuarios {`( ${feeds.length} )`}</h2>

                <div className="ocio-media">
                  {details.feeds.length === 0 ? (
                    <h1 className="feeds-H1">0/5</h1>
                  ) : (
                    <h1 className="feeds-H1">{details.mediaStars.toFixed(1)}</h1>
                  )}
                  <div className="ocio-media-right">
                    {details.mediaStars === 5 ? (
                      <p>⭐⭐⭐⭐⭐</p>
                    ) : details.mediaStars < 4.5 && details.mediaStars >= 3.5 ? (
                      <p>⭐⭐⭐⭐</p>
                    ) : details.mediaStars < 3.5 && details.mediaStars >= 2.5 ? (
                      <p>⭐⭐⭐</p>
                    ) : details.mediaStars < 2.5 && details.mediaStars >= 1.5 ? (
                      <p>⭐⭐</p>
                    ) : (
                      <p>⭐</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="carousel-div scrollbar" id="style-7">
                {feeds.length ? (
                  feeds.map((feed) => (
                    <article className="ocio-feed" key={feed._id}>
                      <img src={feed.idUser.avatar} alt={feed.idUser.userName} />
                      <h2>{feed.idUser.userName}</h2>
                      {feed.stars === 5 ? (
                        <h2>⭐⭐⭐⭐⭐</h2>
                      ) : feed.stars === 4 ? (
                        <h2>⭐⭐⭐⭐</h2>
                      ) : feed.stars === 3 ? (
                        <h2>⭐⭐⭐</h2>
                      ) : feed.stars === 2 ? (
                        <h2>⭐⭐</h2>
                      ) : (
                        <h2>⭐</h2>
                      )}
                      <q>
                        <i>{feed.feed}</i>
                      </q>
                      {idComents === feed.idUser._id ? (
                        <button
                          className="btn-feeds"
                          onClick={() => handleDeleteButton(feed._id, 'feed')}
                        >
                          ❌
                        </button>
                      ) : (
                        <></>
                      )}
                    </article>
                  ))
                ) : (
                  <h2>No Hay Valoraciones</h2>
                )}
              </div>

              {alreadyFeed === false ? (
                <div className="comment-create">
                  <div className="contain-form">
                    <form className="form-feeds" onSubmit={(ev) => createFeed(ev)}>
                      <div className="Feeds-coment-stars">
                        <h2>Valora y comenta</h2>
                        <ul className="startsComent">
                          <button
                            type="button"
                            value="1"
                            onClick={() => countingStars(1, hiddenStar1)}
                            ref={hiddenStar1}
                          >
                            ⭐
                          </button>
                          <button
                            value="2"
                            type="button"
                            onClick={() => countingStars(2, hiddenStar2)}
                            ref={hiddenStar2}
                          >
                            ⭐
                          </button>
                          <button
                            value="3"
                            type="button"
                            onClick={() => {
                              countingStars(3, hiddenStar3);
                            }}
                            ref={hiddenStar3}
                          >
                            ⭐
                          </button>
                          <button
                            value="4"
                            type="button"
                            onClick={() => countingStars(4, hiddenStar4)}
                            ref={hiddenStar4}
                          >
                            ⭐
                          </button>
                          <button
                            value="5"
                            type="button"
                            onClick={() => countingStars(5, hiddenStar5)}
                            ref={hiddenStar5}
                          >
                            ⭐
                          </button>
                        </ul>
                      </div>
                      <div className="input-feeds">
                        <textarea
                          className="inputComentComunty2"
                          name="textarea"
                          maxLength={200}
                          onChange={(ev) => {
                            setNewFeed({ ...newFeed, feed: ev.target.value });
                          }}
                        ></textarea>
                        <button className="btn-public" type="submit">
                          Publicar{' '}
                        </button>
                      </div>
                    </form>
                  </div>

                  {error && <h3>{error}</h3>}
                </div>
              ) : (
                <h2>Gracias por valorar la actividad</h2>
              )}
            </section>
          </div>
          <div className="activity-coment">
            <div className="ocio-blog scrollbar" id="style-7">
              <h2 className="h2Coment">Comentarios de la comunidad</h2>
              {comments.length ? (
                comments.map((comment) => (
                  <article className="ocio-comment" key={comment._id}>
                    <div className="ocio-comment-avatar">
                      <img src={comment.idUser.avatar} alt={comment.idUser.userName} />
                      <h2>{comment.idUser.userName}</h2>
                      <h2>{new Date(comment.createdAt).toLocaleString('es-ES')}</h2>
                    </div>

                    <q>
                      <i className="ocio-comment-p">{comment.comment}</i>
                    </q>
                    <div>
                      {idComents === comment.idUser._id ? (
                        <button
                          className="btn-coments"
                          onClick={() => handleDeleteButton(comment._id, 'comment')}
                        >
                          ❌
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div>
                  <h2>No hay comentarios en la actividad</h2>
                  {/* <label htmlFor="input">Agrega un comentario</label>
                      <input name="input">.....</input> */}
                </div>
              )}
            </div>

            <div className="comment-create1">
              <form className="comment-create2" onSubmit={(ev) => createComment(ev)}>
                <textarea
                  className="inputComentComunty"
                  id="miTextArea"
                  name="textarea"
                  maxLength={200}
                  onChange={(ev) => {
                    setNewComment({ ...newComment, comment: ev.target.value });
                  }}
                ></textarea>
                <button
                  className="perfil-button-act"
                  type="submit"
                  onClick={() => borrarTextArea()}
                >
                  Publicar
                </button>
              </form>
            </div>
          </div>
        </figure>
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default ActivityDetail;
