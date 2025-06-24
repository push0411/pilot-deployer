import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signsuc.css';
import logo from '../images/logo.png';
// adjust the path as needed

function SignSuc() {
  const navigate = useNavigate();

  return (
    <div className='login-failed-container'>
      <div className='login-failed-box'>
        <img src={logo} alt='WCE Logo' className='login-failed-logo' />
        <h1>User Registered Successfully</h1>
        <button onClick={() => navigate('/')}>Login to Continue </button>
      </div>
    </div>
  );
}

export default SignSuc;
