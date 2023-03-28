import './Spinner.css';

import React from 'react';

const Spinner = () => {
  return (
    <div className="loadingspinner">
      <div id="square1"></div>
      <div id="square2"></div>
      <div id="square3"></div>
      <div id="square4"></div>
      <div id="square5"></div>
    </div>
  );
};

export default Spinner;
