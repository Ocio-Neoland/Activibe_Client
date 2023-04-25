import './Footer.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>ActiVibe</h4>
            <ul>
              <li>
                <NavLink to={'/about'}>Sobre nosotros </NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Blog</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Empleo</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Obtén ayuda</h4>
            <ul>
              <li>
                <NavLink to={'/about'}>FAQ</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Prensa</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Hagamos negocios</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <NavLink to={'/about'}>Términos de uso</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Privacidad</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>Política de cookies</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>¡Síguenos!</h4>
            <div className="social-links">
              <NavLink to={'/about'}>
                <i className="fab fb fa-facebook-f"></i>
              </NavLink>
              <NavLink to={'/about'}>
                <i className="fab fa-twitter"></i>
              </NavLink>
              <NavLink to={'/about'}>
                <i className="fab fa-instagram"></i>
              </NavLink>
              <NavLink to={'/about'}>
                <i className="fab fa-linkedin-in"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
