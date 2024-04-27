import React from 'react';
import { Link } from 'react-router-dom';
import SidePanel from './SidePannel'; // Import the SidePanel component
import './HomePage.css' // Import CSS for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Side Panel */}
      <SidePanel />

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

export default HomePage;
