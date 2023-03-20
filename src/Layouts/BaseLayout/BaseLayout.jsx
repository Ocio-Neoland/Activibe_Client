import './BaseLayout.css';

import React from 'react';

const BaseLayout = ({ children }) => {
  return <div className="gridLayout">{children}</div>;
};

export default BaseLayout;
