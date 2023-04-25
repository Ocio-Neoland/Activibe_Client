import './Register.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { API } from '../../Services/API';

const Register = () => {
  const [shown, setShown] = useState(false);
  const [shown1, setShown1] = useState(false);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [imgavatar, setImgAvatar] = useState(null);
  const [showImgavatar, setShowImgAvatar] = useState(null);
  const { register, handleSubmit } = useForm();

  const onChangeAvatar = (e) => {
    setImgAvatar(e.target.files[0]);
    setShowImgAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  let navigate = useNavigate();
  const formSubmit = (formData) => {
    let data;
    if (repeatPassword === formData.password) {
      data = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        avatar: imgavatar,
      };
      Toast.fire({
        icon: 'success',
        title: '¡Registro completado con éxito!',
        position: 'center',
        iconColor: 'white',
        customClass: {
          popup: 'registerAlert',
        },
      });
    } else {
      Swal.fire({
        text: 'Por favor, complete todos los campos correctamente',
        confirmButtonText: 'Vale',
        customClass: {
          popup: 'errorAlert',
        },
        confirmButtonColor: '#0065de',
      });
      data = {
        email: '',
        userName: '',
        password: '',
        avatar: '',
      };
    }

    API.post('/users', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      navigate('/login');
    });
  };
  const switchShown1 = () => setShown1(!shown1);
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  return (
    <main className="main-register">
      <div className="containerRegister">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <span className="sub mb">Regístrate para obtener acceso completo</span>

          <input
            type="file"
            id="file"
            {...register('avatar')}
            onChange={onChangeAvatar}
          />
          <div className="register-avatar">
            <label className="avatar" htmlFor="file">
              {showImgavatar != null && (
                <>
                  <img src={showImgavatar} alt="" className="imgAvatar" />
                </>
              )}
              {showImgavatar == null && (
                <>
                  <p className="ParrafoAvatar">Coloca tu avatar</p>
                  <span className="iconoImgAvatar">
                    <img
                      src="https://sistemas.com/wp-content/uploads/2013/12/twitpic.png"
                      alt="icono foto"
                    />
                  </span>
                </>
              )}
            </label>
          </div>

          <label className="username" htmlFor="userName">
            Usuario:
          </label>
          <input
            placeholder="Usuario"
            required
            type="text"
            className="input"
            id="userName"
            name="userName"
            {...register('userName')}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            required
            className="input"
            id="email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            name="email"
            {...register('email')}
            placeholder="Email"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            required
            type={shown ? 'text' : 'password'}
            value={password}
            className="input"
            id="password"
            name="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$"
            {...register('password')}
            onChange={onChange}
            placeholder="Contraseña"
          />
          <div className="register-div-register">
            {shown ? (
              <button
                type="button"
                onClick={switchShown}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667868/fotos/ojo_aqmzwt.png"
                  alt="icono ojo"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={switchShown}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667874/fotos/ojoCerrado_sy8jkw.png"
                  alt="icono ojo"
                />
              </button>
            )}
            <div className="passwordRequisitos">
              <p>Mín 8 caracteres 1 mayusc. 1 num. y 1 sim.</p>
            </div>
          </div>
          <label htmlFor="password">Repetir contraseña:</label>
          <input
            required
            placeholder="Contraseña"
            type={shown1 ? 'text' : 'password'}
            className="input"
            id="repeatPassword"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$"
            name="repeatPassword"
            onChange={(ev) => setRepeatPassword(ev.target.value)}
          />
          <div className="register-div-register">
            {shown1 ? (
              <button
                type="button"
                onClick={switchShown1}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667868/fotos/ojo_aqmzwt.png"
                  alt="icono ojo"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={switchShown1}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667874/fotos/ojoCerrado_sy8jkw.png"
                  alt="icono ojo"
                />
              </button>
            )}
          </div>
          <button className="button" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
