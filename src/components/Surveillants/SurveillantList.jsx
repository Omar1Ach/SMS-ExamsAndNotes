import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const SurveillantList = () => {
  const [listData, setListData] = useState([]);

  const fetchSurveillants = async () => {
    try {
      const response = await axios.get("https://localhost:7263/api/supervisor");
      setListData(response.data);
    } catch (error) {
      console.error("Error fetching surveillants:", error);
    }
  };

  useEffect(() => {
    fetchSurveillants();
  }, []);

  const handleDelete = async (supervisorId) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://localhost:7263/api/supervisor/${supervisorId}`
          );
          fetchSurveillants();
          Swal.fire("Supprimé!", "L'élément a été supprimé.", "success");
        } catch (error) {
          Swal.fire("Erreur", "Erreur lors de la suppression.", "error");
        }
      }
    });
  };

  return (
    <div className="rounded-sm border m-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white font-satoshi">
          Surveillants
        </h4>
        <Link
          to="/add-surveillant"
          className="px-4 py-2 bg-blue-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Ajouter Surveillant
        </Link>
      </div>

      <div className="flex flex-col font-satoshi">
        <div className="grid grid-cols-2 rounded-sm bg-blue-100 dark:bg-meta-4 text-graydark sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Surveillant
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Titre
            </h5>
          </div>
        </div>

        {listData.map((list) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 border-b border-stroke dark:border-strokedark`}
            key={list.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block font-semibold">
                {list.firstName} {list.lastName}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{list.title}</p>
            </div>
            <div className="hidden items-center justify-center text-2xl p-2.5 sm:flex xl:p-5 gap-3">
              <Link to={`/update/${list.id}`}>
                <FaRegEdit className="text-graydark cursor-pointer" />
              </Link>
              <button
                onClick={() => handleDelete(list.id)}
                className="text-red-600 cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveillantList;
