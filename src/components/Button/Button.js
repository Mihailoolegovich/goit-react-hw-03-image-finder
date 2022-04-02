import propTypes from 'prop-types';
import React from 'react';
import './Button.css';

const Button = ({ onClick }) => (
  <>
    <button className="button" type="button" onClick={onClick}>
      Lode More
    </button>
  </>
);

Button.propTypes = {
  onClick: propTypes.func,
};

export default Button;
