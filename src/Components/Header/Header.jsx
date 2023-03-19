import './Header.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
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
            <NavLink to={'/sections'}>Sections</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to={'/activityDetail'}>ActivityDetail</NavLink>
          </li>
          <li>
            <NavLink to={'/about'}>About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
