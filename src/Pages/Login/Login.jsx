import './Login.css';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { API } from '../../Services/API';
const Login = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [error, setError] = useState(null);

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

  return (
    <main>
      <div className="login-box">
        <p>Login</p>
        {error !== null && <h2>{error}</h2>}
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
            <label htmlFor="userName">Username:</label>
          </div>
          <div className="user-box">
            <input
              className="input"
              type="password"
              required=""
              id="password"
              name="password"
              {...register('password')}
            />
            <label htmlFor="password">Password:</label>

            <button className="a2" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
