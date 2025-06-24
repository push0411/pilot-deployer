import React from 'react';
import './css/Notification.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notification-container success">
      <Header />
      <div className="notification-content">
        <div className="notification-box">
          <div className="icon">&#10004;</div>
          <h2>Project Created Successfully</h2>
          <p>Your project has been created and saved to the system.</p>
          <button onClick={() => navigate(-2)}>Go to Dashboard</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
