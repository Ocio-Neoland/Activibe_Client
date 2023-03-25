import './FavoritesProfile.css';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { API } from '../../services/API';
const Favorites = () => {
  const { id } = useContext(UserContext);

  const [favorites, setFavorites] = useState([]);

  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setFavorites(res.data.favorites);
    });
  };
  const chooseFavorite = (value) => {
    const info = {
      id: id,
    };
    API.put(`/activities/favorites/${value}`, info, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    }).then(() => {
      getUser();
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <div className="container2">
        <div className="perfil-act-fav">
          <div className="perfil-create">
            <div className="perfil-crud">
              <div className="header-actividades">
                <h2>Mis Favoritos</h2>
                {favorites.length ? (
                  favorites.map((favorite) => (
                    <div className="av-section-container" key={favorite._id}>
                      <div className="box">
                        <div className="headerCard">
                          <h3 className="activity">{favorite.type}</h3>
                          <Link
                            to={`/${favorite.type}/${favorite._id}`}
                            value={favorite._id}
                            className="masInfo"
                          >
                            + info
                          </Link>
                        </div>

                        <img
                          className="imgSection"
                          src={favorite.image}
                          alt={favorite.name}
                        />
                        <div className="subBox">
                          <strong>{favorite.name}</strong>
                          <span>{favorite.location}</span>
                          <div className="footerCard">
                            <span className="sectionCity">{favorite.city}</span>
                            <p className="stars">{favorite.mediaStars} ⭐</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="deleteLike"
                        onClick={() => chooseFavorite(`${favorite._id}`)}
                      >
                        💓
                      </button>
                    </div>
                  ))
                ) : (
                  <h2>No hay Favoritos</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
