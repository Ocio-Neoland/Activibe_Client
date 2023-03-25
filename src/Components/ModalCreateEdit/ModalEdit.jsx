import './ModalEdit.css';

import React from 'react';

import InputEdit from '../Inputs/InputEdit';
import SelectEdit from '../Selects/SelectEdit';

const ModalEdit = ({ editAct, typesInp, setEditAct, edAct, typNa, cit }) => {
  return (
    <dialog>
      <div className="mainDialog">
        <div className="divDialog">
          <h2>Edit Activity</h2>
          <form onSubmit={(ev) => editAct(ev, edAct._id)}>
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

            <input
              onChange={(ev) => {
                setEditAct({ ...edAct, image: ev.target.files[0] });
              }}
              type="file"
            />

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

            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Update
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

export default ModalEdit;
