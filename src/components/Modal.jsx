import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, examName, onViewStagiaires }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg z-50 p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Voir les détails de l'examen</h2>
        <p>Voulez-vous voir les détails pour l'examen: <strong>{examName}</strong>?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onViewStagiaires}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
          liste des stagiaires
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             détails Examen
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
