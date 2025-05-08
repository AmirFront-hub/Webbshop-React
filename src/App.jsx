import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import './App.css'

const App = () => {
  return (

    <div className='app'>

      <Navbar/>

      <Routes>
          <Route path ="/" element={<Home/>} />
          <Route path ="/collection" element={<Collection/>} />
          <Route path ="/cart" element={<Cart/>} />
          <Route path ="/product/:productId" element={<Product/>} />
          <Route path='/placeorder' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />
      </Routes>

    </div>

  )
}

export default App
