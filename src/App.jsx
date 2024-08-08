import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layouts/SideBar";
import Header from "./components/Layouts/Header";
import ListExam from "./components/Organism/ListExam";
import PlanningExam from "./components/Organism/PlanningExam";
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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
