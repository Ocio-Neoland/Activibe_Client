import React from 'react';

const InputCreate = ({ info, value, action }) => {
  return (
    <div className="inputGroup">
      <input
        className="input"
        required=""
        onChange={action}
        type={info === 'image' ? 'file' : 'text'}
        value={value}
        placeholder={info === 'description' ? 'Descripción' : 'Nombre'}
      />
      <label htmlFor="name">{info === 'description' ? 'Descripción' : 'Nombre'}</label>
    </div>
  );
};

export default InputCreate;
