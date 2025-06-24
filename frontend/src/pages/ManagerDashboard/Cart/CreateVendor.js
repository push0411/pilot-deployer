// === CreateVendor.js ===
import React, { useState } from 'react';
import axios from 'axios';
import './CreateVendor.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreateVendor = ({ onVendorCreated }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contactNo: '',
    managerName: '',
    managerContact: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(form);
    try {
      const res = await axios.post(`${BASE_URL}/create-vendor`, form, {
        headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
});
   
     if (res.data.success) {
  alert('Vendor created');
  onVendorCreated(res.data.vendorID, res.data.vendorName); // ✅ Correct path
}

    } catch (err) {
      console.error(err);
      alert('Failed to create vendor');
    }
  };

  return (
    <div className="create-vendor-container">
      <h3>Create New Vendor</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="contactNo" placeholder="Contact No" onChange={handleChange} required />
        <input name="managerName" placeholder="Manager Name" onChange={handleChange} required />
        <input name="managerContact" placeholder="Manager Contact" onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateVendor;
