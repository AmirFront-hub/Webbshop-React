import React, { Fragment } from 'react'
import bigPicture from "../assets/TitleHighlight.png";
import smallPicture1 from "../assets/LegoHighlight.png";
import smallPicture2 from "../assets/GameHighlight.png";
import './Home.css'

function Home() {
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
    </Fragment>
  )
}

export default Home
