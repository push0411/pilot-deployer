import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import './StudentDashboard.css';
import Footer from '../../components/Footer';
import Navbar from './Navbar';
import TopBarWithLogo from './TopBarWithLogo'
import InstructionCard from './InstructionCard';
function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const token = localStorage.getItem('token');
  const actions = [
  { name: 'Team Creator Wizard', path: '/create-team' },
  { name: 'Project Creator Wizard', path: '/create-project?new=true' },
  { name: 'My Projects', path: `/my-projects` },
  { name: 'Teams', path: '/my-teams' },
];
  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* {isSidebarOpen && <Sidebar />} */}
      <TopBarWithLogo title='Student Dashboard'/>
      <div className="main-section">
        {/* <Topbar title="Live Projects" onToggleSidebar={toggleSidebar} /> */}
        <div className="mstt1">
          <h2>Live Projects</h2>
          <Dashboard />
          <InstructionCard/>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default StudentDashboard;
