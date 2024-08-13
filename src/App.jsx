import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListExam from "./components/Organism/ListExam";
import PlanningExam from "./components/Organism/PlanningExam";
import SurveillantList from "./components/Surveillants/SurveillantList.jsx";
import AddSurveillant from "./components/Surveillants/AddSurveillant.jsx";
import UpdateSurveillant from "./components/Surveillants/UpdateSurveillant.jsx";
import Header from "./components/Layouts/Header";
import Sidebar from "./components/Layouts/SideBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-10">
            <Routes>
              <Route path="/PlanningExam" element={<ListExam />} />
              <Route path="/PlanningExam/Create" element={<PlanningExam />} />
              <Route path="/Surveillants" element={<SurveillantList />} />
              <Route path="/add-Surveillant" element={<AddSurveillant />} />
              <Route path="/Update/:id" element={<UpdateSurveillant />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
