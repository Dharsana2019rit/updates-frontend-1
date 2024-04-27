import React from 'react';
import AdminPanel from './AdminPanel';

const Admindashboard = () => {
  return (
    <div className="homepage-container">
      {/* Side Panel */}
      <AdminPanel/>

      {/* Main Content */}
      <div className="main-content">
        {/* Content goes here */}
        <h1>Welcome to Cafe Management System</h1>
        <p>This is the homepage of the Cafe Management System.</p>
        <p>Select an option from the navigation to proceed.</p>

        {/* Additional Content */}
        <div>
          <h2>Features:</h2>
          <ul>
            <li>Order Management</li>
            <li>Feedback Collection</li>
            <li>Table Booking</li>
            <li>Customer Management</li>
            <li>Employee Management</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default Admindashboard;
