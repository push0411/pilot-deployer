import React, { useState } from 'react';
import './Card.css';
import STATUS_MAP from '../statusMap';

const Card = ({
  title,
  projectID,
  description,
  components,
  team,
  guideID,
  guideName,
  createdAt,
  status,
  onApprove,
  onDeny
}) => {
  const [showComponentTable, setShowComponentTable] = useState(false);

  const toggleComponentTable = (e) => {
    e.preventDefault();
    setShowComponentTable(!showComponentTable);
  };

  const statusSteps = Object.entries(STATUS_MAP).map(([key, value]) => ({
    id: parseInt(key),
    label: value
  }));

  const filteredSteps = [];
  const totalSteps = statusSteps.length;
  const liveStep = status + 1;

  for (let i = 0; i < totalSteps; i++) {
    if (
      i === 0 || // first
      i === totalSteps - 1 || // last
      Math.abs(i - liveStep) <= 2 // near current live step
    ) {
      filteredSteps.push({ ...statusSteps[i], show: true });
    } else {
      // Only add ellipsis once between ranges
      if (
        filteredSteps.length > 0 &&
        filteredSteps[filteredSteps.length - 1].label !== '...'
      ) {
        filteredSteps.push({ id: -1, label: '...', show: false });
      }
    }
  }

  return (
    <div className="card">
      <h2>{title}</h2>

      <p><span className="label">Project ID:</span> {projectID}</p>
      <p><span className="label">Description:</span> {description}</p>

      <p>
        <span className="label">Components:</span>{' '}
        {components && components.length > 0 ? (
          <>
            {components.length} component(s) —{' '}
            <a className="link-text" href="#" onClick={toggleComponentTable}>
              {showComponentTable ? 'Hide Component Table' : 'View Component Table'}
            </a>
          </>
        ) : (
          'None'
        )}
      </p>

      {showComponentTable && (
        <table className="component-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Purpose</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {components.map((comp) => (
              <tr key={comp.id}>
                <td>{comp.id}</td>
                <td>{comp.name}</td>
                <td>{comp.purpose}</td>
                <td>{comp.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p><span className="label">Team:</span> {team || 'None'}</p>
      <p><span className="label">Project Guide:</span> {guideID} - {guideName}</p>

      <div className="status-tracker">
        {filteredSteps.map((step, index) =>
          step.show ? (
            <div
              key={index}
              className={`status-step ${
                step.id < liveStep ? 'completed' :
                step.id === liveStep ? 'active' : ''
              }`}
            >
              <div className="status-dot"></div>
              <span className="status-label">{step.label}</span>
              {index !== filteredSteps.length - 1 && <div className="status-line"></div>}
            </div>
          ) : (
            <div key={index} className="status-step ellipsis">
              <span className="status-label">...</span>
              {index !== filteredSteps.length - 1 && <div className="status-line"></div>}
            </div>
          )
        )}
      </div>

      <div className="card-footer">
        <div className="fter">
          Created: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default Card;