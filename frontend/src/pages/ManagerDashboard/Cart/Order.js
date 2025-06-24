// === Order.js ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { useNavigate, useParams } from 'react-router-dom';
import CreateVendor from './CreateVendor';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../images/logo.png';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Order = () => {
  const { cartID } = useParams();
  const [vendorID, setVendorID] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorList, setVendorList] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [cart, setCart] = useState(null);
  const [showCreateVendor, setShowCreateVendor] = useState(false);
  const [showPDFNotice, setShowPDFNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-cart/${cartID}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCart(res.data.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-all-vendors`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setVendorList(res.data.vnds || []);
      } catch (err) {
        console.error('Error fetching vendors:', err);
      }
    };

    fetchCart();
    fetchVendors();
  }, [cartID]);

  const handleOrder = async () => {
    await generatePDF();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${BASE_URL}/order-cart`,
        {
          vendorID,
          vendorName,
          orderDate: new Date(),
          cartId: cartID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (res.data.success) {
        setShowPDFNotice(true);
        setTimeout(() => navigate('/manager-dashboard'), 5000);
      }
    } catch (err) {
      console.error(err);
      alert('Order failed.');
    }
  };

  const generatePDF = async () => {
    const token = localStorage.getItem('token');
    const invoiceItems = cart.details.map((item) => ({
      ID: item.ID,
      name: item.Name,
      toOrder: item.orderedQuantity,
    }));

    try {
      const meRes = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const senderName = meRes?.data?.data?.name || 'Department Representative';

      const doc = new jsPDF();
      const img = new Image();
      img.src = logo;

      img.onload = () => {
        doc.addImage(img, 'PNG', 14, 10, 28, 28);
        doc.setFont('Times', 'Bold');
        doc.setFontSize(14);
        doc.text('Department of Electronics Engineering', 45, 16);

        doc.setFont('Times', 'Normal');
        doc.setFontSize(12);
        doc.text('Walchand College of Engineering, Sangli', 45, 23);
        doc.text('416416, Maharashtra, India', 45, 30);
        doc.setFontSize(11);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 30, { align: 'right' });
        doc.setDrawColor(100);
        doc.setLineWidth(0.3);
        doc.line(14, 38, 196, 38);

        let y = 48;
        doc.text('To,', 14, y);
        doc.text('The Supplier,', 14, (y += 7));

        doc.setFont('Times', 'Bold');
        doc.text('Subject:', 14, (y += 12));
        doc.setFont('Times', 'Normal');
        doc.text('Request for the supply of listed electronic components.', 32, y);

        doc.text('Respected Sir/Madam,', 14, (y += 12));
        doc.text(
          'We kindly request you to supply the following electronic components listed below as they are',
          14,
          (y += 10),
          { maxWidth: 180 }
        );
        doc.text(
          'essential for the ongoing academic and project activities in our department.',
          14,
          (y += 6),
          { maxWidth: 180 }
        );

        const invoiceData = invoiceItems.map((item, index) => [
          index + 1,
          item.ID,
          item.name,
          item.toOrder,
        ]);

        autoTable(doc, {
          startY: y + 10,
          head: [['#', 'ID', 'Name', 'Required Quantity']],
          body: invoiceData,
          theme: 'grid',
          styles: { fontSize: 11 },
          headStyles: { fillColor: [50, 50, 50], textColor: 255 },
        });

        const afterTableY = doc.lastAutoTable.finalY + 10;
        doc.text(
          'We assure you that the components will be utilized solely for academic and research purposes.',
          14,
          afterTableY
        );
        doc.text(
          'We would appreciate your prompt response and cooperation in this matter.',
          14,
          afterTableY + 8
        );

        doc.text('Thank you.', 14, afterTableY + 18);
        doc.text('Sincerely,', 14, afterTableY + 26);
        doc.setFont('Times', 'Bold');
        doc.text(`${senderName}`, 14, afterTableY + 33);
        doc.setFont('Times', 'Normal');
        doc.text('Department of Electronics Engineering', 14, afterTableY + 40);
        doc.text('WCE, Sangli', 14, afterTableY + 47);

        const signatureY = afterTableY + 70;
        doc.setLineWidth(0.2);
        doc.line(30, signatureY, 80, signatureY);
        doc.line(130, signatureY, 180, signatureY);

        doc.setFontSize(11);
        doc.text('Head of Department', 30, signatureY + 6);
        doc.text('Dept. of Electronics Engg.', 30, signatureY + 12);
        doc.text('Director', 130, signatureY + 6);
        doc.text('Walchand College of Engineering', 130, signatureY + 12);
        doc.text('Sangli', 130, signatureY + 18);

        doc.save(`Order_${cart.ID}.pdf`);
      };

      img.onerror = () => {
        alert('Failed to load logo.');
      };
    } catch (err) {
      console.error('Error while creating PDF:', err);
      alert('Failed to generate PDF.');
    }
  };

  const handleVendorChange = (e) => {
    const input = e.target.value;
    setVendorID(input);

    const filtered = vendorList.filter(
      (v) =>
        v.ID.toLowerCase().includes(input.toLowerCase()) ||
        v.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredVendors(filtered);

    const selected = filtered.find((v) => v.ID.toLowerCase() === input.toLowerCase());
    if (selected) {
      setVendorName(selected.name);
    } else {
      setVendorName('');
    }
  };

  if (!cart) return <div className="order-container">Loading...</div>;
return (
  <div className="order-container">
    <h2>Order Cart - {cart.ID}</h2>

    <div className="vendor-section">
      <label htmlFor="vendor-search">Select Vendor:</label>
      <input
        id="vendor-search"
        type="text"
        className="vendor-search-input"
        value={vendorID}
        placeholder="Search Vendor by ID or Name"
        onChange={handleVendorChange}
        onBlur={() => setTimeout(() => setFilteredVendors([]), 150)}
        onFocus={() =>
          setFilteredVendors(
            vendorList.filter(
              (v) =>
                v.ID.toLowerCase().includes(vendorID.toLowerCase()) ||
                v.name.toLowerCase().includes(vendorID.toLowerCase())
            )
          )
        }
        autoComplete="off"
      />

      {filteredVendors.length > 0 && (
        <ul className="vendor-suggestions">
          {filteredVendors.map((vendor) => (
            <li
              key={vendor.ID}
              onMouseDown={() => {
                setVendorID(vendor.ID);
                setVendorName(vendor.name);
                setFilteredVendors([]);
              }}
            >
              <strong>{vendor.ID}</strong> – {vendor.name}
            </li>
          ))}
        </ul>
      )}

      {vendorName && <div className="vendor-name">Vendor: {vendorName}</div>}
      {!vendorName && vendorID && (
        <div className="vendor-error">Invalid Vendor ID. Please choose from the list.</div>
      )}

      <p className="create-vendor-link">
        Can’t find vendor?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowCreateVendor(true);
          }}
        >
          Create Vendor
        </a>
      </p>
    </div>

    {showCreateVendor && (
      <CreateVendor
        onVendorCreated={(id, name) => {
          setVendorID(id);
          setVendorName(name);
          setShowCreateVendor(false);
        }}
      />
    )}

    <div className="order-summary">
      <h3>Order Summary</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.details.map((item, i) => (
            <tr key={i}>
              <td>{item.ID}</td>
              <td>{item.Name}</td>
              <td>{item.orderedQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button onClick={generatePDF}>Get PDF</button>
        <button onClick={handleOrder}>Order</button>
      </div>
    </div>

    {showPDFNotice && (
      <div className="pdf-notice">Downloading PDF... Redirecting to dashboard</div>
    )}
  </div>
);

};

export default Order;
