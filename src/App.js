import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Logincomp from './Logincomp';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import Cookies from 'js-cookie';
import OrderPage from './OrderPage';
import FeedbackForm from './FeedbackForm';
import Admindashboard from './Admindashboard';
import TableBooking from './Tablebooking';
import MenuItemForm from './MenuItemForm';
import OrderDetails from './OrderDetails';
import FeedbackDetails from './FeedbackDetails';
import MyBookings from './MyBookings';
import MyOrders from './MyOrders';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);


  // Redirect to login if not logged in
  if (!loggedIn && window.location.pathname !== '/login') {
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Logincomp onLogin={() => setLoggedIn(true)} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/feedback' element={<FeedbackForm/>}/>
        <Route path='/mybookings' element={<MyBookings/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/admindashboard' element={<Admindashboard/>}/>
        <Route path='/admin/tablebookings' element={<TableBooking/>}/>
        <Route path='/admin/menuitems' element={<MenuItemForm/>}/>
        <Route path='/admin/orderdetails' element={<OrderDetails/>}/>
        <Route path='/admin/feedbackdetails' element={<FeedbackDetails/>}/>
      </Routes>
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
