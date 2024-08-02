<<<<<<< HEAD
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveillantList from "./components/Surveillants/SurveillantList.jsx";
import AddSurveillant from "./components/Surveillants/AddSurveillant.jsx";
import UpdateSurveillant from "./components/Surveillants/UpdateSurveillant.jsx";
import Header from './components/Header'
import Sidebar from './components/SideBar'


=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planification from "./Pages/PlanificationPage";
import Sidebar from "./components/Layouts/SideBar";
import Header from "./components/Layouts/Header";
>>>>>>> origin/main
function App() {
  return (
<<<<<<< HEAD

=======
>>>>>>> origin/main
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
<<<<<<< HEAD
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
=======
          <div className="p-10">
            <Routes>
              <Route path="/Planification" element={<Planification />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
>>>>>>> origin/main
}

export default App;
