import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ApiManager from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateTest() {
  const { id } = useParams(); // Get the test ID from the URL
  const [testData, setTestData] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        console.log("Fetching test data for ID:", id); // Debug log
        const response = await ApiManager.get(`/Test/${id}`);
        if (response.data) {
          setTestData(response.data);
          setValue('name', response.data.name);
          setValue('description', response.data.description);
          setValue('testStatement', response.data.testStatement);
          setValue('testCorrection', response.data.testCorrection);
          setValue('trainerId', response.data.trainerId);
          setValue('unitOfFormationId', response.data.unitOfFormationId);
        } else {
          toast.error('Failed to load test data.');
          console.error('Test data not found:', response);
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
        toast.error('Failed to load test data.');
      }
    };

    if (id) {
      fetchTestData();
    } else {
      toast.error('No ID found in URL.');
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        testStatement: data.testStatement,
        testCorrection: data.testCorrection,
        trainerId: data.trainerId,
        unitOfFormationId: data.unitOfFormationId,
      };
  
      const response = await ApiManager.put(`/Test/${id}`, payload);
  
      if (response.status === 200) {
        toast.success('Test updated successfully!');
        navigate('/ListTest');
      } else {
        toast.error('Failed to update test. Please try again.');
        console.error('Failed to update:', response);
      }
    } catch (error) {
      console.error('Error updating test data:', error);
      toast.error('Failed to update test. Please try again.');
    }
  };
  

  const handleCancel = () => {
    navigate('/ListTest');
  };

  return (
    <div className="mt-6 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Mettre à jour le test
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nom du test
                  </label>
                  <input
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Nom du test"
                  />
                  {errors.name && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("description", { required: true })}
                    placeholder="Description du test"
                  />
                  {errors.description && <span className="text-red-500">Ce champ est requis</span>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Énoncé du test
                  </label>
                  <textarea
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("testStatement", { required: true })}
                    placeholder="Énoncé du test"
                  />
                  {errors.testStatement && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Correction du test
                  </label>
                  <textarea
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("testCorrection", { required: true })}
                    placeholder="Correction du test"
                  />
                  {errors.testCorrection && <span className="text-red-500">Ce champ est requis</span>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Formateur (ID)
                  </label>
                  <input
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    type="text"
                    {...register("trainerId", { required: true })}
                    placeholder="Entrez l'ID du formateur"
                  />
                  {errors.trainerId && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Unité de formation (ID)
                  </label>
                  <input
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    type="text"
                    {...register("unitOfFormationId", { required: true })}
                    placeholder="Entrez l'ID de l'unité de formation"
                  />
                  {errors.unitOfFormationId && <span className="text-red-500">Ce champ est requis</span>}
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  type="button"
                  className="flex justify-center rounded bg-gray-500 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTest;
