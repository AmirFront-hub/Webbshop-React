import React, { useEffect } from 'react';
import useProductStore from '../stores/useProductStore';
import useCartStore from '../stores/useCartStore';
import './ProductList.css';

const ProductList = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="product-grid">
      {products.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.imageURL} alt={item.name} className="product-image" />
          <h3 className="product-name">{item.name}</h3>
          <p className="product-category">{item.category}</p>
          <p className="product-price">{item.price} kr</p>
          <p className="product-stock">I lager: {item.stock}</p>
          <button onClick={() => useCartStore.getState().addToCart(item)}>
            Lägg i varukorg
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
