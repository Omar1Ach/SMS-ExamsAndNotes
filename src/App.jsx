import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveillantList from "./components/Surveillants/SurveillantList.jsx";
import AddSurveillant from "./components/Surveillants/AddSurveillant.jsx";
import UpdateSurveillant from "./components/Surveillants/UpdateSurveillant.jsx";
import Header from './components/Header'
import Sidebar from './components/SideBar'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className='p-10'>
            <Routes>
              <Route path="/Home" element={<SurveillantList />} />
              <Route path="/add-Surveillant" element={<AddSurveillant />} />
              <Route path="/Update/:id" element={<UpdateSurveillant />} />
            </Routes>
          </div>
        </div>

      </div>
    </Router>





  )
}

export default App
