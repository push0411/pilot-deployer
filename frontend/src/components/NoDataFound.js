// src/components/NoDataFound.js
import React from 'react';
import './NoDataFound.css';
import defaultImage from '../images/NoProjects.jpg'; // You can change the image path

const NoDataFound = ({ message = "No data available.", image = defaultImage, height = "300px" }) => {
  return (
    <div className="no-data-container">
      <img src={image} alt="No data" style={{ maxHeight: height }} />
      <p>{message}</p>
    </div>
  );
};

export default NoDataFound;
