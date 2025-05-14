import React, { Fragment } from 'react'
import './Footer.css'
import instagramIcon from "../assets/instagram 1.png";
import facebookIcon from "../assets/facebook 1.png";
import youtubeIcon from "../assets/youtube 1.png";

const Footer = () => {
  return (
    <Fragment>


    <footer>
      <div className='footer-container'>
        <div className='text-footer'>
            <h2>Om oss</h2>
            <p>Vi är en del av Skandinaviens största leksaksbutik på nätet och används redan av över 250 000 svenska kunder!
            Våra h är att leverera välkända varumärken till låga priser, så snabbt som möjligt, och att erbjuda marknadens bästa kundservice.</p>
        </div>   

        <div className='media-footer'>
            <h2>Följ oss</h2>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className='social-icon' />Facebook
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className='social-icon' />Instagram
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="Youtube" className='social-icon'/>Youtube
            </a>
        </div>
     </div>
    </footer>

    <div className="copyright">
      <div className="copyright-content">
        <p>Copyright © 2025 KidGaming. All rights reserved.</p>
      </div>
    </div>
    </Fragment>
  )
}

export default Footer
