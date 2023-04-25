import { createContext, useState } from 'react';

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState('Madrid');

  //   const [city, setCity] = useState(() => {
  //     const savedCity = localStorage.getItem('city');
  //     const initialValue = JSON.parse(savedCity);
  //     return initialValue || null;
  //   });

  return (
    <CityContext.Provider value={{ city, setCity }}>{children}</CityContext.Provider>
  );
};
