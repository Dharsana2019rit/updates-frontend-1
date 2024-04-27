import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css';
import Navbar from './Navbar';


const Logincomp = () => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('User'); // Default role is "User"
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://localhost:44384/api/auth/login/${Role}`, { emailId, password, Role });
      const { token } = response.data;
      Cookies.set("email",emailId)
      // Store token in cookie
      Cookies.set('token', token);
      console.log('Login successful. Token:', token);
      // Redirect to the appropriate dashboard based on the role
      if (Role === 'Admin') {
        navigate('/admindashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError("Failed to log in. Please check your credentials.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleSignup = () => {
    navigate('/');
  };

  return (
    <div className="background-image-container">
      <Navbar/>
      <div className="login-container">
        <h2>Login</h2>
        <input type="text" placeholder="Email" value={emailId} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select className='login-select' value={Role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleLogin}>Login</button>
        <div>New user? Sign up here!</div>
        <button onClick={handleSignup}>Sign Up</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Logincomp;
