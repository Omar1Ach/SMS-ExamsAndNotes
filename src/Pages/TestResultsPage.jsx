import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalTest from "../components/ModalTest";  
import { useNavigate } from "react-router-dom";

const TestResultsPage = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("https://localhost:7263/api/Test");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
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
    navigate(`/TestDetailPage/${selectedTest.id}`);
    closeModal();
  };
  const handleViewTestStagiaires = () => {
    navigate(`/TestStagiaireList/${selectedTest.id}`);
    closeModal();
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tests.map((test) => (
        <div
          key={test.id}
          onClick={() => openModal(test)}
          className="bg-gray-100 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
          style={{ marginBottom: '1rem' }}
        >
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">
              {test.name} 
            </h3>
          </div>
          <div className="p-4">
            <p className="text-gray-600">
              <strong className="font-medium">Description :</strong> {test.description} {/* Affichage de la description du test */}
            </p>
          </div>
        </div>
      ))}
      {selectedTest && (
        <ModalTest
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleViewDetails}
          onViewTestStagiaires={handleViewTestStagiaires}
          examName={selectedTest.name}  
        />
      )}
    </div>
  );
};

export default TestResultsPage;
