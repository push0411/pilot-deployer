import React from 'react';
import TokenMissing from './TokenMissing'; // Adjust path as needed

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Show token missing page with auto redirect
    return <TokenMissing />;
  }

  // Logged in, render the component
  return children;
};

export default PrivateRoutes;
