import './Profile.css';

import { useContext, useEffect, useState } from 'react';

import Favorites from '../../Components/FavoritesProfile/FavoritesProfile';
import Modals from '../../Components/Modals/Modals';
import Profile2 from '../../Components/ProfileActivities/ProfileActivities';
import { UserContext } from '../../Context/UserContext';
import { API } from '../../services/API';

const Profile = () => {
  const { id, setAvatar, setPassword } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setAvatar(res.data.avatar);
      setPassword(res.data.password);
      setLoaded(true);
    });
  };

  const changeAvatar = (formData) => {
    const data = {
      ...user,
      avatar: formData.avatar[0],
    };
    API.patch(`/users/${user._id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      getUser();
    });
  };

  const changePassword = (formData) => {
    const data = {
      ...user,
      password: formData.password,
    };
    console.log(data.password);
    API.patch(`/users/${user._id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  useEffect(() => {
    getUser();
  }, [loaded]);

  let parserDate = new Date(user.createdAt);

  let formatedParserDate = parserDate.toLocaleDateString('es-ES');

  return (
    <main className="mainProfile">
      <div className="container4">
        <div className="perfil-container">
          <div>
            <h1>Profile</h1>
          </div>
          <div className="perfil-container-flex">
            <div className="avatar2">
              <img src={user.avatar} alt={user.userName} />
            </div>

            <div className="perfil-datos">
              <p className="espacio">
                <strong>Username:</strong> {user.userName}
              </p>
              <p className="espacio">
                <strong>Email:</strong> {user.email}{' '}
              </p>
              <p className="espacio">
                <strong>User created at:</strong> {formatedParserDate}
              </p>
            </div>

            <button
              onClick={(ev) => (ev.target.nextSibling.open = true)}
              className="perfil-button-act"
            >
              Edit profile
            </button>
            <Modals changeA={changeAvatar} changePass={changePassword} />
          </div>
        </div>
      </div>
      <div className="perfil-toggle-buttons">
        <button onClick={() => setShowProfile(true)} className="perfil-button-act">
          Mis Actividades
        </button>
        <button onClick={() => setShowProfile(false)} className="perfil-button-act">
          Mis favoritos
        </button>
      </div>
      {showProfile ? <Profile2 /> : <Favorites />}
    </main>
  );
};

export default Profile;
