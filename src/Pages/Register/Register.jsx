import './Register.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { API } from '../../Services/API';

const Register = () => {
  const [shown, setShown] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();
  const formSubmit = (formData) => {
    const data = {
      email: formData.email,
      userName: formData.userName,
      password: formData.password,
      avatar: formData.avatar[0],
    };
    API.post('/users', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      navigate('/login');
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'password') {
      setPassword(value);
    } else {
      setRepeatPassword(value);
    }

    // Verifica si la contraseña y la repetición de contraseña coinciden
    setPasswordError(
      name === 'password' && value !== repeatPassword
        ? 'Las contraseñas no coinciden'
        : '',
    );
  };
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  return (
    <main className="main-register">
      <div className="containerRegister">
        <div className="h2Register"></div>

        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <span className="title1">Welcome</span>
          <span className="sub mb">Register to get full access now </span>

          <input type="file" id="file" {...register('avatar')} />
          <label className="avatar" htmlFor="file">
            {' '}
            <span>
              {' '}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    fill="#ffffff"
                    d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z"
                    opacity="0.1"
                  ></path>{' '}
                  <path
                    strokeWidth="2"
                    stroke="#ffffff"
                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                  ></path>{' '}
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="#ffffff"
                    d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"
                  ></path>{' '}
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="#ffffff"
                    d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"
                  ></path>{' '}
                  <path
                    strokeWidth="2"
                    stroke="#ffffff"
                    d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"
                  ></path>{' '}
                </g>
              </svg>
            </span>
            <p className="ParrafoAvatar">avatar</p>
          </label>

          <label className="username" htmlFor="userName">
            Username:
          </label>
          <input
            placeholder="Username"
            type="text"
            className="input"
            id="userName"
            name="userName"
            {...register('userName')}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="input"
            id="email"
            name="email"
            {...register('email')}
            placeholder="Email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type={shown ? 'text' : 'password'}
            value={password}
            className="input"
            id="password"
            name="password"
            {...register('password')}
            onChange={(handleChange, onChange)}
            placeholder="password"
          />
          <button onClick={switchShown}>{shown ? 'Ocultar' : 'Mostrar'}</button>
          <div className="passwordRequisitos">
            <p>min 8 characters,</p>
            <p>1 auppercase,</p>
            <p>1 symbol,</p>
            <p>1 number</p>
          </div>
          <label htmlFor="password">repit Password:</label>
          <input
            placeholder="repeatPassword"
            type="password"
            className="input"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={handleChange}
          />
          {passwordError && <div>{passwordError}</div>}
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
