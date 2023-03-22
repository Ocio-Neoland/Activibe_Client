import React from 'react';

const InputCreate = ({ info, value, action }) => {
  return (
    <input
      onChange={action}
      type={info === 'image' ? 'file' : 'text'}
      value={value}
      placeholder={info}
    />
  );
};

export default InputCreate;
