import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './routes/login/login'
import Menu from './routes/menu/menu'
import Navbar from './components/navbar/navbar'


function App() {
    const location = useLocation();

    const hidenavbar = location.pathname === '/login'

    return (
      
      <>
        {!hidenavbar && <Navbar/>}
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Menu/>}/>
        </Routes>
      </>
    )
}

export default App
