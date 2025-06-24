import React from 'react';
import './css/Card.css';

const Card = ({ title, description, price, image, available, quantity }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{description}</div>

      <img className="card-img" src={image} alt={title} />

      <div className="dots">
        <div className="dot blue selected"></div>
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>

      <div className="price">₹{price}</div>
      <div className={`availability ${available ? '' : 'not-available'}`}>
        {available ? 'Available' : 'Not Available'}
      </div>

      {available && (
        <div className="quantity">Quantity: {quantity}</div>
      )}

      <div className="btns">
        <button className="btn">Mark Available</button>
        <button className="btn">Close</button>
      </div>
    </div>
  );
};

export default Card;
