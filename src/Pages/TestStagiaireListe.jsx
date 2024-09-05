/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiManager from "../api";

export default function TestStagiaireListe() {
  const { id, fid } = useParams();
  const [stagiaires, setStagiaires] = useState([]);
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    console.log("ID:", id);
    console.log("FID:", fid);

    if (id) {
      const fetchStagiaires = async () => {
        try {
          const response = await ApiManager.get(`/TestResult/${id}`);
          console.log("Données des stagiaires:", response.data);
          setStagiaires(response.data.stagiaireTestNoteDetails || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des stagiaires:", error.response ? error.response.data : error.message);
        }
      };
      fetchStagiaires();
    } else {
      console.error("ID est undefined.");
    }

    if (fid) {
      const fetchTrainees = async () => {
        try {
          const response = await ApiManager.get(`/Trainee/${fid}`);
          console.log("Données des stagiaires:", response.data);
          setTrainees([response.data]);
        } catch (error) {
          console.error("Erreur lors de la récupération des stagiaires:", error.response ? error.response.data : error.message);
        }
      };
      fetchTrainees();
    } else {
      console.error("FID est undefined.");
    }
  }, [id, fid]);

  console.log("Stagiaires dans le state:", stagiaires);
  console.log("Trainees dans le state:", trainees);

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
                <th className="border border-gray-300 px-6 py-3 text-center font-bold bg-blue-200">
                  Stagiaire
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold bg-blue-200">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {stagiaires.length > 0 ? (
                stagiaires.map((stagiaireDetail, index) => {
                  const traineeDetail = trainees.find(t => t.id === stagiaireDetail.stagiaireId);
                  console.log(`Stagiaire: ${traineeDetail ? `${traineeDetail.firstName} ${traineeDetail.lastName}` : "Inconnu"}, Note: ${stagiaireDetail.note}`);
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                        {traineeDetail
                          ? `${traineeDetail.firstName || "Inconnu"} ${traineeDetail.lastName || ""}`
                          : "Inconnu"}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700 text-center">
                        {stagiaireDetail.note || "Non disponible"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-300 px-6 py-3 text-center text-sm text-gray-700"
                  >
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
} */
  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import ApiManager from "../api";
  import Table from 'react-bootstrap/Table';
  
  export default function TestStagiaireListe() {
    const { id, fid } = useParams();
    const [stagiaires, setStagiaires] = useState([]);
    const [trainees, setTrainees] = useState([]);
  
    useEffect(() => {
      if (id) {
        const fetchStagiaires = async () => {
          try {
            const response = await ApiManager.get(`/TestResult/${id}`);
            setStagiaires(response.data.stagiaireTestNoteDetails || []);
          } catch (error) {
            console.error("Erreur lors de la récupération des stagiaires:", error.response ? error.response.data : error.message);
          }
        };
        fetchStagiaires();
      }
  
      if (fid) {
        const fetchTrainees = async () => {
          try {
            const response = await ApiManager.get(`/Trainee/${fid}`);
            setTrainees([response.data]);
          } catch (error) {
            console.error("Erreur lors de la récupération des stagiaires:", error.response ? error.response.data : error.message);
          }
        };
        fetchTrainees();
      }
    }, [id, fid]);
  
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Liste des stagiaires</h2>
          </div>
          <div className="overflow-x-auto p-4">
            <Table striped bordered hover size="lg" className="w-full">
              <thead className="bg-gray-200 text-gray-800">
                <tr className="bg-blue-100">
                  <th className="text-center font-bold bg-blue-200">
                    Stagiaire
                  </th>
                  <th className="text-center font-bold bg-blue-200">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {stagiaires.length > 0 ? (
                  stagiaires.map((stagiaireDetail, index) => {
                    const traineeDetail = trainees.find(t => t.id === stagiaireDetail.stagiaireId);
                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                          {traineeDetail
                            ? `${traineeDetail.firstName || "Inconnu"} ${traineeDetail.lastName || ""}`
                            : "Inconnu"}
                        </td>
                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                          {stagiaireDetail.note || "Non disponible"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center text-sm text-gray-700">
                      Aucun stagiaire trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
  
