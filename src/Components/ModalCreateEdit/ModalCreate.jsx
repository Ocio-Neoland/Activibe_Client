import './ModalCreate.css';

import React from 'react';

import InputCreate from '../Inputs/InputCreate';
import SelectCreate from '../Selects/SelectCreate';

const ModalCreate = ({ createAct, typesInp, setAct, act, typNa, cit }) => {
  return (
    <dialog className="dialogCreate">
      <div className="mainDialog">
        <div className="divDialog">
          <h2>Create Activity</h2>
          <div>
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
                onChange={(ev) => {
                  setAct({ ...act, location: ev.target.value });
                }}
                type="text"
                placeholder="calle, numero, codigo, postal, y municipio"
              />

              <input
                onChange={(ev) => {
                  setAct({ ...act, coordinates: ev.target.value });
                }}
                type="text"
                placeholder="calle, numero, codigo, postal, y municipio"
              />

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
                onClick={(ev) => {
                  ev.target.offsetParent.open = false;
                  document.getElementById('resetButton').click();
                }}
                className="perfil-button-act"
              >
                Crear
              </button>
              <input
                type="reset"
                id="resetButton"
                value="reset"
                className="perfil-button-act"
              ></input>
            </form>
          </div>
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
