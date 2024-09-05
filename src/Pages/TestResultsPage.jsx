/*import React, { useState, useEffect } from "react";
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

export default TestResultsPage; */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestResultsPage = () => {
  const [test, setTest] = useState([]);
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

  const handleViewDetails = (test) => {
    navigate(`/TestDetailPage/${test.id}/${test.filiere.id}`);
  };

  const handleViewStagiaires = (test) => {
    navigate(`/TestStagiaireList/${test.id}/${test.filiere.id}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {test.length === 0 ? (
        <p>Aucun test disponible</p>
      ) : (
        test.map((testItem) => (
          <div
            key={testItem.id}
            className="bg-blue-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300"
          >
            <div className="p-4 border-b border-blue-200">
              <h3 className="font-bold text-lg mb-2 text-blue-900">{testItem.id}</h3>
              <p className="text-sm text-blue-800">
                <strong className="font-medium">Filière:</strong> {testItem.filiereId}
              </p>
              <p className="text-sm text-blue-800">
                <strong className="font-medium">Description:</strong> {testItem.description}
              </p>
            </div>
            <div className="p-4 flex justify-between">
              <button
                onClick={() => handleViewDetails(testItem)}
                className="text-white bg-blue-600 px-3 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Voir Détails
              </button>
              <button
                onClick={() => handleViewStagiaires(testItem)}
                className="text-white bg-teal-600 px-3 py-2 rounded-md text-sm hover:bg-teal-700"
              >
                Voir Stagiaires
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TestResultsPage;

