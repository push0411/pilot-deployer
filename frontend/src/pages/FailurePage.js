import React from 'react';
import './css/Notification.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'
const FailurePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.error || 'An unexpected error occurred.';

  return (
   <div className="notification-container failure">
  <Header />
  <div className="notification-content">
    <div className="notification-box">
      <div className="icon">&#9888;</div>
      <h2>Project Creation Failed</h2>
      <p className="error-message">{errorMessage}</p>
      <button onClick={() => navigate("/create-project")}>Try Again</button>
    </div>
  </div>
  <Footer />
</div>

  );
};

export default FailurePage;
