import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import ApiManager from '../../api';

const RoomList = () => {
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const response = await ApiManager.get('/Room');
      setListData(response.data);
      
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Erreur lors de la récupération des salles.');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await ApiManager.delete(`/Room/${roomId}`);
        fetchRooms();
        toast.success("Salle supprimée avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression de la salle.");
      }
    }
    console.log(roomId);
  };

  return (
    <div className="rounded-sm border m-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white font-satoshi">
          Salles
        </h4>
        <button
          onClick={() => navigate('/add-room')}
          className="px-4 py-2 bg-blue-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Ajouter Salle
        </button>
      </div>

      <div className="flex flex-col font-satoshi">
        <div className="grid grid-cols-3 rounded-sm bg-blue-100 dark:bg-meta-4 text-graydark sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom de la salle
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type de salle
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Capacité
            </h5>
          </div>
        </div>

        {listData.map((room, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${key === listData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}
            key={room.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block font-semibold">
                {room.roomName}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{room.roomType == 0?"Salle Normale" : "Salle de Pratique"}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{room.capacity}</p>
            </div>
            <div className="hidden items-center justify-center text-2xl p-2.5 sm:flex xl:p-5 gap-3">
              <Link to={`/update-room/${room.id}`}>
                <FaRegEdit className='text-graydark cursor-pointer' />
              </Link>
              <RiDeleteBin5Line className='text-red-600 cursor-pointer' onClick={() => handleDelete(room.id)} />
              
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoomList;
