import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

import logo from '../assets/Logo.png';
import cartlogo from "../assets/Cart.png";
import NavIcon from "../assets/Nav-icon.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='Row-1'>
            <img src={logo} alt="Logo" className='logo' />
            <div className='cart-btn'>
                <img src={cartlogo} alt="cart-btn" className='cart-icon' />
                <p>Varukorg</p>
            </div>
        </div>
        
        <div className='Row-2'>
            <ul className='Navbar-links'>
                <img src={NavIcon} alt="" />
                <NavLink to="/" className="nav-link">TV-Spel</NavLink>
                <NavLink to="/" className="nav-link">Leksaker</NavLink>
                <NavLink to="/" className="nav-link">Dockor</NavLink>
                <NavLink to="/" className="nav-link">Pyssel</NavLink>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
