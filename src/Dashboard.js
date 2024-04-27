import React, { useState, useEffect } from 'react';
import { createTableBooking } from './api/tableApi';
import Modal from './Modal';
import './Dashboard.css';
import SidePanel from './SidePannel';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const Dashboard = () => {
  const email = Cookies.get('email') || ''; 
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: '',
    tableNumber: 0
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://localhost:44384/api/TableBookings');
        console.log('Fetched bookings:', response.data);

        const fetchedBookings = response.data.$values || [];
        const initialTables = Array.from({ length: 10 }, (_, index) => ({
          tableNumber: index + 1,
          isBooked: fetchedBookings.some(booking => booking.tableNumber === index + 1)
        }));
        
        setTables(initialTables);
        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
      }
    };

    fetchBookings();
  }, []);

  const handleTableSelect = (table) => {
    if (table.isBooked) {
      alert('Sorry, this table is already booked.');
      return;
    }

    setSelectedTable(table);
    setShowModal(true);
    setBookingDetails({ ...bookingDetails, tableNumber: table.tableNumber, email: email });
  };

  const handleSubmitBooking = async () => {
    try {
      const bookingData = {
        bookingDateTime: new Date().toISOString(),
        numberOfGuests: parseInt(bookingDetails.numberOfGuests),
        customerId: 0,
        tableNumber: bookingDetails.tableNumber,
        isBooked: true,
        customer: {
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          tableBookings: []
        }
      };

      await createTableBooking(bookingData);

      const updatedTables = tables.map(table => {
        if (table.tableNumber === bookingDetails.tableNumber) {
          return { ...table, isBooked: true };
        }
        return table;
      });

      setTables(updatedTables);
      setSelectedTable(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    }
  };

  return (
    <div>
      <SidePanel />
      <h2>Book tables</h2>
      <div className="dashboard-container">
        <div className="tables-container">
          <div className="table-grid">
            {tables.map((table, index) => (
              <div key={index} className={`table-card ${table.isBooked ? 'booked' : ''}`} onClick={() => handleTableSelect(table)}>
                <p className="table-number">{`Table ${table.tableNumber}`}</p>
                {table.isBooked && <p className="status">Booked</p>}
              </div>
            ))}
          </div>
        </div>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmitBooking}
            onChange={(e) => setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value })}
            bookingDetails={bookingDetails}
            email={email} // Pass email as prop to Modal
          />
        )}
        <div>{error && <div>{error}</div>}</div>
      </div>
    </div>
  );
};

export default Dashboard;
