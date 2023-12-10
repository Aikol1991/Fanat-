import React from 'react'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import publicRoutes from './links/routes.jsx'
import './assets/css/core.scss'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </div>
  )
}
