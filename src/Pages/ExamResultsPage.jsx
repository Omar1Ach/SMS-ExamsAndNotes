import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ExamResultsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("https://localhost:7263/api/Exam");
        setExams([...response.data]);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const openModal = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  const handleViewDetails = () => {
    navigate(`/ExamDetails/${selectedExam.id}/${selectedExam.filiereId}`);
    closeModal();
  };

  const handleViewStagiaires = () => {
    navigate(`/stagiaire-list/${selectedExam.id}/${selectedExam.filiereId}`);
    closeModal();
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {exams.map((exam) => (
        <div
          key={exam.id}
          onClick={() => openModal(exam)}
          className="bg-gray-100 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
          style={{ marginBottom: "1rem" }}
        >
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">{exam.id}</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-600">
              <strong className="font-medium">Filière :</strong>{" "}
              {exam.filiereId}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Rooms :</strong> {exam.roomId}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Année :</strong> {exam.yearId}
            </p>
          </div>
        </div>
      ))}
      {selectedExam && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleViewDetails}
          onViewStagiaires={handleViewStagiaires}
          examName={selectedExam.id}
        />
      )}
    </div>
  );
};

export default ExamResultsPage;
