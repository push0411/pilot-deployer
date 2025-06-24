import React from 'react';
import './ManagerDashboard.css';
import { useNavigate } from 'react-router-dom';
import TopBarWithLogo from './TopBarWithLogo';
import Footer from '../../components/Footer';
import axios from 'axios';
import QuickActions from './QuickActions';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  // const features = [
  //   { name: 'Projects', path: '/all-projects' },
  //   { name: 'Create Cart', path: '/get-order' },
  //   { name: 'Search Components', path: '/search-components' },
  //   { name: 'View Carts', path: '/view-carts', triggerGenerate: true },
  //   { name: 'Create Component', path: '/create-component'},
  //   { name: 'Assign Slots', path:'/assign-slot'},
  //   { name: 'Distribute Components', path:'/check-out'},
  //   { name: 'Check-In', path:'/check-in'}
  // ];

  const handleNavigation = async (feature) => {
    navigate(feature.path);
  };

  return (
    <div className="manager-dashboard">
      <TopBarWithLogo title="Manager Dashboard" />
      <QuickActions/>
      {/* <div className="dashboard-content"> */}
        {/* <div className="actions-card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="button-group">
            {features.map((feature, index) => (
              <button
                key={index}
                className="action-button-new"
                onClick={() => handleNavigation(feature)}
              >
                {feature.name}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default ManagerDashboard;
