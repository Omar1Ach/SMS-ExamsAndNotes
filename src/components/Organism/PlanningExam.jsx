import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Swal from "sweetalert2";
import { Navigate, redirect } from "react-router-dom";
import ApiManager from "../../api";
import { render } from "react-dom";

function PlanningExam() {
  const Form = useForm();
  const { register, handleSubmit } = Form;
  const [rooms, setRooms] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const handleFiliereChange = (event) => {
    const selectedId = event.target.value;
    const filiere = filieres.find((f) => f.id === selectedId);
    setSelectedFiliere(filiere);
    console.log(filiere);
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

  useEffect(() => {
    fetchSupervisors();
    fetchRoom();
    fetchFiliere();
  }, []);

  const onSubmit = (data) => {
    // Construct the date and time strings
    const examDate = new Date(data.examDate); // Assuming data.examDate is in a format compatible with Date
    const startHour = parseInt(data.Debuthour, 10);
    const startMinute = parseInt(data.Debutminute, 10);

    // Set the time for the startTime
    examDate.setHours(startHour);
    examDate.setMinutes(startMinute);
    examDate.setSeconds(0);
    examDate.setMilliseconds(0);

    // Convert to ISO 8601 format
    const isoStartTime = examDate.toISOString();

    const addExam = {
      examDate: data.examDate,
      duration: `${data.hour}:${data.minute}:00`,
      startTime: isoStartTime, // Use the ISO 8601 formatted startTime
      examType: parseInt(data.examtype),
      yearId: data.Year,
      yearType: parseInt(data.YearType),
      filiereId: data.filiere,
      unitOfFormationId: data.uof,
      roomId: data.room,
      supervisorId: data.supervisor,
    };

    console.log(addExam);

    ApiManager.post("/Exam", addExam)
      .then((response) => {
        if (response.status === 200) {
          // Swal.fire({
          //   position: "top-center",
          //   icon: "success",
          //   title: "Your work has been saved",
          //   showConfirmButton: false,
          //   timer: 1000,
          // });
          redirect("/planningExam");
        } else if (response.status === 207) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: response.data,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding Exam:", error);
      });
  };

  const fetchRoom = async () => {
    try {
      const response = await ApiManager.get("/Room");
      setRooms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Room:", error);
    }
  };

  const fetchFiliere = async () => {
    try {
      const response = await ApiManager.get("/Filiere");
      //there
      setFilieres(response.data);
    } catch (error) {
      console.error("Error fetching Filiere :", error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await ApiManager.get("/Supervisor");
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };
  console.log(filieres);

  return (
    <>
      <div className="mt-6 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Planifier une examen
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      value={Form.examDate}
                      type="date"
                      {...register("examDate")}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Duration <span className="text-meta-1">*</span>
                    </label>
                    <div className="flex space-x-2">
                      <select
                        {...register("hour")}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Heur
                        </option>
                        {Array.from({ length: 24 }, (_, i) => i + 1).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          )
                        )}
                      </select>
                      <select
                        {...register("minute")}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Minutes
                        </option>
                        {Array.from({ length: 60 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Start <span className="text-meta-1">*</span>
                    </label>
                    <div className="flex space-x-2">
                      <select
                        {...register("Debuthour")}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Heur
                        </option>
                        {Array.from({ length: 24 }, (_, i) => i + 1).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          )
                        )}
                      </select>
                      <select
                        {...register("Debutminute")}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Minutes
                        </option>
                        {Array.from({ length: 60 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Les Salle <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      {...register("room")}
                    >
                      <option selected disabled hidden>
                        Choisissez réunion
                      </option>
                      {rooms?.map((room, i) => {
                        return (
                          <option key={i} value={room.id}>
                            {room.roomName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Les Surveillant <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      {...register("supervisor")}
                      required
                    >
                      <option value="" selected disabled hidden>
                        Liste des Surveillants
                      </option>

                      {supervisors?.map((Supervisor, i) => {
                        return (
                          <option key={i} value={Supervisor.id}>
                            {Supervisor.firstName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Type examen <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      {...register("examtype")}
                    >
                      <option disabled hidden selected>
                        Choisissez le examen
                      </option>
                      <option value="0">Practical</option>
                      <option value="1">Theoretical</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                  {
                    <div className="w-full sm:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Unite de formation{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <select
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        {...register("uof")}
                        required
                        disabled={selectedFiliere == null}
                      >
                        <option value="" selected disabled hidden>
                          Unite de formation
                        </option>

                        {selectedFiliere?.filiereUnitOfFormations.map(
                          (sf, i) => {
                            return (
                              <option key={i} value={sf.unitOfFormation.id}>
                                {sf.unitOfFormation.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  }
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      L'année scolaire <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      {...register("Year")}
                    >
                      <option selected disabled hidden>
                        Choisissez réunion
                      </option>
                      {listAnne?.map((ann, i) => {
                        return (
                          <option key={i} value={ann.id}>
                            {ann.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Filière<span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      {...register("filiere")}
                      onChange={handleFiliereChange}
                    >
                      <option selected disabled hidden>
                        Choisissez réunion
                      </option>
                      {filieres?.map((filiere, i) => {
                        return (
                          <option key={i} value={filiere.id}>
                            {filiere.nomFiliere}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Niveau <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      {...register("YearType")}
                    >
                      <option disabled hidden selected>
                        Choisissez le examen
                      </option>
                      <option value="0">1er année</option>
                      <option value="1">2éme année</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    type="submit"
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DevTool control={Form.control} />
      </div>
    </>
  );
}

export default PlanningExam;
