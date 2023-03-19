import './App.css';

import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';

const App = () => {
  return (
    <div className="App">
      <BaseLayout>
        <Header />
        <Outlet />
        <Footer />
      </BaseLayout>
    </div>
  );
};

export default App;
