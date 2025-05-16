import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cart, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  
  // Debug logging
  console.log("Rendering PlaceOrder:", { cart, cartItems, total, orderTotal, orderPlaced });
  
  // Calculate total manually as a fallback
  const calculateTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);
  };
  
  // Check if cart is empty, redirect to cart page if it is
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      console.log("Cart empty, redirecting to /cart");
      navigate('/cart');
    } else if (!orderPlaced && cart.length > 0) {
      console.log("Saving cart items:", cart);
      // Store cart items and total before clearing
      setCartItems([...cart]);
      setOrderTotal(total || calculateTotal(cart)); // Use fallback calculation if total is falsy
      
      // Generate a random order number
      const randomOrderId = Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      
      // Set current date and time
      setOrderDate(new Date());
      
      // Mark order as placed
      setOrderPlaced(true);
      
      // Clear the cart
      console.log("Clearing cart");
      clearCart();
    }
  }, [cart, navigate, orderPlaced, total, clearCart]);
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return amount?.toLocaleString('sv-SE') + ' kr' || '0 kr';
  };
  
  // Function to print the receipt
  const handlePrint = () => {
    window.print();
  };
  
  // If not ready yet, show loading
  if (!orderPlaced) {
    return (
      <div className="place-order-container">
        <div className="loading-container">Bearbetar din beställning...</div>
      </div>
    );
  }
  
  // If we have no cart items but order is placed, something went wrong
  if (cartItems.length === 0 && orderPlaced) {
    return (
      <div className="place-order-container">
        <div className="error-container">
          <h2>Något gick fel</h2>
          <p>Vi kunde inte behandla din order. Vänligen försök igen.</p>
          <Link to="/cart" className="return-to-cart">Tillbaka till varukorgen</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="place-order-container">
      <div className="thank-you-section">
        <h1>Tack för din beställning!</h1>
        <p>Din beställning har mottagits och bearbetas nu. Ett bekräftelsemail har skickats till din epostadress.</p>
      </div>
      
      <div className="receipt-container">
        <div className="receipt-header">
          <h2>Kvitto</h2>
          <div className="receipt-meta">
            <p><strong>Ordernummer:</strong> #{orderId}</p>
            <p><strong>Datum:</strong> {orderDate ? format(orderDate, 'd MMMM yyyy', { locale: sv }) : '-'}</p>
            <p><strong>Tid:</strong> {orderDate ? format(orderDate, 'HH:mm', { locale: sv }) : '-'}</p>
          </div>
        </div>
        
        <div className="receipt-items">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Antal</th>
                <th>Pris</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name || 'Produkt'}</td>
                  <td>{item.quantity || 1}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.price * (item.quantity || 1))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Delsumma:</td>
                <td>{formatCurrency(orderTotal)}</td>
              </tr>
              <tr>
                <td colSpan="3">Leverans:</td>
                <td>Gratis</td>
              </tr>
              <tr className="total-row">
                <td colSpan="3">Totalt inkl. moms:</td>
                <td>{formatCurrency(orderTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="receipt-footer">
          <p>Betalningssätt: Kortbetalning</p>
          <p>KidsGaming | Leksaksgatan 123 | 46161 Trollhättan</p>
          <p>support@kidsgaming.se | 08-123 45 67</p>
          <p className="receipt-thanks">Tack för att du handlar hos oss!</p>
        </div>
      </div>
      
      <div className="receipt-actions">
        <button onClick={handlePrint} className="print-button">
          Skriv ut kvitto
        </button>
      </div>
      
      <div className="next-actions">
        <Link to="/" className="continue-shopping">
          Tillbaka till butiken
        </Link>
        <Link to="/collection" className="browse-more">
          Bläddra bland fler produkter
        </Link>
      </div>
    </div>
  );
};

export default PlaceOrder;
