import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TokenMissing.css';

function TokenMissing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="token-missing-container">
      <div className="token-missing-box">
        <h1>Access Denied</h1>
        <p className="message">Token Missing! Please log in to continue.</p>
      </div>
    </div>
  );
}

export default TokenMissing;
