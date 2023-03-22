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

  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem('id');
    return savedId || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = localStorage.getItem('token');
    return savedJwt || null;
  });

  const [editingMovie, setEditingMovie] = useState({});

  const logout = () => {
    setUser(null);
    setId(null);

    setJwt(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
  };

  const login = (resUser, resToken, resId) => {
    setUser(resUser);
    setJwt(resToken);
    setId(resId);
    localStorage.setItem('user', JSON.stringify(resUser));
    localStorage.setItem('token', resToken);
    localStorage.setItem('id', resId);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        jwt,
        id,
        setId,
        logout,
        login,
        setUser,
        setJwt,
        editingMovie,
        setEditingMovie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
