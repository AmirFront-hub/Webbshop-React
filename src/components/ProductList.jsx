import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart} 
                />
            ))}
        </div>
    );
};

export default ProductList;