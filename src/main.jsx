import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import App from './App';
import Favorites from './Components/FavoritesProfile/FavoritesProfile';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { CityContextProvider } from './Context/CityContext';
import { SearchContextProvider } from './Context/SearchContext';
import { ThemeContextProvider } from './Context/ThemeContext';
import { UserContextProvider } from './Context/UserContext';
import About from './Pages/About/About';
import ActivityDetail from './Pages/ActivityDetail/ActivityDetail';
import Filter from './Pages/FilterPage/Filter';
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
            <SearchContextProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="/:name" element={<Sections />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoutes>
                        <Profile />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/search" element={<Filter />} />
                  <Route
                    path="/:name/:id"
                    element={
                      <ProtectedRoutes>
                        <ActivityDetail />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path="/about" element={<About />} />
                </Route>
              </Routes>
            </SearchContextProvider>
          </CityContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
