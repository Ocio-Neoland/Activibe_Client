import './Header.css';

import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { types } from '../../data/data';

const Header = () => {
  const menuBtn = useRef('null');
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  return (
    <header>
      <div className="ocio-nav-container">
        <img src="#" alt="imagen" />
        <nav>
          <ul>
            <li>
              {' '}
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/profile'}>Profile</NavLink>
            </li>
            <li>
              {' '}
              <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
              <NavLink to={'/register'}>Register</NavLink>
            </li>
            <li>
              <button className="ocio-sections-btn" ref={menuBtn} onClick={handleClick}>
                Sections
              </button>
            </li>
            <li>
              <NavLink to={'/about'}>About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {menu !== false && (
        <ul className="ocio-menu-sections">
          {types.map((type) => (
            <NavLink to={`/${type.name}`} key={type.name}>
              {type.name}
            </NavLink>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
