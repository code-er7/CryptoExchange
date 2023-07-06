import React from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';
const App = () => {
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coins' element={<Coins/>} />
        <Route path='/exchanges' element={<Exchanges/>} />
        <Route path='/coin/:id' element={<CoinDetails/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;