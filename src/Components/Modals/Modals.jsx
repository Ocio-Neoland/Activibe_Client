import './Modals.css';

import { useForm } from 'react-hook-form';

const Modals = ({ changeA, changePass }) => {
  //   const { id, setAvatar, setPassword } = useContext(UserContext);
  //   const [user, setUser] = useState({});
  //   const [loaded, setLoaded] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <dialog>
      <div className="mainDialog">
        <div className="divDialog">
          <form onSubmit={handleSubmit(changeA)} className="form-change-avatar">
            <input type="file" id="avatar" name="avatar" {...register('avatar')} />
            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Change
            </button>
          </form>

          <form onSubmit={handleSubmit(changePass)}>
            <p>Cambiar Contraseña</p>
            <input type="text" id="password" name="password" {...register('password')} />
            <button
              onClick={(ev) => (ev.target.offsetParent.open = false)}
              className="perfil-button-act"
            >
              Change
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

export default Modals;

// changeAvatar, changePassword
