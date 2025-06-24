import React, { useState } from 'react';
import './QuickActions.css';

const QuickActions = () => {
  const [checkoutData, setCheckoutData] = useState({
    componentId: '',
    componentName: '',
    userId: '',
    quantity: ''
  });

  const [checkinData, setCheckinData] = useState({
    componentId: '',
    userId: '',
    quantity: ''
  });

  const handleCheckoutChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleCheckinChange = (e) => {
    setCheckinData({ ...checkinData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    console.log('Check Out Data:', checkoutData);
    // API call here
  };

  const handleCheckinSubmit = (e) => {
    e.preventDefault();
    console.log('Check In Data:', checkinData);
    // API call here
  };

  return (
    <div className="quick-actions-container">
      <h2>Quick Component Check Out</h2>
      <form onSubmit={handleCheckoutSubmit} className="quick-form">
        <div className="horizontal-row">
          <input
            type="text"
            name="componentId"
            placeholder="Component ID"
            value={checkoutData.componentId}
            onChange={handleCheckoutChange}
            required
          />
          <input
            type="text"
            name="componentName"
            placeholder="Component Name"
            value={checkoutData.componentName}
            onChange={handleCheckoutChange}
            required
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={checkoutData.userId}
            onChange={handleCheckoutChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={checkoutData.quantity}
            onChange={handleCheckoutChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="submit-button">Check Out</button>
      </form>

      <h2>Quick Component Check In</h2>
      <form onSubmit={handleCheckinSubmit} className="quick-form">
        <div className="horizontal-row">
          <input
            type="text"
            name="componentId"
            placeholder="Component ID"
            value={checkinData.componentId}
            onChange={handleCheckinChange}
            required
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={checkinData.userId}
            onChange={handleCheckinChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={checkinData.quantity}
            onChange={handleCheckinChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="submit-button">Check In</button>
      </form>
    </div>
  );
};

export default QuickActions;
