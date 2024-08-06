import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiManager from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRoom = () => {
  const { roomId } = useParams();
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await ApiManager.get(`/Room/${roomId}`);
        if (response.status === 200) {
          const roomData = response.data;
          setRoomType(roomData.roomType);
          setCapacity(roomData.capacity);
          setRoomName(roomData.roomName);
        } else {
          toast.error('Erreur lors de la récupération de la salle.');
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error('Erreur lors de la récupération de la salle.');
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!roomType || !capacity || !roomName) {
      toast.error("Assurez-vous de remplir tout!");
      return;
    }

    const formData = {
      roomId: roomId,
      roomType: parseInt(roomType),
      capacity: parseInt(capacity),
      roomName: roomName,
    };

    try {
      const response = await ApiManager.put(`/Room/${roomId}`, formData);
      if (response.status === 200) {
        toast.success("Salle mise à jour avec succès!");
        navigate('/room-list');
      } else {
        toast.error("Erreur lors de la mise à jour de la salle!");
      }
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error(`Erreur réseau! ${error.message}`);
    }
  };

  return (
    <div className="m-0 mt-6 gap-9 sm:grid-cols-2 m-16">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Modifier Salle
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Type de salle <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  >
                    <option value="" disabled>
                      Sélectionnez le type de salle
                    </option>
                    <option value={0}>Salle normale</option>
                    <option value={1}>Salle de pratique</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Capacité <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={capacity}
                    placeholder="Entrez la capacité"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nom de la salle <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    placeholder="Entrez le nom de la salle"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <Link
                  to='/room-list'
                  className="flex justify-center rounded bg-meta-1 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Annuler
                </Link>
                <button
                  type='submit'
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateRoom;
