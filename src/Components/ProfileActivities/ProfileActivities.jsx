import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import InputCreate from '../../Components/Inputs/InputCreate';
import InputEdit from '../../Components/Inputs/InputEdit';
import ModalCreate from '../../Components/ModalCreate/ModalCreate';
import SelectCreate from '../../Components/Selects/SelectCreate';
import SelectEdit from '../../Components/Selects/SelectEdit';
import { UserContext } from '../../Context/UserContext';
import { city, typesInput, typesNames } from '../../data/data';
import { API } from '../../services/API';

const Profile2 = () => {
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

  //EDIT

  const updateActivities = (ev, id) => {
    ev.preventDefault();
    API.patch(`/activities/${id}`, editActivity, {
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(editActivity),
    }).then(() => {
      getUser();
    });
  };

  //DELETE

  const deleteActivities = (id) => {
    API.delete(`/activities/${id}`, {}).then(() => {
      getUser();
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
                <h2>Mis actividades</h2>
                <button
                  onClick={(ev) => (ev.target.nextSibling.open = true)}
                  className="perfil-button-act"
                >
                  Create activity
                </button>
                <ModalCreate />
              </div>
              <div className="perfil-all-activities">
                {loaded ? (
                  act.map((act) => {
                    return (
                      <figure key={act.name}>
                        <div className="box2">
                          <div className="headerCard2">
                            <h3 className="activity2">{act.type}</h3>
                            <Link
                              to={`/${act.type}/${act._id}`}
                              value={act._id}
                              className="masInfo2"
                            >
                              + info
                            </Link>
                          </div>

                          <img className="imgSection2" src={act.image} alt={act.name} />
                          <div className="subBox2">
                            <strong>{act.name}</strong>
                            <span>{act.location}</span>
                            <div className="footerCard2">
                              <span className="sectionCity2">{act.city}</span>
                              <p className="stars2">{act.mediaStars} ⭐</p>
                            </div>
                          </div>
                        </div>
                        <div className="perfil-act-button">
                          <button
                            onClick={() => deleteActivities(act._id)}
                            className="perfil-button"
                          >
                            Eliminar
                          </button>
                          <button
                            onClick={() => setEditActivity(act)}
                            className="perfil-button"
                          >
                            Editar
                          </button>
                        </div>
                      </figure>
                    );
                  })
                ) : (
                  <h2>loading</h2>
                )}
              </div>
            </div>
          </div>
        </div>
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

            <input
              onChange={(ev) => {
                setEditActivity({ ...editActivity, image: ev.target.files[0] });
              }}
              type="file"
            />

            <SelectEdit
              value={editActivity.city}
              options={city}
              action={(ev) => setEditActivity({ ...editActivity, city: ev.target.value })}
            />

            <SelectEdit
              value={editActivity.type}
              options={typesNames}
              action={(ev) => setEditActivity({ ...editActivity, type: ev.target.value })}
            />

            <button type="submit">Update Activity</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile2;
