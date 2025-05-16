import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import './Product.css';

const Product = () => {
  const { productId } = useParams();
  const { products, fetchProducts, loading } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);
  const [product, setProduct] = useState(null);

  // Helper function to safely get field values regardless of case
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
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [products, productId]);
  
  if (loading) return <div className="loading">Laddar produkt...</div>;
  
  if (!product) return <div className="not-found">Produkten kunde inte hittas</div>;
  
  // Get product fields using the helper function
  const name = getField(product, 'name');
  const price = getField(product, 'price');
  const description = getField(product, 'description') || 'Ingen beskrivning tillgänglig.';
  const imageURL = getField(product, 'imageURL');
  const stock = getField(product, 'stock') || 0;
  const category = getField(product, 'category');
  
  return (
    <div className="product-page">
      <div className="product-breadcrumbs">
        <Link to="/">Hem</Link> &gt; 
        <Link to="/collection">Produkter</Link> &gt; 
        <span>{name}</span>
      </div>
      
      <div className="product-container">
        <div className="product-image-container">
          {imageURL && <img src={imageURL} alt={name} className="product-detail-image" />}
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{name}</h1>
          
          {category && <p className="product-category">{category}</p>}
          
          <p className="product-price">{price} kr</p>
          
          <p className="product-stock">
            {stock > 0 ? `${stock} i lager` : 'Slut i lager'}
          </p>
          
          <button 
            className="add-to-cart-btn"
            disabled={stock <= 0}
            onClick={() => addToCart(product)}
          >
            {stock > 0 ? 'Lägg i varukorgen' : 'Slut i lager'}
          </button>
          
          <div className="product-description">
            <h2>Produktbeskrivning</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
