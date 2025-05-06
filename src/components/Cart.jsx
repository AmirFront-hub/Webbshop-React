import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name} - ${item.price}</span>
                            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;