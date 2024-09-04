import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ApiManager from '../../api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import 'react-toastify/dist/ReactToastify.css';

const variantTypeOptions = [
  { value: 0, label: 'Pratique' },
  { value: 1, label: 'Théorique' },
];

function AddNewVariant({ variantData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      variantName: variantData?.variantName || '',
      description: variantData?.description || '',
      examStatement: variantData?.examStatement || '',
      examCorrection: variantData?.examCorrection || '',
      trainerId: variantData?.trainerId || '',
      variantType: variantData?.variantType || 0,
      noteMax: variantData?.noteMax || 0,
      isValid: variantData?.isValid || true,
    },
  });

  const navigate = useNavigate();
  const [formateurs, setFormateurs] = useState([]);
  const [examStatement, setExamStatement] = useState(variantData?.examStatement || '');
  const [examCorrection, setExamCorrection] = useState(variantData?.examCorrection || '');

  useEffect(() => {
    const fetchFormateurs = async () => {
      try {
        const response = await ApiManager.get('/Formateur');
        setFormateurs(response.data);
      } catch (error) {
        console.error('Error fetching formateurs:', error);
      }
    };

    fetchFormateurs();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        examId: variantData?.examId || undefined,
        variantName: data.variantName,
        description: data.description,
        examStatement: examStatement,
        examCorrection: examCorrection,
        variantType: parseInt(data.variantType, 10), 
        noteMax: parseFloat(data.noteMax),
        isValid: data.isValid,
        trainerId: data.trainerId,
      };

      const url = variantData?.id 
        ? `/VariantExam/${variantData.id}` 
        : '/VariantExam';

      console.log("Submitting to URL:", url);
      console.log("Payload:", payload);

      let response;
      if (variantData?.id) {
        response = await ApiManager.put(url, payload);
      } else {
        response = await ApiManager.post(url, payload);
      }

      console.log("API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success('Variant exam submitted successfully!');
        navigate('/ListVariantExam');
      }
    } catch (error) {
      console.error('Error submitting variant exam data:', error.response?.data || error.message);
      toast.error(`Failed to submit variant exam. ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  const handleCancel = () => {
    navigate('/ListVariantExam');
  };

  return (
    <div className="mt-6 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black text-3xl dark:text-white">
              Planifier un examen de variante
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Variant Name and Description Fields */}
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                    Nom de la variante
                  </label>
                  <input
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    type="text"
                    {...register("variantName", { required: true })}
                    placeholder="Nom de la variante"
                  />
                  {errors.variantName && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("description", { required: true })}
                    placeholder="Description de la variante"
                  />
                  {errors.description && <span className="text-red-500">Ce champ est requis</span>}
                </div>
              </div>

              {/* Variant Statement and Correction Fields using JoditEditor */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Enoncé de l'examen
                </label>
                <JoditEditor
                  value={examStatement}
                  onChange={content => setExamStatement(content)}
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Correction de l'examen
                </label>
                <JoditEditor
                  value={examCorrection}
                  onChange={content => setExamCorrection(content)}
                />
              </div>

              {/* Variant Type Dropdown */}
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
                    Type de variante
                  </label>
                  <select
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    {...register("variantType", { required: true })}
                  >
                    <option value="" disabled>Sélectionnez le type de variante</option>
                    {variantTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.variantType && <span className="text-red-500">Ce champ est requis</span>}
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block font-semibold text-black text-xl dark:text-white">
                    Note Maximale
                  </label>
                  <input
                    className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                    type="number"
                    {...register("noteMax", { required: true })}
                    placeholder="Note Maximale"
                  />
                  {errors.noteMax && <span className="text-red-500">Ce champ est requis</span>}
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

              {/* Is Valid Field */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-semibold text-xl dark:text-white">
                  Est-ce valide ?
                </label>
                <input
                  className="w-full rounded-[4px] border-[1px] border-[#E0E0E0] text-[16px] bg-[#FFFFFF] py-3 px-5 text-[#424242] outline-none transition"
                  type="checkbox"
                  {...register("isValid")}
                />
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

export default AddNewVariant;
