import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSurveillant = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!FirstName || !LastName || !Title) {
      Swal.fire({
        title: "Assurez-vous de remplir tout!",
        icon: "error",
      });
      return;
    }

    const formData = {
      firstName: FirstName,
      lastName: LastName,
      title: Title,
    };

    try {
      const response = await axios.post('http://localhost:5163/api/[controller]', formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Surveillant ajouté avec succès!",
          icon: "success",
        });
        navigate('/surveillant-list');
      } else {
        Swal.fire({
          title: "Erreur lors de l'ajout du surveillant!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur réseau!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="m-0 mt-6 gap-9 sm:grid-cols-2 m-16">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Créer Surveillant
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Prénom <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre prénom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="mt-8 mb-2.5 block text-black dark:text-white">
                    Nom de famille <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom de famille"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Titre <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre titre"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <Link
                  to='/Home'
                  className="flex justify-center rounded bg-meta-1 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Annuler
                </Link>
                <button
                  type='submit'
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
};

export default AddSurveillant;
