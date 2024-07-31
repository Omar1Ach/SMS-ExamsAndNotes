import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planification from "./Pages/PlanificationPage";
import Sidebar from "./components/Layouts/SideBar";
import Header from "./components/Layouts/Header";
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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
