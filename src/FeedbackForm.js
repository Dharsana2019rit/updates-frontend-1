// FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';
import SidePanel from './SidePannel';
import Cookies from 'js-cookie';

const FeedbackForm = () => {
  const email = Cookies.get('email') || ''; 
  const [feedback, setFeedback] = useState({
    customerName: '',
    email: email,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString();
      const feedbackData = { ...feedback, date: currentDate };
      await axios.post('https://localhost:44384/api/Feedback', feedbackData);
      alert('Feedback submitted successfully!');
      setFeedback({ customerName: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div>
        <SidePanel/>
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="customerName" value={feedback.customerName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleChange} disabled/>
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea name="message" value={feedback.message} onChange={handleChange} />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default FeedbackForm;
