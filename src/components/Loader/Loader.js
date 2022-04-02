import React from 'react';
import { Bars } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => (
  <div>
    <Bars
      heigth="200px"
      width="200px"
      color="red"
      ariaLabel="loading-indicator"
    />
  </div>
);

export default Loader;
