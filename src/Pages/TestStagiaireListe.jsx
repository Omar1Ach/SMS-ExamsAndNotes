import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TestStagiaireList() {
  const { id } = useParams(); 
  const [stagiaires, setStagiaires] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchStagiaires = async () => {
        try {
          
          const response = await axios.get(`https://localhost:7263/api/TestResult/${id}`);
          setStagiaires(response.data || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des stagiaires:", error);
        }
      };

      fetchStagiaires();
    }
  }, [id]);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">Liste des stagiaires</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-6 py-3 text-center font-bold bg-blue-200">Stagiaire ID</th>
                <th className="border border-gray-300 px-6 py-3 text-center font-bold bg-blue-200">Note</th>
              </tr>
            </thead>
            <tbody>
              {stagiaires.map((stagiaire, index) => (
                <tr key={stagiaire.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                    {stagiaire.stagiaireId}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700 text-center">
                    {stagiaire.note}
                  </td>
                </tr>
              ))}
              {stagiaires.length === 0 && (
                <tr>
                  <td colSpan="2" className="border border-gray-300 px-6 py-3 text-center text-sm text-gray-700">
                    Aucun stagiaire trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
