import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../components/Atoms/Input";

function PlanificationPage() {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState("etablissement");
  const [customLocation, setCustomLocation] = useState("");
  const [hours, setHours] = useState("12");
  const [jury, setJury] = useState("");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [type, setType] = useState();
  const [supervisors, setSupervisors] = useState([]);
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);
  };

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch("https://localhost:7263/api/Supervisor");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSupervisors(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchSupervisors();
  }, []);

  return (
    <>
      <div className="mt-6 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Planifier une Exam
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date <span className="text-meta-1">*</span>
                    </label>
                    <Input
                      value={date}
                      type={"date"}
                      onChange={handleDateChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      L'heure <span className="text-meta-1">*</span>
                    </label>
                    <div className="flex space-x-2">
                      <select
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Heur
                        </option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          )
                        )}
                      </select>
                      <select
                        onChange={(e) => setMinutes(e.target.value)}
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
                      <select
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                        required
                      >
                        <option disabled hidden selected>
                          Période
                        </option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Type de réunion <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected disabled hidden>
                        Choisissez réunion
                      </option>
                      <option value={0}>Première réunion</option>
                      <option value={1}>Deuxième réunion</option>
                      <option value={2}>Troisième réunion</option>
                      <option value={3}>Quatrième réunion</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jury <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      onChange={(e) => setJury(e.target.value)}
                      required
                    >
                      <option value="" selected disabled hidden>
                        Liste de Jury
                      </option>

                      {supervisors?.map((Supervisor, i) => {
                        return (
                          <option key={i} value={Supervisor.juryId}>
                            {Supervisor.juryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Lieu <span className="text-meta-1">*</span>
                    </label>
                    <select
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      required
                    >
                      <option disabled hidden selected>
                        Choisissez le Lieu
                      </option>
                      <option value="etablissement">Établissement</option>
                      <option value="autre">Autre</option>
                    </select>
                    {location === "autre" && (
                      <input
                        type="text"
                        placeholder="Entrez le lieu"
                        value={customLocation}
                        className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] mt-2 bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <Link
                    to="/Home"
                    className="flex justify-center rounded bg-meta-1 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  >
                    Annuler
                  </Link>
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
      </div>
    </>
  );
}

export default PlanificationPage;
