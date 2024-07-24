import { useState } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/SideBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    
    <Header />
    <Sidebar />
    
    </Router>

    
    

    </>
  )
}

export default App
