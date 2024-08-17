import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiManager from "../../api";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function ListVariantExam() {
  const [VariantExams, setVariantExams] = useState([]);
  const navigate = useNavigate();

  const fetchVariantExams = async () => {
    try {
      const response = await ApiManager.get("/VariantsExam");
      setVariantExams(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching VariantExams:", error);
      toast.error("Erreur lors de la récupération des VariantExams.");
    }
  };

  useEffect(() => {
    fetchVariantExams();
  }, []);

  const handleDelete = async (testId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        const response = await ApiManager.delete(`/Test/${testId}`);
        if (response.status === 200) {
          setVariantExams(VariantExams.filter((test) => test.id !== testId));
          toast.success("Test supprimé avec succès !");
        } else {
          toast.error("Erreur lors de la suppression du test.");
        }
      } catch (error) {
        console.error("Error deleting test:", error);
        toast.error("Erreur lors de la suppression du test.");
      }
    }
  };
  return (
    <div className="rounded-sm border m-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white font-satoshi">
          Liste des Varinat Exam
        </h4>
        <button
          onClick={() => navigate("/VaraintExam/create")}
          className="px-4 py-2 bg-blue-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Ajouter un Varinat
        </button>
      </div>

      <div className="flex flex-col font-satoshi">
        <div className="grid grid-cols-3 rounded-sm bg-blue-100 dark:bg-meta-4 text-graydark sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nom</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Description
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Enoncé
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Correction
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {VariantExams.map((test, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === VariantExams.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={test.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block font-semibold">
                {test.variantName || "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{test.description || "N/A"}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{test.examStatement || "N/A"}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{test.examCorrection || "N/A"}</p>
            </div>
            <div className="hidden items-center justify-center text-2xl p-2.5 sm:flex xl:p-5 gap-3">
              <Link to={`/update-test/${test.id}`}>
                <FaRegEdit className="text-graydark cursor-pointer" />
              </Link>
              <RiDeleteBin5Line
                className="text-red-600 cursor-pointer"
                onClick={() => handleDelete(test.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ListVariantExam;
