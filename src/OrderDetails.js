import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetails.css'; // Import CSS file for styling
import AdminPanel from './AdminPanel';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://localhost:44384/api/Orders');
        console.log(response.data);
        
        // Format orderDate to display both date and time
        const formattedOrders = response.data.$values.map(order => ({
          ...order,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          orderTime: new Date(order.orderDate).toLocaleTimeString()
        }));
        
        setOrders(formattedOrders); // Set formatted orders
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <AdminPanel/>
      <div className="order-details-container">
        <h2>Order Details</h2>
        {error && <div className="error-message">{error}</div>}
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
      </div>
    </div>
  );
};

export default OrderDetails;
