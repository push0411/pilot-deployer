import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCarts.css';
import TopBarWithLogo from '../TopBarWithLogo';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../images/logo.png';
import NoDataFound from '../../../components/NoDataFound'; // ✅ Import NoDataFound

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ViewCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCart, setSelectedCart] = useState(null);
  const [selectedForRemoval, setSelectedForRemoval] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/get-carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCarts(res.data.data);
      } catch (err) {
        setError('Failed to load carts');
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const openDetailsModal = (cart) => {
    setSelectedCart(cart);
    setSelectedForRemoval([]);
  };

  const closeModal = () => {
    setSelectedCart(null);
    setSelectedForRemoval([]);
  };

  const goToOrderPage = (token) => {
    navigate(`/cart-order/${token}`);
  };

  const handleCheckboxToggle = (index) => {
    setSelectedForRemoval((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeSelectedComponents = () => {
    if (!selectedCart) return;
    const updatedDetails = selectedCart.details.filter(
      (_, index) => !selectedForRemoval.includes(index)
    );
    setSelectedCart({ ...selectedCart, details: updatedDetails });
    setSelectedForRemoval([]);
  };

  const handleCheckIn = (cart) => {
    navigate(`/cart-check-in/${cart.ID}`, { state: { cart } });
  };

  const handleUpdateCart = (cart) => {
    navigate('/get-order', {
      state: {
        cart,
        editMode: true,
      },
    });
  };

  const generatePDF = async (cart) => {
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

      img.onload = async () => {
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

  if (loading) return <div className="view-carts-container11">Loading...</div>;
  if (error) return <div className="view-carts-container11 error11">{error}</div>;

  return (
    <div className="view-carts-container11">
      <TopBarWithLogo title="All Carts" />
      <div className="mstt">
        {carts.length === 0 ? (
          <NoDataFound message="No carts available." />
        ) : (
          <table className="cart-table11">
            <thead>
              <tr>
                <th>Cart ID</th>
                <th>Vendor ID</th>
                <th>Vendor Name</th>
                <th>Creation Date</th>
                <th>Order Date</th>
                <th>Check-In Date</th>
                <th></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart._id}>
                  <td>{cart.ID}</td>
                  <td>{cart.vendorID || 'N/A'}</td>
                  <td>{cart.vendorName || 'N/A'}</td>
                  <td>{new Date(cart.crationDate).toLocaleDateString()}</td>
                  <td>{cart.orderDate ? new Date(cart.orderDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{cart.checkInDate ? new Date(cart.checkInDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button className="btn-view11" onClick={() => openDetailsModal(cart)}>View Details</button>
                  </td>
                  <td>
                    {cart.checkIn ? (
                      <button className="btn-pdf11" onClick={() => generatePDF(cart)}>Get PDF</button>
                    ) : cart.ordered ? (
                      <button className="btn-checkin11" onClick={() => handleCheckIn(cart)}>Check In</button>
                    ) : (
                      <>
                        <button className="btn-order11" onClick={() => goToOrderPage(cart.ID)}>Order</button>
                        <button className="btn-update11" onClick={() => handleUpdateCart(cart)}>Update</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedCart && (
          <div className="modal-overlay11">
            <div className="modal-content11">
              <div className="modal-header11">
                <h3>Details for Cart: {selectedCart.ID}</h3>
                <button className="close-btn11" onClick={closeModal}>✖</button>
              </div>
              <table className="details-table11">
                <thead>
                  <tr>
                    <th></th>
                    <th>Component ID</th>
                    <th>Name</th>
                    <th>Ordered Quantity</th>
                    <th>Received Quantity</th>
                    <th>Deficit</th>
                    <th>Check-In</th>
                    <th>Damage Count</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCart.details.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedForRemoval.includes(i)}
                          onChange={() => handleCheckboxToggle(i)}
                        />
                      </td>
                      <td>{item.ID}</td>
                      <td>{item.Name}</td>
                      <td>{item.orderedQuantity}</td>
                      <td>{item.receivedQuantity ?? 'N/A'}</td>
                      <td>{item.deflict?.number ? `${item.deflict.number} - ${item.deflict.remark}` : 'None'}</td>
                      <td>{item.checkIn ? 'Yes' : 'No'}</td>
                      <td>{item.damageCount ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedForRemoval.length > 0 && (
                <button className="remove-selected-btn11" onClick={removeSelectedComponents}>
                  Remove Selected
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCarts;
