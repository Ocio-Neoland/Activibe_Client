import './ModalEdit.css';

import React from 'react';

import InputEdit from '../Inputs/InputEdit';
import SelectEdit from '../Selects/SelectEdit';

const ModalEdit = ({ editAct, typesInp, setEditAct, edAct, typNa, cit }) => {
  return (
    <dialog className="dialogCreate">
      <form className="divForm" onSubmit={(ev) => editAct(ev, edAct._id)}>
        <div className="divDialog2">
          <h2>Editar Actividad</h2>
          {typesInp.map((info) => (
            <InputEdit
              value={edAct[info]}
              info={info}
              key={info}
              action={(ev) => {
                setEditAct({ ...edAct, [info]: ev.target.value });
              }}
            />
          ))}

          <div className="inputGroup">
            <input
              className="input"
              required={true}
              value={edAct.location}
              onChange={(ev) => {
                setEditAct({
                  ...edAct,
                  location: ev.target.value,
                  coordinates: ev.target.value,
                });
              }}
              type="text"
            />
            <label htmlFor="name">Location</label>
          </div>

          <div className="divImageCreate">
            <p>Añade tu imagen:</p>
            <input
              className="input-create-Img"
              onChange={(ev) => {
                setEditAct({ ...edAct, image: ev.target.files[0] });
              }}
              type="file"
              id="file-input"
              style={{ display: 'none' }}
            />

            <button
              className="button-file-create"
              onClick={() => document.getElementById('file-input').click()}
            >
              <img
                className="imgCreatePerfilOne"
                src={
                  editAct.image
                    ? URL.createObjectURL(editAct.image)
                    : 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
                }
                alt="icono fotografia"
              />
            </button>
          </div>

          <div className="selectsCreate">
            <SelectEdit
              value={edAct.city}
              options={cit}
              action={(ev) => setEditAct({ ...edAct, city: ev.target.value })}
            />

            <SelectEdit
              value={edAct.type}
              options={typNa}
              action={(ev) => setEditAct({ ...edAct, type: ev.target.value })}
            />
          </div>
          <div className="button-create-footer">
            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Editar
            </button>
            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Cerrar
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default ModalEdit;
