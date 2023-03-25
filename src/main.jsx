import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import App from './App';
import { CityContextProvider } from './Context/CityContext';
import { ThemeContextProvider } from './Context/ThemeContext';
import { UserContextProvider } from './Context/UserContext';
import About from './Pages/About/About';
import ActivityDetail from './Pages/ActivityDetail/ActivityDetail';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import Sections from './Pages/Sections/Sections';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ThemeContextProvider>
        <UserContextProvider>
          <CityContextProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/:name" element={<Sections />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/:name/:id" element={<ActivityDetail />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </CityContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
