import React from 'react';
import './Header.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation    


const Header = () => {
    return (
        <header>
            <h1>Webbshop</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;