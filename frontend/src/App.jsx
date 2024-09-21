import React from 'react'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'

const App = () => {

  
  return (
    <Router>
      <Toaster/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
<Route path="/home" element={<Home/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/login' element={<LoginPage/>}/>

    </Routes>
    </Router>
  )
}

export default App




