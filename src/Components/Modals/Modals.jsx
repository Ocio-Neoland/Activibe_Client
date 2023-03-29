import './Modals.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Modals = ({ changeA, changePass }) => {
  const { register, handleSubmit } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <dialog className="dialogCreate">
      <div className="divForm2">
        <h2>Editar perfil</h2>

        <form onSubmit={handleSubmit(changeA)} className="form-change-avatar">
          <div className="divModal2">
            <div className="editEvatarImg">
              <input
                type="file"
                id="avatar"
                name="avatar"
                {...register('avatar')}
                onChange={(event) => {
                  setSelectedImage(URL.createObjectURL(event.target.files[0]));
                }}
              />

              <img
                className="imgAvatarEdit"
                src={
                  selectedImage
                    ? selectedImage
                    : 'https://cdn-icons-png.flaticon.com/512/126/126486.png'
                }
                alt="Avatar"
              />
            </div>
            <button
              onClick={(ev) => {
                ev.target.offsetParent.open = false;
              }}
              className="perfil-button-act"
            >
              Change
            </button>
          </div>
        </form>

        <form className="form-change-avatar2" onSubmit={handleSubmit(changePass)}>
          <div className="inputGroup">
            <input
              className="input"
              required={true}
              type="text"
              id="password"
              name="password"
              {...register('password')}
            />
            <label htmlFor="name">contraseña</label>
            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Change
            </button>
          </div>
        </form>
        <button
          onClick={(ev) => (ev.target.offsetParent.open = false)}
          className="perfil-button-act"
        >
          cerrar
        </button>
      </div>
    </dialog>
  );
};

export default Modals;
