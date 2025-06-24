import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function getUserData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.name;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return "Unknown";
  }
}

function Topbar({ title }) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Something went wrong while logging out.');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    async function fetchData() {
      const name = await getUserData();
      const firstName = name.split(' ')[0];
      setUserName(firstName);
    }
    fetchData();
  }, []);

  return (
    <div className="topbar1">
      <div className="spacer1">{title}</div>
      <div className="user-info1">
        <div className="dropdown1">
          <p className="pnm1">{userName}</p>
          <div className="dropdown-content1">
            <button onClick={handleProfile}>
              <FaUserCircle className="icon1" /> Profile
            </button>
            <button onClick={handleLogout}>
              <FaSignOutAlt className="icon1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
