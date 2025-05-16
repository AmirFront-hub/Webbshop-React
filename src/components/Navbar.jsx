import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import cartlogo from "../assets/Cart.png";
import NavIcon from "../assets/Nav-icon.png";
import './Navigation.css';
import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const itemCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Function to handle category selection and close mobile menu if open
  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`);
    if (isVisible) {
      setIsVisible(false); // Close mobile menu after selection
    }
  };

  return (
    <div className='navbar'>
        <div className='Row-1'>
            {/* Hamburger menu (nav-btn) */}
            <img
              onClick={() => setIsVisible(!isVisible)}
              src={NavIcon}
              alt="Menu"
              className="nav-btn"
            />

            {/* Logo */}
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>

            {/* Desktop menu with onClick handlers */}
            <div className="desktop-menu">
                <button 
                  onClick={() => handleCategoryClick('TV-Spel')} 
                  className="nav-link"
                >TV-Spel</button>
                
                <button 
                  onClick={() => handleCategoryClick('Leksaker')} 
                  className="nav-link"
                >Leksaker</button>
                
                <button 
                  onClick={() => handleCategoryClick('Dockor')} 
                  className="nav-link"
                >Dockor</button>
                
                <button 
                  onClick={() => handleCategoryClick('Pyssel')} 
                  className="nav-link"
                >Pyssel</button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="cart-btn">
                <img src={cartlogo} alt="cart-btn" className='cart-icon' />
                <p className='varukorg'>Varukorg</p>
                <span className='cart-counter'>{itemCount}</span>
            </Link>
        </div>
        
        {/* Mobile menu with onClick handlers */}
        <div className={`mobile-menu${isVisible ? ' active' : ''}`}>
            <button 
              onClick={() => handleCategoryClick('TV-Spel')} 
              className="nav-link"
            >TV-Spel</button>
            
            <button 
              onClick={() => handleCategoryClick('Leksaker')} 
              className="nav-link"
            >Leksaker</button>
            
            <button 
              onClick={() => handleCategoryClick('Dockor')} 
              className="nav-link"
            >Dockor</button>
            
            <button 
              onClick={() => handleCategoryClick('Pyssel')} 
              className="nav-link"
            >Pyssel</button>
        </div>
    </div>
  )
}

export default Navbar
