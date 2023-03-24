import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const initialValue = JSON.parse(savedUser);
    return initialValue || null;
  });

  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || null;
  });

  const [password, setPassword] = useState(() => {
    const savedPassword = localStorage.getItem('password');
    return savedPassword || null;
  });

  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem('id');
    return savedId || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = localStorage.getItem('token');
    return savedJwt || null;
  });

  const logout = () => {
    setUser(null);

    setAvatar(null);
    setId(null);
    setPassword(null);

    setJwt(null);
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('avatar');
    navigate('/login');
  };

  const login = (resUser, resToken, resId, resAvatar, resPassword) => {
    setUser(resUser);
    setJwt(resToken);
    setAvatar(resAvatar);
    setPassword(resPassword);
    setId(resId);
    localStorage.setItem('user', JSON.stringify(resUser));
    localStorage.setItem('token', resToken);
    localStorage.setItem('id', resId);
    localStorage.setItem('avatar', resAvatar);
    localStorage.setItem('password', resPassword);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        jwt,
        id,
        password,
        setPassword,
        setId,
        logout,
        login,
        setUser,
        setJwt,
        setAvatar,
        avatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
