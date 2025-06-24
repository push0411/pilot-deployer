import React, { useEffect, useState } from 'react';
import Card from './Card';
import allDone from '../../images/allDone.png';
import './ProjectApprovalManager.css';
import TopBarWithLogo from './TopBarWithLogo';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProjectApprovalManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectID, isApproved) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/${projectID}/approval`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approved: isApproved }),
      });

      if (!response.ok) throw new Error('Failed to update approval status');

      setProjects((prev) =>
        prev.map((proj) =>
          proj.ID === projectID ? { ...proj, isApproved } : proj
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleApprove = (project) => updateProjectStatus(project.ID, true);
  const handleDeny = (project) => updateProjectStatus(project.ID, false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const pendingProjects = projects.filter((p) => p.isApproved !== true);

  return (
    <div className="dashboard-layout">
      <TopBarWithLogo title="Project Approval Manager" />
      <div className="main-content">
        {loading ? (
          <p style={{ padding: '30px' }}>Loading...</p>
        ) : pendingProjects.length === 0 ? (
          <div className="empty-state">
            <img src={allDone} alt="All Done" className="empty-img" />
            <h2>All Projects Approved!</h2>
            <p>No pending approvals at the moment. Take a break 😊</p>
          </div>
        ) : (
          <div className="dashboard-body">
            {pendingProjects.map((project, index) => (
              <Card
                key={project.ID || index}
                title={project.title}
                projectID={project.ID}
                description={project.description}
                components={project.components}
                team={project.team?.teamID || 'N/A'}
                guideID={project.projectGuide?.userID || 'N/A'}
                guideName={
                  project.projectGuide
                    ? `${project.projectGuide.firstName} ${project.projectGuide.lastName}`
                    : 'Unknown'
                }
                createdAt={project.createdAt}
                status={project.status ?? 0}
                onApprove={() => handleApprove(project)}
                onDeny={() => handleDeny(project)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectApprovalManager;
