import React from 'react';
import './Button.css';

const Button = ({ onClick }) => (
  <>
    <button className="button" type="button" onClick={onClick}>
      Lode More
    </button>
  </>
);

export default Button;
