import './Btn-darkMode.css';

import { useContext } from 'react';

import { ThemeContext } from '../../Context/ThemeContext';
useContext;
const BtnDarkMode = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="btn-DarkMode">
        <input
          onChange={() => toggleTheme()}
          type="checkbox"
          className="checkbox "
          id="checkbox"
        />
        <label htmlFor="checkbox" className="label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball " />
        </label>
      </div>
    </>
  );
};
export default BtnDarkMode;
