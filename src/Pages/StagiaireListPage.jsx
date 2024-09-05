/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApiManager from "../api";

export default function StagiaireListPage() {
  const { id, fid } = useParams();
  const [stagiaires, setStagiaires] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedStagiaire, setEditedStagiaire] = useState({});

  useEffect(() => {
    if (id) {
      const fetchStagiaires = async () => {
        try {
          const response = await ApiManager.get(`ExamResult/id?id=${id}`);
          setStagiaires(response.data || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des stagiaires:", error);
        }
      };
      fetchStagiaires();
    }
    
    if (fid) {
      const fetchTrainee = async () => {
        try {
          const response = await ApiManager.get(`/Trainee/${fid}`);
          setTrainee(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des informations du stagiaire:", error);
        }
      };
      fetchTrainee();
    }
  }, [id, fid]);

  const handleEdit = (stagiaireId) => {
    setEditId(stagiaireId);
    const stagiaireToEdit = stagiaires.find(
      (stagiaire) => stagiaire.stagiaireId === stagiaireId
    );
    setEditedStagiaire({ ...stagiaireToEdit });
  };

  const handleInputChange = (e, field) => {
    setEditedStagiaire((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const data = {
        examId: id,
        stagiaireNoteDetails: [
          {
            stagiaireId: editId,
            practicalNote: editedStagiaire.practicalNote,
            theoreticalNote: editedStagiaire.theoreticalNote,
          },
        ],
      };

      await axios.put("https://localhost:7263/api/ExamResult", data);

      const updatedStagiaires = stagiaires.map((stagiaire) =>
        stagiaire.stagiaireId === editId ? editedStagiaire : stagiaire
      );
      setStagiaires(updatedStagiaires);
      setEditId(null);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des modifications:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Liste des stagiaires
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
                    <div className="text-center font-bold">Note théorique</div>
                    <div className="text-center font-bold">Note pratique</div>
                  </div>
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold bg-blue-200">
                  <div className="text-center font-bold">Action</div>
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
                    {trainee.find((t) => t.id === stagiaire.stagiaireId)?.firstName + " " + trainee.find((t) => t.id === stagiaire.stagiaireId)?.lastName}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center">
                        {editId === stagiaire.stagiaireId ? (
                          <input
                            type="number"
                            value={editedStagiaire.theoreticalNote || ""}
                            onChange={(e) =>
                              handleInputChange(e, "theoreticalNote")
                            }
                            className="border border-gray-300 px-2 py-1 rounded w-24"
                          />
                        ) : (
                          stagiaire.theoreticalNote
                        )}
                      </div>
                      <div className="text-center">
                        {editId === stagiaire.stagiaireId ? (
                          <input
                            type="number"
                            value={editedStagiaire.practicalNote || ""}
                            onChange={(e) =>
                              handleInputChange(e, "practicalNote")
                            }
                            className="border border-gray-300 px-2 py-1 rounded w-24"
                          />
                        ) : (
                          stagiaire.practicalNote
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-center">
                    {editId === stagiaire.stagiaireId ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Sauvegarder
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(stagiaire.stagiaireId)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Modifier
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {stagiaires.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
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
}
*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApiManager from "../api";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function StagiaireListPage() {
  const { id, fid } = useParams();
  const [stagiaires, setStagiaires] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedStagiaire, setEditedStagiaire] = useState({});

  useEffect(() => {
    if (id) {
      const fetchStagiaires = async () => {
        try {
          const response = await ApiManager.get(`ExamResult/id?id=${id}`);
          setStagiaires(response.data || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des stagiaires:", error);
        }
      };
      fetchStagiaires();
    }

    if (fid) {
      const fetchTrainee = async () => {
        try {
          const response = await ApiManager.get(`/Trainee/${fid}`);
          setTrainee(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des informations du stagiaire:", error);
        }
      };
      fetchTrainee();
    }
  }, [id, fid]);

  const handleEdit = (stagiaireId) => {
    setEditId(stagiaireId);
    const stagiaireToEdit = stagiaires.find(
      (stagiaire) => stagiaire.stagiaireId === stagiaireId
    );
    setEditedStagiaire({ ...stagiaireToEdit });
  };

  const handleInputChange = (e, field) => {
    setEditedStagiaire((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const data = {
        examId: id,
        stagiaireNoteDetails: [
          {
            stagiaireId: editId,
            practicalNote: editedStagiaire.practicalNote,
            theoreticalNote: editedStagiaire.theoreticalNote,
          },
        ],
      };

      await axios.put("https://localhost:7263/api/ExamResult", data);

      const updatedStagiaires = stagiaires.map((stagiaire) =>
        stagiaire.stagiaireId === editId ? editedStagiaire : stagiaire
      );
      setStagiaires(updatedStagiaires);
      setEditId(null);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des modifications:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-blue-100 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Liste des stagiaires
          </h2>
        </div>
        <div className="overflow-x-auto p-4">
          <Table striped bordered hover size="sm">
            <thead className="bg-gray-200 text-gray-800">
              <tr className="bg-blue-100">
                <th className="text-center font-bold bg-blue-200">
                  Stagiaire
                </th>
                <th className="text-center font-bold bg-blue-200">
                  Note théorique
                </th>
                <th className="text-center font-bold bg-blue-200">
                  Note pratique
                </th>
                <th className="text-center font-bold bg-blue-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stagiaires.map((stagiaire, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {trainee.find((t) => t.id === stagiaire.stagiaireId)?.firstName + " " + trainee.find((t) => t.id === stagiaire.stagiaireId)?.lastName}
                  </td>
                  <td className="text-center">
                    {editId === stagiaire.stagiaireId ? (
                      <input
                        type="number"
                        value={editedStagiaire.theoreticalNote || ""}
                        onChange={(e) =>
                          handleInputChange(e, "theoreticalNote")
                        }
                        className="border border-gray-300 px-2 py-1 rounded w-24"
                      />
                    ) : (
                      stagiaire.theoreticalNote
                    )}
                  </td>
                  <td className="text-center">
                    {editId === stagiaire.stagiaireId ? (
                      <input
                        type="number"
                        value={editedStagiaire.practicalNote || ""}
                        onChange={(e) =>
                          handleInputChange(e, "practicalNote")
                        }
                        className="border border-gray-300 px-2 py-1 rounded w-24"
                      />
                    ) : (
                      stagiaire.practicalNote
                    )}
                  </td>
                  <td className="text-center">
                    {editId === stagiaire.stagiaireId ? (
                      <>
                        <Button
                          variant="success"
                          onClick={handleSave}
                           className="text-sm px-3 py-1"
                        >
                          Sauvegarder
                        </Button>{' '}
                        <Button
                          variant="danger"
                          onClick={handleCancel}
                          className="text-sm px-3 py-1"
                        >
                          Annuler
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(stagiaire.stagiaireId)}
                        className="text-sm px-3 py-1"
                      >
                        Modifier
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {stagiaires.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-700"
                  >
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
