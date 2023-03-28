import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState(() => {
    const savedName = sessionStorage.getItem('search');
    return savedName || null;
  });

  const [searchFinish, setSearchFinish] = useState(false);

  return (
    <SearchContext.Provider value={{ search, setSearch, searchFinish, setSearchFinish }}>
      {children}
    </SearchContext.Provider>
  );
};
