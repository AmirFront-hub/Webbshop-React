import React, { Fragment, useEffect } from 'react'
import bigPicture from "../assets/TitleHighlight.png";
import smallPicture1 from "../assets/LegoHighlight.png";
import smallPicture2 from "../assets/GameHighlight.png";
import gameIcon from "../assets/Game-Icon.png";
import dollIcon from "../assets/docka-icon.png";
import toyIcon from "../assets/leksak-icon.png"
import puzzleIcon from "../assets/pussel-icon.png";
import './Home.css'
import { Link } from 'react-router-dom';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import ProductCard from '../components/ProductCard';

function Home() {
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Get first 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <Fragment>

      <div className="page-column">
          <img src={bigPicture} alt="Title highlight" className="bigPicture" />
          <div className="smallPics">
              <img src={smallPicture1} alt="Lego highlight" />
              <img src={smallPicture2} alt="Game highlight" />
          </div>
      </div>
      <div className='text-content'>
          <h1>Skandinaviens störska leksasbutik</h1>
          <h2>Används av över 270 000 svenska kunder</h2>
          <p>Hitta din leksak</p>
      </div>

      <div>
        <div className='icon-container'>
          <div>
            <Link to="/tvspel">
              <img src={gameIcon} alt="Game Icon" className='icon' />
              <p>TV-Spel</p>
            </Link>
          </div>
          <div>
            <Link to="/dockor">
              <img src={dollIcon} alt="Doll Icon" className='icon' />
              <p>Dockor</p>
            </Link>
          </div>
          <div>
            <Link to="/leksaker">
              <img src={toyIcon} alt="Toy Icon" className='icon' />
              <p>Leksaker</p>
            </Link>
          </div>
          <div>
            <Link to="/pyssel">
              <img src={puzzleIcon} alt="Game Icon" className='icon' />
              <p>Pyssel</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='smalltext-content'>
        <h2>Brett utbud - låga priser</h2>
      </div>

      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '45px',
      }}>
        {displayProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>

        <Link to="/collection" className='all-products'>
        <p>Se alla produkter</p>
        </Link>

    </Fragment>
  )
}

export default Home
