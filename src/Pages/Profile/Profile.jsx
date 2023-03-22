import { useContext, useState, useEffect } from 'react';

import InputCreate from '../../Components/Inputs/InputCreate';
import InputEdit from '../../Components/Inputs/InputEdit';
import SelectCreate from '../../Components/Selects/SelectCreate';
import SelectEdit from '../../Components/Selects/SelectEdit';
import { UserContext } from '../../Context/UserContext';
import { city, typesInput, typesNames } from '../../data/data';
import { API } from '../../services/API';

const Profile = () => {
  const [error, setError] = useState(null);
  const { id } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [act, setAct] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activity, setActivity] = useState({
    name: '',
    image: '',
    description: '',
    location: '',
    coordinates: '',
    city: '',
    type: '',
    validate: true,
    createdBy: id,
  });

  const [editActivity, setEditActivity] = useState({
    name: '',
    image: '',
    description: '',
    location: '',
    coordinates: '',
    city: '',
    type: '',
    validate: true,
    createdBy: id,
  });
  const showActivities = (data) => {
    setAct(data.createdActivities);
  };

  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      showActivities(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getUser();
  }, [loaded]);

  const createActivities = (ev) => {
    ev.preventDefault();
    console.log(activity);
    if (
      !activity.image ||
      !activity.description ||
      !activity.name ||
      !activity.location ||
      !activity.coordinates ||
      !activity.city
    ) {
      setError('Incomplete form');
      console.log(error);
    } else {
      setError(null);
      API.post('/activities', activity, {
        headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify(activity),
      }).then(() => {
        getUser();
      });
    }
  };

  const updateActivities = (ev, id) => {
    ev.preventDefault();
    API.patch(`/activities/${id}`, editActivity, {
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(editActivity),
    });
  };

  const deleteActivities = (id) => {
    API.delete(`/activities/${id}`, {}).then(() => {
      getUser();
    });
  };

  return (
    <main>
      <div>
        <h2>Profile</h2>
        <img src={user.avatar} alt={user.userName} />
        <h2>{user.userName}</h2>
        <h2>Actividades creadas</h2>
        {loaded ? (
          act.map((act) => {
            return (
              <figure key={act.name}>
                <p>{act.name} </p>
                <img src={act.image} alt={act.name} />
                <button onClick={() => deleteActivities(act._id)}>Eliminar</button>
                <button onClick={() => setEditActivity(act)}>Editar</button>
              </figure>
            );
          })
        ) : (
          <h2>loading</h2>
        )}
      </div>
      <h2>Create Activity</h2>
      <form onSubmit={(ev) => createActivities(ev)}>
        {typesInput.map((info) => (
          <InputCreate
            info={info}
            key={info}
            action={(ev) => {
              setActivity({ ...activity, [info]: ev.target.value });
            }}
          />
        ))}

        <SelectCreate
          options={typesNames}
          action={(ev) => setActivity({ ...activity, type: ev.target.value })}
        />

        <SelectCreate
          options={city}
          action={(ev) => setActivity({ ...activity, city: ev.target.value })}
        />

        <button type="submit">Create Activity</button>
      </form>

      <h2>Edit Activity</h2>
      <form onSubmit={(ev) => updateActivities(ev, editActivity._id)}>
        {typesInput.map((info) => (
          <InputEdit
            value={editActivity[info]}
            info={info}
            key={info}
            action={(ev) => {
              setEditActivity({ ...editActivity, [info]: ev.target.value });
            }}
          />
        ))}

        <SelectEdit
          value={editActivity.type}
          options={typesNames}
          action={(ev) => setEditActivity({ ...editActivity, type: ev.target.value })}
        />

        <SelectEdit
          value={editActivity.city}
          options={city}
          action={(ev) => setEditActivity({ ...editActivity, city: ev.target.value })}
        />

        <button type="submit">Update Activity</button>
      </form>
    </main>
  );
};

export default Profile;
