import './ProfileActivities.css';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { city, typesInput, typesNames } from '../../data/data';
import { API } from '../../services/API';
import ModalCreate from '../ModalCreateEdit/ModalCreate';
import ModalEdit from '../ModalCreateEdit/ModalEdit';

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

  console.log(user);

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

  return (
    <main>
      <div className="containerAct">
        <div className="perfil-act-fav">
          <div className="perfil-create">
            <div className="perfil-crud">
              <div className="header-actividades3">
                <h2>Mis actividades</h2>
                <button
                  onClick={(ev) => (ev.target.nextSibling.open = true)}
                  className="perfil-button-act"
                >

                </button>
                <ModalCreate
                  createAct={createActivities}
                  typesInp={typesInput}
                  setAct={setActivity}
                  act={activity}
                  typNa={typesNames}
                  cit={city}
                />
              </div>
              <div className="perfil-all-activities scrollbar" id="style-7">
                {loaded ? (
                  act.map((act) => {
                    return (
                      <figure key={act.name} className="figureACttt">
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
                            onClick={(ev) => (
                              (ev.target.nextSibling.open = true), setEditActivity(act)
                            )}
                            className="perfil-button"
                          >
                            Editar
                          </button>
                          <ModalEdit
                            editAct={updateActivities}
                            typesInp={typesInput}
                            setEditAct={setEditActivity}
                            edAct={editActivity}
                            typNa={typesNames}
                            cit={city}
                          />
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
      </div>
    </main>
  );
};

export default Profile2;
