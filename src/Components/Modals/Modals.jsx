import './Modals.css';

import { useForm } from 'react-hook-form';

const Modals = ({ changeA, changePass }) => {
  const { register, handleSubmit } = useForm();

  return (
    <dialog className="dialogCreate">
      <div className="mainDialog">
        <div className="divDialog">
          <div className="divDialog3">
            <div className="SubDivPerfil">
              <h2>Editar perfil</h2>
              <div className="divForm2">
                <form onSubmit={handleSubmit(changeA)} className="form-change-avatar">
                  <div className="divFilePerfil">
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      {...register('avatar')}
                    />
                    <button
                      onClick={(ev) => (ev.target.offsetParent.open = false)}
                      className="perfil-button-act"
                    >
                      Change
                    </button>
                  </div>
                </form>

                <form onSubmit={handleSubmit(changePass)}>
                  <div className="divEditPassword">
                    <div className="inputGroup2">
                      <input
                        className="input2"
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
                  </div>
                </form>
              </div>

              <button
                onClick={(ev) => (ev.target.offsetParent.open = false)}
                className="perfil-button-act"
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modals;
