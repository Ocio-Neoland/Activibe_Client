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
          login(res.data.userName, res.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <main>
      <h2>Login</h2>
      {error !== null && <h2>{error}</h2>}
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="userName">Username</label>
        <input type="text" id="userName" name="userName" {...register('userName')} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
