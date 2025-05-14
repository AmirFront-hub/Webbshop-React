import React from 'react'
import bigPicture from "../assets/TitleHighlight.png";
import smallPicture1 from "../assets/LegoHighlight.png";
import smallPicture2 from "../assets/GameHighlight.png";
import './Home.css'

function Home() {
  return (
    <div className="page-column">
        <img src={bigPicture} alt="Title highlight" />
        <div className="smallPics">
            <img src={smallPicture1} alt="Lego highlight" />
            <img src={smallPicture2} alt="Game highlight" />
        </div>
    </div>
  )
}

export default Home
