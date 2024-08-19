import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ApiManager from '../../api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import 'react-toastify/dist/ReactToastify.css';

function PlanificationTestPage({ testData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: testData?.name || '',
      description: testData?.description || '',
      testStatement: testData?.testStatement || '',
      testCorrection: testData?.testCorrection || '',
      trainerId: testData?.trainerId || '',
      unitOfFormationId: testData?.unitOfFormationId || '',
      filiereId: testData?.filiereId || '',
    },
  });

  const navigate = useNavigate();
  const [formateurs, setFormateurs] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [unitsOfFormation, setUnitsOfFormation] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [testStatement, setTestStatement] = useState(testData?.testStatement || '');
  const [testCorrection, setTestCorrection] = useState(testData?.testCorrection || '');

  useEffect(() => {
    const fetchFormateurs = async () => {
      try {
        const response = await ApiManager.get('https://localhost:7263/api/Formateur');
        setFormateurs(response.data);
      } catch (error) {
        console.error('Error fetching formateurs:', error);
      }
    };

    const fetchFilieres = async () => {
      try {
        const response = await ApiManager.get('/Filiere');
        setFilieres(response.data);
      } catch (error) {
        console.error('Error fetching filières:', error);
      }
    };

    fetchFormateurs();
    fetchFilieres();
  }, []);

  const handleFiliereChange = (event) => {
    const selectedId = event.target.value;
    setSelectedFiliere(selectedId);

    const filiere = filieres.find(f => f.id === selectedId);

    if (filiere && filiere.filiereUnitOfFormations) {
      const units = filiere.filiereUnitOfFormations.map(uf => uf.unitOfFormation);
      setUnitsOfFormation(units);
    } else {
      setUnitsOfFormation([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        testStatement: testStatement,
        testCorrection: testCorrection,
        trainerId: data.trainerId,
        unitOfFormationId: data.unitOfFormationId,
        filiereId: data.filiereId,
      };

      let response;
      if (testData?.id) {
        response = await ApiManager.put(`/Test/${testData.id}`, payload);
      } else {
        response = await ApiManager.post('/Test', payload);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success('Test submitted successfully!');
        navigate('/ListTest');
      }
    } catch (error) {
      console.error('Error submitting test data:', error.response?.data || error.message);
      toast.error('Failed to submit test. Please try again.');
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
            <h3 className="font-medium text-black text-3xl dark:text-white">
              Planifier un test
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Name and Description Fields */}
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
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
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
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

              {/* Test Statement and Correction Fields using JoditEditor */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Enoncé du test
                </label>
                <JoditEditor
                  value={testStatement}
                  onChange={content => setTestStatement(content)}
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Correction du test
                </label>
                <JoditEditor
                  value={testCorrection}
                  onChange={content => setTestCorrection(content)}
                />
              </div>

              {/* Filière and Unité de Formation Fields */}
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
                    Filière
                  </label>
                  <select
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("filiereId", { required: true })}
                    onChange={handleFiliereChange}
                  >
                    <option value="">Sélectionnez une filière</option>
                    {filieres.map(filiere => (
                      <option key={filiere.id} value={filiere.id}>
                        {filiere.nomFiliere}
                      </option>
                    ))}
                  </select>
                  {errors.filiereId && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
                    Unité de formation
                  </label>
                  <select
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("unitOfFormationId", { required: true })}
                    disabled={!selectedFiliere}
                  >
                    <option value="">Sélectionnez une unité de formation</option>
                    {unitsOfFormation.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                  {errors.unitOfFormationId && <span className="text-red-500">Ce champ est requis</span>}
                </div>
              </div>

              {/* Formateur (Trainer) Field */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Formateur
                </label>
                <select
                  className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                  {...register("trainerId", { required: true })}
                >
                  <option value="">Sélectionnez un formateur</option>
                  {formateurs.map(formateur => (
                    <option key={formateur.id} value={formateur.id}>
                      {`${formateur.nom} ${formateur.prenom}`}
                    </option>
                  ))}
                </select>
                {errors.trainerId && <span className="text-red-500">Ce champ est requis</span>}
              </div>

              {/* Cancel and Submit buttons */}
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
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlanificationTestPage;
