import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  
  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      
    </div>
  );
};

export default App;
