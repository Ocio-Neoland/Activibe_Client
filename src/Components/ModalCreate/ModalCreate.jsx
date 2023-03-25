import { useContext, useEffect, useState } from 'react';

import InputCreate from '../../Components/Inputs/InputCreate';
import SelectCreate from '../../Components/Selects/SelectCreate';
import { UserContext } from '../../Context/UserContext';
import { city, typesInput, typesNames } from '../../data/data';
import { API } from '../../services/API';

const ModalCreate = () => {
  const [error, setError] = useState(null);
  const { id } = useContext(UserContext);
  const [user, setUser] = useState({});

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

  const getUser = async () => {
    API.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setLoaded(true);
    });
    console.log(user);
  };

  //CREATE

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

  useEffect(() => {
    getUser();
  }, [loaded]);

  return (
    <dialog className="container2">
      <div>
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

          <input
            onChange={(ev) => {
              setActivity({ ...activity, image: ev.target.files[0] });
            }}
            type="file"
          />

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
      </div>
      <button onClick={(ev) => (ev.target.offsetParent.open = false)}>cerrar</button>
    </dialog>
  );
};

export default ModalCreate;
