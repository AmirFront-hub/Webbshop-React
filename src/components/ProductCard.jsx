import React from 'react';
import './Products.css';

const ProductCard = ({ product, onAddToCart }) => {
  // Helper function to safely get field value regardless of case
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    
    // Try direct access with the provided field name
    if (obj[fieldName] !== undefined) return obj[fieldName];
    
    // Try with first letter capitalized
    const capitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    if (obj[capitalized] !== undefined) return obj[capitalized];
    
    // Try with first letter lowercase
    const lowercased = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
    if (obj[lowercased] !== undefined) return obj[lowercased];
    
    // If nothing found, return empty string
    return '';
  };

  // Get product fields safely using the helper
  const name = getField(product, 'name');
  const price = getField(product, 'price');
  const imageURL = getField(product, 'imageURL');
  const stock = getField(product, 'stock');
  
  return (
    <div className="product-card">
      <div className="product-image">
        {imageURL && <img src={imageURL} alt={name} />}
      </div>
      <div className="product-info">
        <div className="product-info-content">
          <h3>{name}</h3>
          <p className="product-price">{price} kr</p>
          <p className="product-stock">
            {stock > 0 ? `${stock} i lager` : 'Slut i lager'}
          </p>
        </div>
        <div className="product-button-container">
          <button 
            onClick={() => onAddToCart(product)} 
            disabled={stock <= 0}
            className={stock <= 0 ? 'out-of-stock' : ''}
          >
            {stock > 0 ? 'Lägg i varukorgen' : 'Slut i lager'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;