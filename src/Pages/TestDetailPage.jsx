import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestDetailPage() {
  const { id } = useParams(); 
  const [stagiaires, setStagiaires] = useState([]);
  const [newStagiaire, setNewStagiaire] = useState({
    stagiaireId: "",
    note: "",
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("Updated stagiaires:", stagiaires);
  }, [stagiaires]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStagiaire({ 
      ...newStagiaire, 
      [name]: name === "note" ? parseFloat(value) : value 
    });
  };

  const addStagiaire = () => {
    if (newStagiaire.stagiaireId.trim() === "" || newStagiaire.note === "") {
      toast.error("Veuillez remplir tous les champs!");
      return;
    }

    setStagiaires([...stagiaires, newStagiaire]);
    setNewStagiaire({ stagiaireId: "", note: "" });
    toast.success("Stagiaire ajouté avec succès!");
  };

  const submitDetails = async () => {
    if (stagiaires.length === 0) {
      toast.error("Vous devez ajouter au moins un stagiaire avant de soumettre!");
      return;
    }

    const payload = {
      testId: id,
      stagiaireTestNoteDetails: stagiaires,
    };

    try {
      const response = await axios.post("https://localhost:7263/api/TestResult", payload);
      console.log("Response from API:", response.data);
  
      toast.success("Soumis avec succès!", {
        onClose: () => navigate(`/TestResultsPage/`), 
        autoClose: 3000  
      });
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error("Une erreur s'est produite lors de la soumission des détails. Veuillez réessayer.");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">Détails du test</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-6 py-3 text-center font-bold bg-blue-200">
                  Stagiaire
                </th>
                <th className="border border-gray-300 px-6 py-3 text-center text-sm font-semibold bg-blue-200">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {stagiaires.map((stagiaire, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700 text-center">
                    {stagiaire.stagiaireId}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700 text-center">
                    {stagiaire.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 p-4 border-t border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Ajouter un nouveau stagiaire</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <input
                type="text"
                name="stagiaireId"
                value={newStagiaire.stagiaireId}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                placeholder="Nom Stagiaire"
              />
              <input
                type="text"
                name="note"
                value={newStagiaire.note}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                placeholder="Note"
              />
            </div>
            <button
              onClick={addStagiaire}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
            >
              Ajouter Stagiaire
            </button>
          </div>
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
      <ToastContainer />
    </div>
  );
}
