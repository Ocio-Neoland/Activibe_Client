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
                <NavLink to={'/'}>Sobre nosotros </NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Blog</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Empleo</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Obtén ayuda</h4>
            <ul>
              <li>
                <NavLink to={'/'}>FAQ</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Prensa</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Hagamos negocios</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <NavLink to={'/'}>Términos de uso</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Privacidad</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Política de cookies</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>¡Síguenos!</h4>
            <div className="social-links">
              <NavLink to={'/'}>
                <i className="fab fb fa-facebook-f"></i>
              </NavLink>
              <NavLink to={'/'}>
                <i className="fab fa-twitter"></i>
              </NavLink>
              <NavLink to={'/'}>
                <i className="fab fa-instagram"></i>
              </NavLink>
              <NavLink to={'/'}>
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
