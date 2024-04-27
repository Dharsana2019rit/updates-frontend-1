import React from 'react';
import { Link } from 'react-router-dom';
import './SidePanel.css'; // Import CSS for styling
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminPanel=() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
      };
  return (
    <div className="side-panel">
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/admin/tablebookings">
              <button className="side-button">Tablebookings</button>
            </Link>
          </li>
          <li>
            <Link to="/admin/menuitems">
              <button className="side-button">Menuitems</button>
            </Link>
          </li>
          <li>
            <Link to="/admin/orderdetails">
              <button className="side-button">Orders</button>
            </Link>
          </li>
          <li>
            <Link to="/admin/feedbackdetails">
              <button className="side-button">Feedbacks</button>
            </Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
  );
};

export default AdminPanel;
