import React, { useEffect, useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [teamNames, setTeamNames] = useState([]);
  const [componentNames, setComponentNames] = useState([]);
  const [guideName, setGuideName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const team = await Promise.all(
        project.team.map(async (member) => {
          const res = await fetch(`/api/users/${member.$oid}`);
          const data = await res.json();
          return data.name;
        })
      );
      setTeamNames(team);

      const guideRes = await fetch(`/api/users/${project.projectGuide.$oid}`);
      const guideData = await guideRes.json();
      setGuideName(guideData.name);
    };

    const fetchComponents = async () => {
      const comps = await Promise.all(
        project.components.map(async (comp) => {
          const res = await fetch(`/api/components/${comp.$oid}`);
          const data = await res.json();
          return data.name;
        })
      );
      setComponentNames(comps);
    };

    fetchUsers();
    fetchComponents();
  }, [project]);

  const formattedDate = new Date(project.createdAt.$date).toLocaleDateString();

  return (
    <div className="project-card">
      <h2 className="project-title">{project.title}</h2>
      <p className="project-id">Project ID: {project.ID}</p>
      <p className="project-description">{project.description}</p>

      <div className="project-meta">
        <div><strong>Components:</strong> {componentNames.join(', ')}</div>
        <div><strong>Team Members:</strong> {teamNames.join(', ')}</div>
        <div><strong>Project Guide:</strong> {guideName}</div>
        <div><strong>Created At:</strong> {formattedDate}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
