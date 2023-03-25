import React, { useRef } from 'react';
import './ModalCreate.css';
import InputCreate from '../Inputs/InputCreate';
import SelectCreate from '../Selects/SelectCreate';

const ModalCreate = ({ createAct, typesInp, setAct, act, typNa, cit }) => {
  let location;
  let coordinates;
  const inputCalle = useRef();
  const inputNumero = useRef();
  const inputCiudad = useRef();
  const inputCodigoPostal = useRef();

  const handleLocation = (ev) => {
    location = location + ' ' + ev;

    console.log(location);
  };

  const handleCoordinates = (ev) => {
    coordinates = coordinates + ' ' + ev;
    console.log(coordinates);
  };
  return (
    <dialog>
      <div className="mainDialog">
        <div className="divDialog">
          <h2>Create Activity</h2>
          <form onSubmit={(ev) => createAct(ev)}>
            {typesInp.map((info) => (
              <InputCreate
                info={info}
                key={info}
                action={(ev) => {
                  setAct({ ...act, [info]: ev.target.value });
                }}
              />
            ))}

            <input
              type="text"
              ref={inputCalle}
              name="location"
              placeholder="Calle"
            ></input>
            <button
              type="button"
              onClick={() => {
                handleLocation(inputCalle.current.value),
                  handleCoordinates(inputCalle.current.value);
              }}
            >
              Siguiente
            </button>
            <input
              type="number"
              ref={inputNumero}
              name="location"
              placeholder="Número"
            ></input>
            <button
              type="button"
              onClick={() => handleLocation(inputNumero.current.value)}
            >
              {' '}
              Siguiente
            </button>
            <input
              type="text"
              ref={inputCiudad}
              name="coordinates"
              placeholder="Ciudad"
            ></input>
            <button
              type="button"
              onClick={() => {
                handleLocation(inputCiudad.current.value),
                  handleCoordinates(inputCiudad.current.value);
              }}
            >
              {' '}
              Siguiente
            </button>
            <input
              type="text"
              ref={inputCodigoPostal}
              name="location"
              placeholder="Código Postal"
            ></input>
            <button
              type="button"
              onClick={() => {
                handleLocation(inputCodigoPostal.current.value),
                  handleCoordinates(inputCodigoPostal.current.value);
              }}
            >
              {' '}
              Siguiente
            </button>

            <input
              onChange={(ev) => {
                setAct({ ...act, image: ev.target.files[0] });
              }}
              type="file"
            />

            <SelectCreate
              options={typNa}
              action={(ev) => setAct({ ...act, type: ev.target.value })}
            />

            <SelectCreate
              options={cit}
              action={(ev) => setAct({ ...act, city: ev.target.value })}
            />

            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Crear
            </button>
          </form>
          <button
            onClick={(ev) => (ev.target.offsetParent.open = false)}
            className="perfil-button-act"
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalCreate;
