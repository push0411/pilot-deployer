// src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.message}>This page is under construction.</p>
      <p style={styles.message}>Please check back later!</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    marginTop: '50px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '60%',
    margin: 'auto',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default AdminDashboard;
