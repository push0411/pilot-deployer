import React, { useEffect, useState } from 'react';
import './MyProjects.css';
import STATUS_MAP from '../statusMap';
import TopBarWithLogo from './TopBarWithLogo'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ITEMS_PER_PAGE = 3;

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComponents, setSelectedComponents] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/projects-me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch projects');

        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, projects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const renderTeamMembers = (members) =>
    members.map((m, i) => (
      <span key={i}>
        {m.userID}
        {i < members.length - 1 && ', '}
      </span>
    ));

  return (
    <div>
      <TopBarWithLogo title='My Projects'/>
      <div className="my-projects">
      {/* <h2></h2> */}
      
      <input
        type="text"
        className="search-input"
        placeholder="Search by Project ID or Title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <>
          <table className="project-table">
            <thead>
              <tr>
                <th>Project ID / Name</th>
                <th>Team Members</th>
                <th>View Components</th>
                <th>Guide Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project, index) => (
                <tr key={project.ID || index}>
                  <td>
                    <strong>{project.ID}</strong>
                    <br />
                    {project.title}
                  </td>
                  <td>{renderTeamMembers(project?.team?.members || [])}</td>
                  <td>
                    <a className="view-link" onClick={() => setSelectedComponents(project.components)}>
                      View Components ({project.components?.length || 0})
                    </a>
                  </td>
                  <td>
                    <div>{project?.projectGuide?.userID || 'N/A'}</div>
                    <div>
                      {project?.projectGuide?.firstName && project?.projectGuide?.lastName
                        ? `${project.projectGuide.firstName} ${project.projectGuide.lastName}`
                        : 'Unknown'}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${project.status}`}>
                      {STATUS_MAP[project.status] ?? 'Unknown Status'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={handlePrev} disabled={currentPage === 1}>{'<'}</button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>{'>'}</button>
            </div>
          )}
        </>
      )}

      {selectedComponents && (
        <div className="modal-overlay" onClick={() => setSelectedComponents(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Components</h3>
            <table className="component-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Qty</th>
                  <th>Accepted</th>
                  <th>Fullfilled</th>
                </tr>
              </thead>
              <tbody>
                {selectedComponents.map((comp, idx) => (
                  <tr key={idx}>
                    <td>{comp.id}</td>
                    <td>{comp.name}</td>
                    <td>{comp.purpose}</td>
                    <td>{comp.quantity}</td>
                    <td>{comp.accepted ? 'Yes' : 'No'}</td>
                    <td>{comp.fullfilledQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={() => setSelectedComponents(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
  );
}

export default MyProjects;
