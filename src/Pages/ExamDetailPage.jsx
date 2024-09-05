import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiManager from "../api";

export default function ExamDetailPage() {
  const { id, fid } = useParams();
  const [stagiaires, setStagiaires] = useState([]);
  const [newStagiaire, setNewStagiaire] = useState({});
  const [listStagiere, setListStagiere] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function transformStudentData(students, examId) {
    return {
      examId: examId,
      stagiaireNoteDetails: students.map((student) => ({
        stagiaireId: student.id,
        practicalNote: 0, // Replace with actual data if available
        theoreticalNote: 0, // Replace with actual data if available
      })),
    };
  }
  useEffect(() => {
    fetchExamWithFiilere();
  }, []);

  const fetchExamWithFiilere = async () => {
    setLoading(true);
    try {
      const response = await ApiManager.get(`/Trainee/${fid}`);
      console.log(response.data);
      setListStagiere(response.data);
      const newArr = transformStudentData(response.data, id);
      setNewStagiaire(newArr);
      console.log(newArr);
    } catch (error) {
      console.error("Error fetching Room:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e, stagiaireId, noteType) => {
    const { value } = e.target;
    setNewStagiaire((prevState) => ({
      ...prevState,
      stagiaireNoteDetails: prevState.stagiaireNoteDetails.map((detail) =>
        detail.stagiaireId === stagiaireId
          ? { ...detail, [noteType]: parseFloat(value) || 0 }
          : detail
      ),
    }));
  };
  console.log(newStagiaire);

  const submitDetails = async () => {
    try {
      const response = await ApiManager.post("/ExamResult", newStagiaire);
      console.log("Response from API:", response.data);
      toast.success("Soumis avec succès!", {
        onClose: () => navigate(`/ExamResultsPage`),
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error submitting details:", error);
      toast.error(
        "Une erreur s'est produite lors de la soumission des détails. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="text-center py-4">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Détails de l'examen
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-6 py-3 text-center font-bold bg-blue-200">
                    Stagiaire
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold bg-blue-200">
                    <div className="grid grid-cols-2 divide-x divide-blue-400">
                      <div className="text-center font-bold">
                        Note théorique
                      </div>
                      <div className="text-center font-bold">Note pratique</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listStagiere.map((stagiaire, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                      {stagiaire.firstName + stagiaire.lastName}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                          <input
                            type="text"
                            name="theoreticalNote"
                            value={newStagiaire.theoreticalNote}
                            onChange={(e) =>
                              handleChange(e, stagiaire.id, "theoreticalNote")
                            }
                            className="border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            placeholder="Note théorique"
                          />
                        </div>
                        <div className="text-center">
                          <input
                            type="text"
                            name="practicalNote"
                            value={newStagiaire.practicalNote}
                            onChange={(e) =>
                              handleChange(e, stagiaire.id, "practicalNote")
                            }
                            className="border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            placeholder="Note pratique"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button
              onClick={submitDetails}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-300"
            >
              Soumettre
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}


