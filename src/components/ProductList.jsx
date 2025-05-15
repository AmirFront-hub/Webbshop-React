import React, { useEffect } from 'react';
import useProductStore from '../stores/useProductStore';
import useCartStore from '../stores/useCartStore';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductList = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div className="loading-message">Laddar produkter...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
