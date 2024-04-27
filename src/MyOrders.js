import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './OrderDetails.css'; // Import CSS file for styling
import SidePanel from './SidePannel';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = Cookies.get('email') || ''; // Fetch the email ID from cookies

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders with the provided email ID
        const ordersResponse = await axios.get(`https://localhost:44384/api/Orders`);
        const ordersData = ordersResponse.data.$values;

        // Filter orders that match the email ID stored in the cookie
        const matchedOrders = ordersData.filter(order => order.orderEmail === userEmail);

        // Format the date into both date and time parts
        const formattedOrders = matchedOrders.map(order => ({
          ...order,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          orderTime: new Date(order.orderDate).toLocaleTimeString()
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userEmail]); // Trigger useEffect when userEmail changes

  return (
    <div>
      <SidePanel />
      <div className="order-details-container">
        <h2>Order Details</h2>
        {orders.length === 0 ? (
          <p>No orders found for the logged-in user.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Time</th>
                <th>Item Name</th>
                <th>category</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.orderTime}</td>
                  <td>{order.itemName}</td>
                  <td>{order.orderCategory}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
