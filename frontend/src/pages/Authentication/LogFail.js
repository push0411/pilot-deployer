import React from 'react';
import { useNavigate } from 'react-router-dom';
import './loginFailed.css';
import logo from '../../images/logo.png';
// adjust the path as needed

function LoginFailed() {
  const navigate = useNavigate();

  return (
    <div className='login-failed-container'>
      <div className='login-failed-box'>
        <img src={logo} alt='WCE Logo' className='login-failed-logo' />
        <h1>Login Failed</h1>
        <p>Oops! The credentials you entered are incorrect.</p>
        <button onClick={() => navigate('/')}>Go Back to Login</button>
      </div>
    </div>
  );
}

export default LoginFailed;
