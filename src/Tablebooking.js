import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableBooking.css'; // Import CSS file for styling
import AdminPanel from './AdminPanel';

const TableBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch booked tables data from the server
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://localhost:44384/api/TableBookings');
        const bookingsData = response.data.$values;

        // Fetch customer data for each booking
        const bookingsWithCustomers = await Promise.all(bookingsData.map(async (booking) => {
          // Fetch customer details for the current booking
          const customerResponse = await axios.get(`https://localhost:44384/api/Customers/${booking.customerId}`);
          const customer = customerResponse.data; // Assuming the customer data is returned as an object
          

          // Format bookingDateTime to display only the date part
          const formattedBooking = {
            ...booking,
            bookingDateTime: new Date(booking.bookingDateTime).toLocaleDateString(),
            customerName: customer.name // Add customer name to the booking data
          };
          
          return formattedBooking;
        }));

        setBookings(bookingsWithCustomers);
      } catch (error) {
        console.error('Error fetching table bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <AdminPanel />
      <div className="table-bookings-container-admin">
        <h2>Table Bookings</h2>
        <div className="table-card-container-admin">
          {bookings.map((booking, index) => (
            <div className="table-card-admin" key={index}>
              <h3>Table Number: {booking.tableNumber}</h3>
              <p><strong>Customer Name:</strong> {booking.customerName}</p> {/* Display customer name */}
              <p><strong>Booking Date:</strong> {booking.bookingDateTime}</p>
              <p><strong>Number of Guests:</strong> {booking.numberOfGuests}</p>
              {/* Add other properties here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
