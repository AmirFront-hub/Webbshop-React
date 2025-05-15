import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/Logo.png';
import cartlogo from "../assets/Cart.png";
import NavIcon from "../assets/Nav-icon.png";
import './Navigation.css';
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

            {/* Desktop menu - updated to link to collection with categories */}
            <div className="desktop-menu">
                <NavLink to="/collection?category=TV-Spel" className="nav-link">TV-Spel</NavLink>
                <NavLink to="/collection?category=Leksaker" className="nav-link">Leksaker</NavLink>
                <NavLink to="/collection?category=Dockor" className="nav-link">Dockor</NavLink>
                <NavLink to="/collection?category=Pyssel" className="nav-link">Pyssel</NavLink>
            </div>

            {/* Cart */}
            <Link to="/cart" className="cart-btn">
                <img src={cartlogo} alt="cart-btn" className='cart-icon' />
                <p className='varukorg'>Varukorg</p>
                <span className='cart-counter'>{itemCount}</span>
            </Link>
        </div>
        
        {/* Mobile menu - also updated to link to collection with categories */}
        <div className={`mobile-menu${isVisible ? ' active' : ''}`}>
            <NavLink to="/collection?category=TV-Spel" className="nav-link">TV-Spel</NavLink>
            <NavLink to="/collection?category=Leksaker" className="nav-link">Leksaker</NavLink>
            <NavLink to="/collection?category=Dockor" className="nav-link">Dockor</NavLink>
            <NavLink to="/collection?category=Pyssel" className="nav-link">Pyssel</NavLink>
        </div>
    </div>
  )
}

export default Navbar
