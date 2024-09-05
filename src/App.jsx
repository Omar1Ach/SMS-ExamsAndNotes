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
import Planification from "./Pages/PlanificationPage";
import AddRoom from "./Pages/Rooms/AddRoom";
import RoomList from "./Pages/Rooms/RoomList";
import UpdateRoom from "./Pages/Rooms/UpdateRoom";
import PlanificationTestPage from "./Pages/Tests/PlanificationTest";
import ListTest from "./Pages/Tests/ListTests";
import EditTest from "./Pages/Tests/UpdateTest";
import VaraintExamPage from "./Pages/VariantExams/VaraintExamPage.jsx";
import AddNewVariant from "./Pages/VariantExams/AddNewVariant.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


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
              <Route
                path="/ExamDetails/:id/:fid"
                element={<ExamDetailPage />}
              />
              <Route
                path="/stagiaire-list/:id/:fid"
                element={<StagiaireListPage />}
              />
              <Route path="/TestResultsPage"element={<TestResultsPage />} />
              <Route path="/TestDetailPage/:id/:fid" 
              element={<TestDetailPage />} />
              <Route
                path="/TestStagiaireList/:id/:fid"
                element={<TestStagiaireList />}
              />
              <Route path="/PlanningExam" element={<ListExam />} />
              <Route path="/PlanningExam/Create" element={<PlanningExam />} />
              <Route path="/Surveillants" element={<SurveillantList />} />
              <Route path="/add-Surveillant" element={<AddSurveillant />} />
              <Route path="/Update/:id" element={<UpdateSurveillant />} />
              <Route path="/Planification" element={<Planification />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/room-list" element={<RoomList />} />
              <Route path="/update-room/:id" element={<UpdateRoom />} />
              <Route
                path="/PlanningTest/create"
                element={<PlanificationTestPage />}
              />
              <Route path="/VaraintExam/create" element={<AddNewVariant />} />
              <Route path="/VaraintExam" element={<VaraintExamPage />} />
              <Route path="/ListTest" element={<ListTest />} />
              <Route path="/update-test/:id" element={<EditTest />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
