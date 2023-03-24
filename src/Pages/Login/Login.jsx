import './Login.css';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { API } from '../../Services/API';
const Login = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [setError] = useState(null);

  const formSubmit = (formData) => {
    API.post('/users/login', formData)
      .then((res) => {
        if (res.status === 200) {
          login(
            res.data.user.userName,
            res.data.token,
            res.data.user._id,
            res.data.user.avatar,
            res.data.user.password,
          );

          navigate('/');
        }
      })
      .catch((error) => {
        setError(error);
      });
  };
  const switchShow = () => setShow(!show);
  return (
    <main>
      <div className="login-box">
        <form className="user-box" onSubmit={handleSubmit(formSubmit)}>
          <div className="user-box">
            <input
              className="input"
              type="text"
              required=""
              id="userName"
              name="userName"
              {...register('userName')}
            />
            <label htmlFor="userName">Usuario:</label>
          </div>
          <div className="user-box">
            <input
              placeholder="password"
              className="input"
              type={show ? 'text' : 'password'}
              required=""
              id="password"
              name="password"
              {...register('password')}
            />
            <label htmlFor="password">Contraseña:</label>
            {show ? (
              <button
                type="button"
                onClick={switchShow}
                className="login-button-mostrar2"
              >
                {' '}
                <img
                  className="ojoPassword2"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667868/fotos/ojo_aqmzwt.png"
                  alt="icono ojo"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={switchShow}
                className="login-button-mostrar2"
              >
                {' '}
                <img
                  className="ojoPassword2"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667874/fotos/ojoCerrado_sy8jkw.png"
                  alt="icono ojo"
                />
              </button>
            )}

            <button className="a2" type="submit">
              INICIAR SESION
            </button>

            <p className="separador"></p>
            <button
              className="btn-login"
              type="button"
              onClick={() => navigate('/register')}
            >
              CREAR CUENTA NUEVA
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
