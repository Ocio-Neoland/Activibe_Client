import './Profile.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Favorites from '../../Components/FavoritesProfile/FavoritesProfile';
import Profile2 from '../../Components/ProfileActivities/ProfileActivities';
import { UserContext } from '../../Context/UserContext';
import { API } from '../../services/API';

const Profile = () => {
  const { id, setAvatar } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const { register, handleSubmit } = useForm();

  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setAvatar(res.data.avatar);
      console.log(res.data);
      setLoaded(true);
    });
  };

  const formSubmit = (formData) => {
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

  //CREATE

  //EDIT

  //DELETE

  useEffect(() => {
    getUser();
  }, [loaded]);

  console.log(user);

  return (
    <main>
      <div className="container2">
        <h1>Profile</h1>
        <div className="perfil-container">
          <div className="avatar2">
            <img src={user.avatar} alt={user.userName} />
            <form onSubmit={handleSubmit(formSubmit)} className="form-change-avatar">
              <input type="file" id="avatar" name="avatar" {...register('avatar')} />
              <button type="submit">Change</button>
            </form>
          </div>
          <div className="perfil-datos">
            <p className="espacio">
              <strong>Username:</strong> {user.userName}
            </p>
            <p className="espacio">
              <strong>Email:</strong> {user.email}{' '}
            </p>
            <p className="espacio">
              <strong>User created at:</strong> {user.createdAt}{' '}
            </p>
          </div>
          <button className="perfil-button">Edit password</button>
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
