import React from 'react';
import './InstructorDashboard.css';
import TopBarWithLogo from './TopBarWithLogo';
import ComponentForm from './ComponentForm';


const InstructorDashboard = () => {
  return (
    <div className="dashboard-layout">
      <TopBarWithLogo title="Instructor Dashboard" />
      <div className="main-content">
        <ComponentForm/>
      </div>
    </div>
  );
};

export default InstructorDashboard;
