import React from 'react';

const InputEdit = ({ info, action, value }) => {
  return (
    <input
      value={value}
      onChange={action}
      type={info === 'image' ? 'file' : 'text'}
      placeholder={info}
    />
  );
};

export default InputEdit;
