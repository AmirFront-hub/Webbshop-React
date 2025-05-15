import React, { useEffect } from 'react';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import ProductCard from '../components/ProductCard';

const Collection = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default Collection;
