/*import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ExamResultsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const listAnne = [
    { id: "123e4567-e89b-12d3-a456-426614174000", name: "2023-2024" },
    { id: "9f62b8f3-4e3c-4984-8d97-9b9f1b9c5400", name: "2022-2023" },
    { id: "a5b9b1c7-91b5-4d7e-9e18-2235f3f0c500", name: "2021-2022" },
    { id: "497f6eca-6276-4993-bfeb-53cbbbba6100", name: "2020-2021" },
    { id: "f76a24c9-4f3b-45d3-8c66-713dbf720f6b", name: "2019-2020" },
    { id: "c24b5dcb-8a2d-4d9f-9982-f66c3a7b0512", name: "2018-2019" },
    { id: "5e2c7d47-8887-4c3e-8399-f84bb8c61e0a", name: "2017-2018" },
    { id: "8fdaef48-7e21-4b59-9f74-0915c6a8d04e", name: "2016-2017" },
    { id: "b13c4de2-45d1-488a-8a6f-f52d2e3cba2f", name: "2015-2016" },
    { id: "c795e3b6-34e4-4af5-96df-04eb1c5f96ef", name: "2014-2015" },
    { id: "d4e1b5a1-70bc-44fa-9959-8cb8dbd70c34", name: "2013-2014" },
    { id: "e2c3a593-6f2c-41c8-8348-1f3e499a1d65", name: "2012-2013" },
    { id: "f6e9354b-32d2-44c6-8e88-60e6d9c6f034", name: "2011-2012" },
    { id: "0a735614-df8b-4b91-9620-4b30b8a14b1a", name: "2010-2011" },
    { id: "1a9b2e50-28a2-40e2-9d44-2b1374f62b7f", name: "2009-2010" },
    { id: "2d074eb3-5a29-4e2a-a5f2-1d9371e08929", name: "2008-2009" },
    { id: "37983de5-d176-46e8-a33f-bd1cfd55b98d", name: "2007-2008" },
    { id: "41f3c688-01cb-43be-a1a4-c27d1cdb3ae9", name: "2006-2007" },
    { id: "55f7eecb-67b8-4f2b-8c0e-8e9e5a0418cf", name: "2005-2006" },
    { id: "6b2838f6-7715-4d62-8fa9-ecc60b1e65ae", name: "2004-2005" },
  ];
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("https://localhost:7263/api/Exam");
        setExams([...response.data]);
        console.log(response.data);
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
    navigate(`/ExamDetails/${selectedExam.id}/${selectedExam.filiere.id}`);
    closeModal();
  };

  const handleViewStagiaires = () => {
    navigate(`/stagiaire-list/${selectedExam.id}/${selectedExam.filiere.id}`);
    closeModal();
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {exams.map((exam) => (
        <div
          key={exam.id}
          onClick={() => openModal(exam)}
          className="bg-gray-100 rounded-lg shadow-xl border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
          style={{ marginBottom: "1rem" }}
        >
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">
              {exam.examDate}
            </h3>
          </div>
          <div className="p-4">
            <p className="text-gray-600">
              <strong className="font-medium">Filière :</strong>{" "}
              {exam.filiere.nomFiliere}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Rooms :</strong>{" "}
              {exam.examSession.room.roomName}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Année :</strong>{" "}
              {listAnne.map((anne) => {
                if (anne.id === exam.yearId) {
                  return anne.name;
                }
              })}
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

export default ExamResultsPage;*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExamResultsPage = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const listAnne = [
    { id: "123e4567-e89b-12d3-a456-426614174000", name: "2023-2024" },
    { id: "9f62b8f3-4e3c-4984-8d97-9b9f1b9c5400", name: "2022-2023" },
    { id: "a5b9b1c7-91b5-4d7e-9e18-2235f3f0c500", name: "2021-2022" },
    { id: "497f6eca-6276-4993-bfeb-53cbbbba6100", name: "2020-2021" },
    { id: "f76a24c9-4f3b-45d3-8c66-713dbf720f6b", name: "2019-2020" },
    { id: "c24b5dcb-8a2d-4d9f-9982-f66c3a7b0512", name: "2018-2019" },
    { id: "5e2c7d47-8887-4c3e-8399-f84bb8c61e0a", name: "2017-2018" },
    { id: "8fdaef48-7e21-4b59-9f74-0915c6a8d04e", name: "2016-2017" },
    { id: "b13c4de2-45d1-488a-8a6f-f52d2e3cba2f", name: "2015-2016" },
    { id: "c795e3b6-34e4-4af5-96df-04eb1c5f96ef", name: "2014-2015" },
    { id: "d4e1b5a1-70bc-44fa-9959-8cb8dbd70c34", name: "2013-2014" },
    { id: "e2c3a593-6f2c-41c8-8348-1f3e499a1d65", name: "2012-2013" },
    { id: "f6e9354b-32d2-44c6-8e88-60e6d9c6f034", name: "2011-2012" },
    { id: "0a735614-df8b-4b91-9620-4b30b8a14b1a", name: "2010-2011" },
    { id: "1a9b2e50-28a2-40e2-9d44-2b1374f62b7f", name: "2009-2010" },
    { id: "2d074eb3-5a29-4e2a-a5f2-1d9371e08929", name: "2008-2009" },
    { id: "37983de5-d176-46e8-a33f-bd1cfd55b98d", name: "2007-2008" },
    { id: "41f3c688-01cb-43be-a1a4-c27d1cdb3ae9", name: "2006-2007" },
    { id: "55f7eecb-67b8-4f2b-8c0e-8e9e5a0418cf", name: "2005-2006" },
    { id: "6b2838f6-7715-4d62-8fa9-ecc60b1e65ae", name: "2004-2005" },
  ];

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

  const handleViewDetails = (exam) => {
    navigate(`/ExamDetails/${exam.id}/${exam.filiere.id}`);
  };

  const handleViewStagiaires = (exam) => {
    navigate(`/stagiaire-list/${exam.id}/${exam.filiere.id}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="bg-blue-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300"
        >
          <div className="p-4 border-b border-blue-200">
            <h2 className="font-bold text-lg mb-2 text-blue-900">{exam.examDate}</h2>
            <p className="text-sm text-blue-800">
              <strong className="font-medium">Filière:</strong> {exam.filiere.nomFiliere}
            </p>
            <p className="text-sm text-blue-800">
              <strong className="font-medium">Rooms:</strong> {exam.examSession.room.roomName}
            </p>
            <p className="text-sm text-blue-800">
              <strong className="font-medium">Année:</strong>{" "}
              {listAnne.find((anne) => anne.id === exam.yearId)?.name || "Unknown"}
            </p>
          </div>
          <div className="p-4 flex justify-between">
            <button
              onClick={() => handleViewDetails(exam)}
              className="text-white bg-blue-600 px-3 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Voir Détails
            </button>
            <button
              onClick={() => handleViewStagiaires(exam)}
              className="text-white bg-teal-600 px-3 py-2 rounded-md text-sm hover:bg-teal-700"
            >
              Voir Stagiaires
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamResultsPage;


