import React from 'react';

const InputEdit = ({ info, action, value }) => {
  return (
    <div className="inputGroup">
      <input
        className="input"
        required=""
        value={value}
        onChange={action}
        type={info === 'image' ? 'file' : 'text'}
        placeholder={info === 'description' ? 'Descripción' : 'Nombre'}
      />
      <label htmlFor="name">{info === 'description' ? 'Descripción' : 'Nombre'}</label>
    </div>
  );
};

export default InputEdit;
