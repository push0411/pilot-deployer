import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBarWithLogo from '../TopBarWithLogo';

const CheckInMaster = () => {
  const navigate = useNavigate();

  const handleProjectCheckIn = () => {
    navigate('/project-in');
  };

  const handleCartCheckIn = () => {
    navigate('/view-carts');
  };

  return (
    <div>
      <TopBarWithLogo title='Check In Master' />
      <div style={styles.container}>
        <h1 style={styles.title}>Check In Master</h1>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleProjectCheckIn}>
            Project Check In
          </button>
          <button style={styles.button} onClick={handleCartCheckIn}>
            Cart Check In
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
};

export default CheckInMaster;
