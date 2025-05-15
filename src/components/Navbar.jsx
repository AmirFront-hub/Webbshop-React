import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/Logo.png';
import cartlogo from "../assets/Cart.png";
import NavIcon from "../assets/Nav-icon.png";
import "./Navbar.css";
import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const itemCount = useCartStore((state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0)
);

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

            {/* Desktop menu */}
            <div className="desktop-menu">
                <NavLink to="/" className="nav-link">TV-Spel</NavLink>
                <NavLink to="/" className="nav-link">Leksaker</NavLink>
                <NavLink to="/" className="nav-link">Dockor</NavLink>
                <NavLink to="/" className="nav-link">Pyssel</NavLink>
            </div>

            {/* Cart */}
            <Link to="/cart" className="cart-btn">
                <img src={cartlogo} alt="cart-btn" className='cart-icon' />
                <p className='varukorg'>Varukorg</p>
                <span className='cart-counter'>{itemCount}</span>
            </Link>
        </div>
        
        {/* Mobile menu */}
        <div className={`mobile-menu${isVisible ? ' active' : ''}`}>
            <NavLink to="/" className="nav-link">TV-Spel</NavLink>
            <NavLink to="/" className="nav-link">Leksaker</NavLink>
            <NavLink to="/" className="nav-link">Dockor</NavLink>
            <NavLink to="/" className="nav-link">Pyssel</NavLink>
        </div>
    </div>
  )
}

export default Navbar
