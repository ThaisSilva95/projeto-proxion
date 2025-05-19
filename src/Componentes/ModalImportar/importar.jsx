
"use client";

import React from "react";

export default function ModalUpload({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full text-center max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-teal-700 mb-2">Adicionar Novo Equipamento</h2>
        <p className="text-sm font-regular text-teal-700 mb-4"> Para adicionar novo equipamento, <br/> importe um arquivo do Movidesk  </p>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileChange}
          className="block w-full text-sm text-teal-700 border border-gray-300 rounded-md p-4 mb-4"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
