import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonCard.css';

const ButtonCard = ({ buttons }) => {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className="professional-button"
          onClick={() => navigate(btn.path)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonCard;
