import React from 'react';

export const Mensaje = (props) => {
  if (props.cliente)
    return (
      <div style={{ textAlign: 'right' }}>
        <h1>{props.text}</h1>
      </div>
    );

  if (props.bot)
    return (
      <div>
        <h1>{props.text}</h1>
      </div>
    );

  return null;
};
