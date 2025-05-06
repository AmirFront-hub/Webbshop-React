import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;