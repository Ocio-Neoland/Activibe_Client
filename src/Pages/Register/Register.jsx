import './Register.css';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { API } from '../../Services/API';

const Register = () => {
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
  return (
    <main>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" {...register('email')} />
        <label htmlFor="userName">Username</label>
        <input type="text" id="userName" name="userName" {...register('userName')} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" {...register('password')} />
        <label htmlFor="avatar">Avatar</label>
        <input type="file" id="avatar" name="avatar" {...register('avatar')} />

        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
