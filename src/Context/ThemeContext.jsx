import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(sessionStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      sessionStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      sessionStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
