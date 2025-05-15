import React from 'react';

const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img src={product.imageURL} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-category">{product.category}</p>
    <p className="product-price">{product.price} kr</p>
    <p className="product-stock">I lager: {product.stock}</p>
    <button onClick={() => onAddToCart(product)}>
      Lägg i varukorg
    </button>
  </div>
);

export default ProductCard;