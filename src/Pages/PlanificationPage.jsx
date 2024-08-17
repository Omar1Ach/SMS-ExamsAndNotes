function PlanificationPage() {
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
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Unite de formation <span className="text-meta-1">*</span>
                    </label>
                    <input
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      value={Form.uof}
                      type="text"
                      {...register("uof")}
                      placeholder="Unite de formation"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      L'année scolaire <span className="text-meta-1">*</span>
                    </label>
                    <input
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      value={Form.Year}
                      type="text"
                      {...register("Year")}
                      placeholder="L'année scolaire"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Filière<span className="text-meta-1">*</span>
                    </label>
                    <input
                      className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition disabled:cursor-default disabled:bg-whiter"
                      value={Form.filiere}
                      type="text"
                      {...register("filiere")}
                      placeholder="Filière"
                    />
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

export default PlanificationPage;
