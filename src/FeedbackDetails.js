import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackDetails.css'; // Import CSS file for styling
import AdminPanel from './AdminPanel';

const FeedbackDetails = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('https://localhost:44384/api/Feedback');
        const formattedFeedback = response.data.$values.map(item => ({
          ...item,
          // Format date to display only the date part
          date: new Date(item.date).toLocaleDateString()
        }));
        setFeedback(formattedFeedback || []); // Ensure feedback is initialized as an array
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to fetch feedback. Please try again later.');
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
        <AdminPanel/>
    <div className="feedback-details-container">
      <h2>Feedback Details</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="feedback-list">
        {feedback.map((item, index) => (
          <div key={index} className="feedback-item">
            <h3>{item.subject}</h3>
            <p><strong>From:</strong> {item.customerName}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Message:</strong> {item.message}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FeedbackDetails;
