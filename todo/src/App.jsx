import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/login/login';
import Dashboard from './components/dashboard/Dashboard';
import { ThemeProvider } from './themeContext';
function App() {

  return (
    <ThemeProvider> 
    <Router>
      <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </ThemeProvider> 
  )
}

export default App
