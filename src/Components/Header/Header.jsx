import './Header.css';

import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
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
        <NavLink to={'/'}>
          {' '}
          <img
            src="https://res.cloudinary.com/dqkcdzt1m/image/upload/v1679488952/activibe-removebg-preview_sczveb.png"
            alt="imagen"
          />
        </NavLink>
        <nav>
          <ul>
            <li>
              <button className="ocio-sections-btn" ref={menuBtn} onClick={handleClick}>
                Sections
              </button>
            </li>
            <li>
              <NavLink to={'/profile'}>Profile</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to={'/login'}>
                  <img
                    className="log"
                    src="https://res.cloudinary.com/dsvvktihq/image/upload/v1678960169/utils/20079_iurohv.png"
                    alt="logo login"
                  />
                </NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            )}
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
