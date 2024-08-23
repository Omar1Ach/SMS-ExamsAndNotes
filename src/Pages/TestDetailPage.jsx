import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiManager from "../api";

export default function TestDetailPage() {
  const { id, fid } = useParams();
  const [stagiaires, setStagiaires] = useState([]);
  const [newStagiaire, setNewStagiaire] = useState({
    testId: id,
    stagiaireTestNoteDetails: [],
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  function transformStudentData(students, testId) {
    return {
      testId: testId,
      stagiaireTestNoteDetails: students.map((student) => ({
        stagiaireId: student.id,
        note: 0, 
      })),
    };
  }

  useEffect(() => {
    fetchTestWithFiilere();
  }, []);


  const fetchTestWithFiilere = async () => {
    setLoading(true);
    console.log("Fetching data..."); 
    try {
      const response = await ApiManager.get(`/Trainee/${fid}`);
      console.log("API response:", response.data); 

      if (response.data && Array.isArray(response.data)) {
        setStagiaires(response.data);
        const newArr = transformStudentData(response.data, id);
        setNewStagiaire(newArr);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error); 
    } finally {
      setLoading(false);
      console.log("Loading state set to false."); 
    }
  };


  const handleChange = (e, stagiaireId) => {
    const { value } = e.target;
    setNewStagiaire((prevState) => ({
      ...prevState,
      stagiaireTestNoteDetails: prevState.stagiaireTestNoteDetails.map((detail) =>
        detail.stagiaireId === stagiaireId
          ? { ...detail, note: parseFloat(value) || 0 }
          : detail
      ),
    }));
  };


  const submitDetails = async () => {
    const formattedData = {
      ...newStagiaire,
      stagiaireTestNoteDetails: newStagiaire.stagiaireTestNoteDetails.map(detail => ({
        ...detail,
        note: isNaN(detail.note) ? 0 : detail.note, // Assure que note est un nombre valide
      })),
    };

    console.log("Données formatées à soumettre:", formattedData); // Log pour vérifier les données avant l'envoi

    try {
      const response = await ApiManager.post("/TestResult", formattedData);
      console.log("Response from API:", response.data);
      toast.success("Soumis avec succès!", {
        onClose: () => navigate(`/TestResultsPage`),
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error submitting details:", error);
      toast.error(
        "Une erreur s'est produite lors de la soumission des détails. Veuillez réessayer."
      );
    }
  };

  console.log("Loading state during rendering:", loading); // Log pour vérifier l'état du chargement pendant le rendu

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
              Détails de Test
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
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {stagiaires.map((stagiaire, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                      {stagiaire.firstName + " " + stagiaire.lastName}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                      <input
                        type="number"
                        value={
                          newStagiaire.stagiaireTestNoteDetails.find(
                            (detail) => detail.stagiaireId === stagiaire.id
                          )?.note || ""
                        }
                        onChange={(e) => handleChange(e, stagiaire.id)}
                        className="border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                        placeholder="Note"
                      />
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
