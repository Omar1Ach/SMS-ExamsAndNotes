import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListExam from "./components/Organism/ListExam";
import PlanningExam from "./components/Organism/PlanningExam";
import SurveillantList from "./components/Surveillants/SurveillantList.jsx";
import AddSurveillant from "./components/Surveillants/AddSurveillant.jsx";
import UpdateSurveillant from "./components/Surveillants/UpdateSurveillant.jsx";
import Header from "./components/Layouts/Header";
import ExamResultsPage from "./Pages/ExamResultsPage";
import ExamDetailPage from "./Pages/ExamDetailPage";
import StagiaireListPage from "./Pages/StagiaireListPage"; 
import TestResultsPage from "./Pages/TestResultsPage"; 
import TestDetailPage from "./Pages/TestDetailPage";
import TestStagiaireList from "./Pages/TestStagiaireListe";
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
              
              <Route path="/ExamResultsPage" element={<ExamResultsPage />} />
              <Route path="/ExamDetails/:id" element={<ExamDetailPage />} />
              <Route path="/stagiaire-list/:id" element={<StagiaireListPage />} />
              <Route path="/TestResultsPage" element={<TestResultsPage />} /> 
              <Route path="/TestDetailPage/:id" element={<TestDetailPage />} />
              <Route path="/TestStagiaireList/:id" element={<TestStagiaireList />} />
              
              
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
