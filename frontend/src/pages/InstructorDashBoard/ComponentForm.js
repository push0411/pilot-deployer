import React from 'react';
import './ComponentForm.css';
import { FaInfoCircle } from 'react-icons/fa';

const ComponentForm = () => {
  return (
    <div className="component-form-container">
      <h2>Component Request</h2>

      <div className="info-box">
        <FaInfoCircle className="info-icon" />
        <div>
          <p>
            Here Instructor can request components for <strong>personal use</strong> or for <strong>educational purposes</strong>.
          </p>
          <p className="note-text">
            This change will be released soon in the <strong>next version</strong> of the system!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentForm;
