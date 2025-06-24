import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signfail.css';
import logo from '../images/logo.png';

function SignFail() {
  const navigate = useNavigate();

  return (
    <div className='login-failed-container'>
      <div className='login-failed-box'>
        <img src={logo} alt='WCE Logo' className='login-failed-logo' />
        <h1>SignUp Failed</h1>
        <p>Something went wrong. Please try again.</p>
        <div className='button-group'>
          <button className='login-btn' onClick={() => navigate('/')}>Login</button>
          <button className='signup-btn' onClick={() => navigate('/sign-up')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignFail;
