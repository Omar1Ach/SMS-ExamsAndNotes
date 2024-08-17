import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planification from "./Pages/PlanificationPage";
import Sidebar from "./components/Layouts/SideBar";
import Header from "./components/Layouts/Header";
import ExamResultsPage from "./Pages/ExamResultsPage";
import ExamDetailPage from "./Pages/ExamDetailPage";
import StagiaireListPage from "./Pages/StagiaireListPage"; 
import TestResultsPage from "./Pages/TestResultsPage"; 
import TestDetailPage from "./Pages/TestDetailPage";
import TestStagiaireList from "./Pages/TestStagiaireListe";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-10">
            <Routes>
              <Route path="/Planification" element={<Planification />} />
              <Route path="/ExamResultsPage" element={<ExamResultsPage />} />
              <Route path="/ExamDetails/:id" element={<ExamDetailPage />} />
              <Route path="/stagiaire-list/:id" element={<StagiaireListPage />} />
              <Route path="/TestResultsPage" element={<TestResultsPage />} /> 
              <Route path="/TestDetailPage/:id" element={<TestDetailPage />} />
              <Route path="/TestStagiaireList/:id" element={<TestStagiaireList />} />
              
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
