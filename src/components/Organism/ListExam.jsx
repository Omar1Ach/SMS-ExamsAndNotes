import React, { useEffect, useState } from "react";
import ApiManager from "../../api";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
              <p className="text-black">{exam.unitOfFormationId}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.filiereId}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.yearId}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.supervisorId}
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {exam.supervisorId}
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
                onClick={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListExam;
