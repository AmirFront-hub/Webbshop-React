import React, { useState, Fragment } from 'react';
import './Cart.css';

const initialCart = [
  { id: 1, name: 'Leksak 1', price: 100, quantity: 1 },
  { id: 2, name: 'Leksak 2', price: 200, quantity: 2 }
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Fragment>
      <div className="cart-page">
        {/* Items List */}
        <div className="cart-items">
          <h1 className="cart-title">Din varukorg</h1>
          {cart.map(item => (
            <div key={item.id} className="cart-item-row">
              <div className="item-main">
                <span>{item.name}</span>
                <span className="item-price">{item.price} :-</span>
              </div>
              <div className="item-controls">
                <button onClick={() => handleQuantity(item.id, -1)}>-</button>
                <span className="item-qty">{item.quantity}</span>
                <button onClick={() => handleQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="cart-summary">
          <h2>Summering</h2>
          <hr className="summary-divider" />
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item-row">
                <span>[{item.quantity}] - {item.name}</span>
                <span>{item.price} kr</span>
              </div>
            ))}
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
          <button>Gå till kassan</button>
        </div>
      </div>
    </Fragment>
  )
}

export default Cart;
