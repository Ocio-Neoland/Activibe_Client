import './Header.css';

import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { CityContext } from '../../Context/CityContext';
import { UserContext } from '../../Context/UserContext';
import { cities, types } from '../../data/data';
import BtnDarkMode from '../Btn-darkMode/Btn-darkMode';

const Header = () => {
  const { logout } = useContext(UserContext);
  const { city, setCity } = useContext(CityContext);
  const menuBtn = useRef('null');
  const hiddenMenu = useRef('null');
  const menuCity = useRef('null');
  const [menu, setMenu] = useState(false);
  const [chooseCity, setChooseCity] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user, avatar } = useContext(UserContext);

  const handleClickMenu = () => {
    if (menu === false) {
      setMenu(true);
      setProfile(false);
      setChooseCity(false);
    } else {
      setMenu(false);
      setProfile(false);
      setChooseCity(false);
    }
  };

  const handleClickAvatar = () => {
    if (profile === false) {
      setProfile(true);
      setMenu(false);
      setChooseCity(false);
    } else {
      setProfile(false);
      setChooseCity(false);
      setMenu(false);
    }
  };

  const handleClickCity = () => {
    if (chooseCity === false) {
      setChooseCity(true);
      setProfile(false);
      setMenu(false);
    } else {
      setProfile(false);
      setMenu(false);
      setChooseCity(false);
    }
  };

  return (
    <header>
      <div className="ocio-nav-container">
        <NavLink to={'/'}>
          <img
            src="https://res.cloudinary.com/dqkcdzt1m/image/upload/v1679488952/activibe-removebg-preview_sczveb.png"
            alt="imagen"
          />
        </NavLink>
        <nav>
          <ul>
            <li>
              <button
                className="ocio-sections-btn"
                ref={menuCity}
                onClick={handleClickCity}
              >
                {`${city}`}
              </button>
            </li>
            <li>
              <button
                className="ocio-sections-btn"
                ref={menuBtn}
                onClick={handleClickMenu}
              >
                Menu
              </button>
            </li>

            <li>
              <NavLink to={'/about'}>About</NavLink>
            </li>

            {!user ? (
              <li>
                <NavLink to={'/login'}>
                  <img
                    className="log"
                    src="https://res.cloudinary.com/dsvvktihq/image/upload/v1678960169/utils/20079_iurohv.png"
                    alt="logo login"
                  />
                </NavLink>
              </li>
            ) : (
              <li>
                <button className="btn-avatar" onClick={handleClickAvatar}>
                  <img className="ocio-avatar-profile" src={avatar} alt={user} />
                </button>
              </li>
            )}
            <BtnDarkMode />
          </ul>
        </nav>
      </div>
      {chooseCity !== false && (
        <ul className="ocio-menu-sections" ref={menuCity}>
          {cities.map((type) => (
            <button className="ocio-a-container" onClick={() => setCity(type)} key={type}>
              {type}
            </button>
          ))}
        </ul>
      )}
      {menu !== false && (
        <ul className="ocio-menu-sections" ref={hiddenMenu}>
          {types.map((type) => (
            <NavLink
              className="ocio-a-container"
              onClick={handleClickMenu}
              to={`/${type.name}`}
              key={type.name}
            >
              <img className="icon-menu" src={type.img} alt={type.name} />
              <h2>{type.name}</h2>
            </NavLink>
          ))}
        </ul>
      )}
      {profile !== false && (
        <ul className="ocio-menu-sections">
          <li>
            <NavLink to="/profile"> Profile</NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                logout(), setProfile(false);
              }}
            ></button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
