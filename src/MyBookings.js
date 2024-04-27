import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './TableBooking.css'; // Import CSS file for styling
import SidePanel from './SidePannel';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBookingData, setEditedBookingData] = useState({});
  const userEmail = Cookies.get('email') || ''; // Fetch the email ID from cookies

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch all bookings with the provided email ID
        const bookingsResponse = await axios.get(`https://localhost:44384/api/TableBookings`);
        const bookingsData = bookingsResponse.data.$values;

        // Fetch customer data for each booking
        const bookingsWithCustomers = await Promise.all(bookingsData.map(async (booking) => {
          // Fetch customer details for the current booking
          const customerResponse = await axios.get(`https://localhost:44384/api/Customers/${booking.customerId}`);
          const customer = customerResponse.data; // Assuming the customer data is returned as an object

          // Format bookingDateTime to display only the date part
          const formattedBooking = {
            ...booking,
            bookingDateTime: new Date(booking.bookingDateTime).toLocaleDateString(),
            customerEmail: customer.email,
            customerName: customer.name,
            customer: customer // Add customer data to booking
          };

          return formattedBooking;
        }));

        // Filter out the bookings that match the email ID stored in the cookie
        const matchedBookings = bookingsWithCustomers.filter(booking => booking.customerEmail === userEmail);
        setBookings(matchedBookings);
      } catch (error) {
        console.error('Error fetching table bookings:', error);
      }
    };

    fetchBookings();
  }, [userEmail]); // Trigger useEffect when userEmail changes

  const handleEdit = (bookingId) => {
    setEditingBookingId(bookingId);
    const bookingToEdit = bookings.find(booking => booking.tableBookingId === bookingId);
    setEditedBookingData({ ...bookingToEdit });
  };

  const handleSave = async () => {
    try {
      // Check if editedBookingData contains valid customer data
      if (!editedBookingData || !editedBookingData.customer || !editedBookingData.customer.customerId) {
        console.error('Customer data is missing.');
        return;
      }

      // Prepare the updated booking data
      const updatedBookingData = {
        tableBookingId: editingBookingId,
        bookingDateTime: new Date(editedBookingData.bookingDateTime).toISOString(), // Convert to ISO string format
        numberOfGuests: editedBookingData.numberOfGuests,
        tableNumber: editedBookingData.tableNumber,
        isBooked: editedBookingData.isBooked,
        customerId: editedBookingData.customerId,
        tableBooking: null // Include the required tableBooking field
      };

      // Send a PUT request to update the booking
      await axios.put(`https://localhost:44384/api/TableBookings/${editingBookingId}`, updatedBookingData);

      // Update the bookings state with the updated data
      const updatedBookings = bookings.map(booking => {
        if (booking.tableBookingId === editingBookingId) {
          return {
            ...booking,
            ...updatedBookingData
          };
        } else {
          return booking;
        }
      });
      setBookings(updatedBookings);

      // Clear the editing state
      setEditingBookingId(null);
      setEditedBookingData({});
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      // Send a DELETE request to remove the booking
      await axios.delete(`https://localhost:44384/api/TableBookings/${bookingId}`);

      // Update the bookings state by filtering out the deleted booking
      const updatedBookings = bookings.filter(booking => booking.tableBookingId !== bookingId);
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleCancel = () => {
    // Clear the editing state
    setEditingBookingId(null);
    setEditedBookingData({});
  };

  return (
    <div>
      <SidePanel />
      <div className="table-bookings-container-admin">
        <h2>Table Bookings</h2>
        <div className="table-card-container-admin">
          {bookings.length === 0 ? (
            <p>No bookings found for the logged-in user.</p>
          ) : (
            bookings.map((booking, index) => (
              <div className="table-card-admin" key={index}>
                <h3>Table Number: {booking.tableNumber}</h3>
                <p><strong>Booking Date:</strong> {booking.bookingDateTime}</p>
                <p><strong>Number of Guests:</strong> {booking.numberOfGuests}</p>
                <p><strong>Customer Name:</strong> {booking.customerName}</p> {/* Display customer name */}
                <div className="button-container">
  {editingBookingId === booking.tableBookingId ? (
    <div>
      <input
        type="text"
        value={editedBookingData.numberOfGuests || ''}
        onChange={(e) => setEditedBookingData({ ...editedBookingData, numberOfGuests: e.target.value })}
      />
      <button className="edit-button" onClick={handleSave}>Save</button>
      <button className="edit-button" onClick={handleCancel}>Cancel</button>
    </div>
  ) : (
    <div>
      <button className="edit-button" onClick={() => handleEdit(booking.tableBookingId)}>Edit</button>
      <button className="delete-button" onClick={() => handleDelete(booking.tableBookingId)}>Delete</button>
    </div>
  )}
</div>

                {/* Add other properties here */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
