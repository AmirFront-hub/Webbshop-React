import React from 'react';
import './Header.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation    


const Header = () => {
    return (
        <header>
            <h1>Webbshop</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/admin">Admin</Link>
            </nav>
        </header>
    );
};

export default Header;