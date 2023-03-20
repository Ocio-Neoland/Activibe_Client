import './Header.css';
import { UserContext } from '../../Context/UserContext';
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { types } from '../../data/data';

const Header = () => {
  const menuBtn = useRef('null');
  const hiddenMenu = useRef('null');
  const [menu, setMenu] = useState(false);
  const { user } = useContext(UserContext);

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
            {!user && (
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            )}
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
        <ul className="ocio-menu-sections" ref={hiddenMenu}>
          {types.map((type) => (
            <NavLink
              className="ocio-a-container"
              onClick={handleClick}
              to={`/${type.name}`}
              key={type.name}
            >
              <img className="icon-menu" src={type.img} alt={type.name} />
              <h2>{type.name}</h2>
            </NavLink>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
