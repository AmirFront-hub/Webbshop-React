import React, { Fragment } from 'react';
import './Cart.css';
import useCartStore from '../store/useCartStore';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useCartStore(state => state.cart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const handleQuantity = (id, delta) => {
    updateQuantity(id, delta);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Fragment>
      <div className="cart-page">
        {/* Items List */}
        <div className="cart-items">
          <h1 className="cart-title">
            Din varukorg {itemCount > 0 && <span>({itemCount})</span>}
          </h1>
          <div className="cart-header-row">
            <span>Artikel</span>
            <span>Delsumma</span>
          </div>
          
          <div className="cart-items-container">
            {cart.length === 0 ? (
              <div className="cart-empty-message">Varukorgen är tom!</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item-row">
                  <div className="item-image">
                    {item.imageURL && <img src={item.imageURL} alt={item.name} />}
                  </div>
                  
                  <div className="item-main">
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price} :-</span>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => handleQuantity(item.id, -1)}>-</button>
                      <span className="item-qty">{item.quantity}</span>
                      <button onClick={() => handleQuantity(item.id, 1)}>+</button>
                      <button className="remove-button" onClick={() => removeFromCart(item.id)}>×</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Summering</h2>
          <hr className="summary-divider" />
          <div className="summary-items">
            {cart.length === 0 ? (
              <div className="cart-empty-message">Varukorgen är tom!</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="summary-item-row">
                  <span>[{item.quantity}] - {item.name}</span>
                  <span>{item.price} kr</span>
                </div>
              ))
            )}
          </div>
          <hr className="summary-divider" />
          <div className="summary-item-row">
            <span>Delsumma:</span>
            <span>{total} kr</span>
          </div>
          <div className="summary-item-row">
            <span>Leverans:</span>
            <span className="gratis">Gratis</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-item-row ordersumma">
            <span>Ordersumma Inkl. Moms:</span>
            <strong>{total} kr</strong>
          </div>
          <Link to="/placeorder">
            <button className="checkout-button">Gå till kassan</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
