import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Assuming you have some CSS for styling

const Navbar = () => {
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
       

    };
   
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Zeotap</h1>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/dashboard">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li> 
                    <Link to="/alerts">Alerts</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;