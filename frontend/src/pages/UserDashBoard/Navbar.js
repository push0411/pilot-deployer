import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    alert("Logged out!");
    // Add actual logout logic here
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-area')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="navbar-container">
      <div className="topbar">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <h3 className="nav-title">Navbar Title</h3>
        <div className="user-area" onClick={toggleDropdown}>
          <FaUserCircle size={20} />
          <span className="username">Pushkar</span>
          {dropdownOpen && (
            <div className="dropdown">
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
