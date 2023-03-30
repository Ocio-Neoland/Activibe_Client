import './FavoritesProfile.css';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { API } from '../../services/API';
const Favorites = () => {
  const { id } = useContext(UserContext);

  const [favorites, setFavorites] = useState([]);
  const [favorites2] = useState(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

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
      const filteredFav = favorites2.filter((fav) => !fav.includes(value));
      sessionStorage.setItem('favorites', JSON.stringify(filteredFav));
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
              <div className="favorityH2">
                <h2>Mis Favoritos</h2>
              </div>
              <div className="header-actividades2 scrollbar" id="style-7">
                {favorites.length ? (
                  favorites.map((favorite) => (
                    <div className="av-section-container" key={favorite._id}>
                      <div className="box8">
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
                          className="imgSection8"
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
                          <button
                            className="deleteLike"
                            onClick={() => chooseFavorite(`${favorite._id}`)}
                            style={{
                              color: favorites.includes(favorite._id) ? 'white' : 'red',
                            }}
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
