import React from 'react'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Home from './pages/homepage/Home'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

const App = () => {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>

          <Route path='/' exact  element={<Home />}/>
          <Route path='/home' exact  element={<Home />}/>
          <Route path='/about' exact />
          <Route path='/help' exact />
          <Route path='/contact' exact />
          <Route path='*' exact element={<PageNotFound />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
