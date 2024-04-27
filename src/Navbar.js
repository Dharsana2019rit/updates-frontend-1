import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import brandicon from './brand.ico'; // Import your favicon file

function CustomNavbar() {
    const [activeKey, setActiveKey] = useState("/login");
    const location = useLocation(); // Get current location

    useEffect(() => {
        setActiveKey(location.pathname); // Update activeKey when location changes
    }, [location]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
                <img
                    src={brandicon}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Favicon"
                />{' '}
                Café Management {/* Include the favicon as the brand icon */}
            </Navbar.Brand>
            <Nav className="mr-auto">
                {/* Add any additional tabs for the left side */}
            </Nav>
            <Nav activeKey={activeKey}>
                <Link to="/login" className={`nav-link ${activeKey === '/login' ? 'active' : ''}`}>Login</Link>
                <Link to="/" className={`nav-link ${activeKey === '/' ? 'active' : ''}`}>Sign Up</Link>
            </Nav>
        </Navbar>
    );
}

export default CustomNavbar;
