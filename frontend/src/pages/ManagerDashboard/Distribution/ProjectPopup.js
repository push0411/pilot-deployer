import React from 'react';
import './ProjectPopup.css';
const ProjectPopup = ({ project, onClose }) => {
  const leadMember = project?.teamID?.members?.find((m) => m.role === "Lead");

  return (
    <div className="popup-modal">
      <div className="popup-content">
        <h2>{project.title}</h2>
        <p><strong>Project ID:</strong> {project.ID}</p>
        <p><strong>Type:</strong> {project.type}</p>
        <p><strong>Description:</strong> {project.description}</p>

        <hr />

        <h3>Team Details</h3>
        <p><strong>Team Name:</strong> {project.teamID?.teamName}</p>
        <p><strong>Team ID:</strong> {project.teamID?.teamID}</p>
        <p><strong>Lead ID:</strong> {leadMember?.userID ?? 'N/A'}</p>

        <hr />

        <h3>Components</h3>
        <table className="component-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Purpose</th>
              <th>Quantity</th>
              {/* <th>Fulfilled</th> */}
            </tr>
          </thead>
          <tbody>
            {project.components.map((comp) => (
              <tr key={comp._id}>
                <td>{comp.id}</td>
                <td>{comp.name}</td>
                <td>{comp.purpose}</td>
                <td>{comp.quantity}</td>
                {/* <td>{comp.fullfilledQty}/{comp.quantity}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProjectPopup;
