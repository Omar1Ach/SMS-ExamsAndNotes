import React, { useEffect, useState } from "react";
import ApiManager from "../../api";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function ListExam() {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetchExam();
  }, []);
  const fetchExam = () => {
    ApiManager.get("/Exam")
      .then((res) => {
        setExams(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const handleDelete = async (ExamID) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await ApiManager.delete(`/Exam/${ExamID}`);
        fetchRooms();
        toast.success("Salle supprimée avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression de la salle.");
      }
    }
  };
  return (
    <div className="rounded-sm border m-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white font-satoshi">
          List des Examens
        </h4>
        <Link
          to="/planningExam/create"
          className="px-4 py-2 bg-blue-950 text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Ajouter un examen
        </Link>
      </div>

      <div className="flex flex-col font-satoshi">
        <div className="grid grid-cols-2 rounded-sm bg-blue-100 dark:bg-meta-4 text-graydark sm:grid-cols-9">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Duration
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Unité de formation
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Filière
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Année
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Surveillant
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Salle
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Heure_debut
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {exams.map((exam, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-9 ${
              key === exam.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block font-semibold">
                {exam.examDate}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5 ">
              <p className="hidden text-black dark:text-white sm:block font-semibold">
                {exam.duration}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{exam.unitOfFormation.name}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.filiere.nomFiliere}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {listAnne.map((anne) => {
                if (anne.id === exam.yearId) {
                  return anne.name;
                }
              })}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.examSession?.supervisor?.firstName}{" "}
              {exam.examSession?.supervisor?.lastName}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.examSession?.room?.roomName}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.startTime}
            </div>
            <div className="hidden items-center justify-center text-2xl p-2.5 sm:flex xl:p-5 gap-3">
              <Link to={`/update/`}>
                <FaRegEdit className="text-graydark cursor-pointer" />
              </Link>
              <MdDelete
                className="cursor-pointer text-red-500"
                onClick={() => {
                  handleDelete(exam.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListExam;
