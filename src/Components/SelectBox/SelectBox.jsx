import './SelectBox.css';

import React from 'react';

const SelectBox = () => {
  return (
    <div>
      <form id="app-cover">
        <div id="select-box">
          <input type="checkbox" id="options-view-button" />
          <div id="select-button" className="brd">
            <div id="selected-value">
              <span>¡Elige tu ciudad!</span>
            </div>
            <div id="chevrons">
              <i className="fas fa-chevron-up" />
              <i className="fas fa-chevron-down" />
            </div>
          </div>
          <div id="options">
            <div className="option">
              <input
                className="s-c top"
                type="radio"
                name="platform"
                defaultValue="hackerrank"
              />
              <input
                className="s-c bottom"
                type="radio"
                name="platform"
                defaultValue="hackerrank"
              />
              <i className="fab fa-hackerrank" />
              <span className="label">Madrid</span>
              <span className="opt-val">Madrid</span>
            </div>
            <div className="option">
              <input
                className="s-c top"
                type="radio"
                name="platform"
                defaultValue="stackoverflow"
              />
              <input
                className="s-c bottom"
                type="radio"
                name="platform"
                defaultValue="stackoverflow"
              />
              <i className="fab fa-stack-overflow" />
              <span className="label">Barcelona</span>
              <span className="opt-val">Barcelona</span>
            </div>
            <div className="option">
              <input
                className="s-c top"
                type="radio"
                name="platform"
                defaultValue="freecodecamp"
              />
              <input
                className="s-c bottom"
                type="radio"
                name="platform"
                defaultValue="freecodecamp"
              />
              <i className="fab fa-free-code-camp" />
              <span className="label">Málaga</span>
              <span className="opt-val">Málaga</span>
            </div>
            <div id="option-bg" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectBox;
