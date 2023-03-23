import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../Context/UserContext';
import { API } from '../../services/API';

const Favorites = () => {
  const { id } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getUser();
  }, [loaded]);

  console.log(user);

  return (
    <main>
      <div className="container2">
        <div className="perfil-act-fav">
          <div className="perfil-create">
            <div className="perfil-crud">
              <div className="header-actividades">
                <h2>Mis Favoritos</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
