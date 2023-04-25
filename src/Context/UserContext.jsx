import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    const initialValue = JSON.parse(savedUser);
    return initialValue || null;
  });

  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = sessionStorage.getItem('avatar');
    return savedAvatar || null;
  });

  const [password, setPassword] = useState(() => {
    const savedPassword = sessionStorage.getItem('password');
    return savedPassword || null;
  });

  const [id, setId] = useState(() => {
    const savedId = sessionStorage.getItem('id');
    return savedId || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = sessionStorage.getItem('token');
    return savedJwt || null;
  });

  const logout = () => {
    setUser(null);

    setAvatar(null);
    setId(null);
    setPassword(null);

    setJwt(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('avatar');
    navigate('/');
  };

  const login = (resUser, resToken, resId, resAvatar, resPassword) => {
    setUser(resUser);
    setJwt(resToken);
    setAvatar(resAvatar);
    setPassword(resPassword);
    setId(resId);
    sessionStorage.setItem('user', JSON.stringify(resUser));
    sessionStorage.setItem('token', resToken);
    sessionStorage.setItem('id', resId);
    sessionStorage.setItem('avatar', resAvatar);
    sessionStorage.setItem('password', resPassword);
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
