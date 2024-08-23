import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalTest from "../components/ModalTest";  
import { useNavigate } from "react-router-dom";

const TestResultsPage = () => {
  const [test, setTest] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get("https://localhost:7263/api/Test");
        setTest([...response.data]);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };

    fetchTest();
  }, []);

  const openModal = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  const handleViewDetails = () => {
    navigate(`/TestDetailPage/${selectedTest.id}/${selectedTest.filiere.id}`);
    closeModal();
  };

  const handleViewStagiaires = () => {
    navigate(`/TestStagiaireList/${selectedTest.id}/${selectedTest.filiere.id}`);
    closeModal();
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {test.length === 0 ? (
        <p>Aucun test disponible</p>
      ) : (
        test.map((testItem) => (
          <div
            key={testItem.id}
            onClick={() => openModal(testItem)}
            className="bg-gray-100 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
            style={{ marginBottom: "1rem" }}
          >
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800">{testItem.id}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                <strong className="font-medium">Filière :</strong>{" "}
                {testItem.filiereId}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Description :</strong> {testItem.description}
              </p>
            </div>
          </div>
        ))
      )}
      {selectedTest && (
        <ModalTest
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleViewDetails}
          onViewTestStagiaires={handleViewStagiaires}
          testName={selectedTest.id} // Utilisez "testName" ici
        />
      )}
    </div>
  );
};

export default TestResultsPage;
