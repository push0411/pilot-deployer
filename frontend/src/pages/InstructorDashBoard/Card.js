import React, { useState } from 'react';
import './Card.css';
import STATUS_MAP from '../statusMap'; // Adjust the path as needed

const Card = ({
  title,
  projectID,
  description,
  components,
  team,
  guideID,
  guideName,
  createdAt,
  onApprove,
  onDeny,
  status // Make sure this is passed from parent
}) => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = (e) => {
    e.preventDefault(); // Prevent page reload
    setShowTable(!showTable);
  };

  const statusSteps = Object.entries(STATUS_MAP).map(([key, value]) => ({
    id: parseInt(key),
    label: value
  }));

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
            <a className="link-text" href="#" onClick={toggleTable}>
              {showTable ? 'Hide Component Table' : 'View Component Table'}
            </a>
          </>
        ) : (
          'None'
        )}
      </p>

      {showTable && (
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

      <p>
        <span className="label">Team:</span>{' '}
        {team ? team : 'None'}
      </p>

      <p>
        <span className="label">Project Guide:</span>{' '}
        {guideID} - {guideName}
      </p>

      {/* Status Tracker */}
      <div className="status-tracker">
        {statusSteps.map((step, index) => (
          <div
            key={step.id}
            className={`status-step ${step.id <= status ? 'completed' : ''}`}
          >
            <div className="status-dot"></div>
            <span className="status-label">{step.label}</span>
            {index !== statusSteps.length - 1 && <div className="status-line"></div>}
          </div>
        ))}
      </div>

      <div className="card-footer">
        <div className="fter">
          Created: {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="card-buttons">
          <button className="approve-btn" onClick={() => onApprove()}>Approve</button>
          <button className="deny-btn" onClick={() => onDeny()}>Deny</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
