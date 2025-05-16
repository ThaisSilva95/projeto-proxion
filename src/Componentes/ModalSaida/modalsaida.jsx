"use client";

import { useState, useEffect } from "react";
import BGModal from "../../app/IMG/BGModal.png";
import ModalNotas from '../../Componentes/ModalNotas/notas'


function ModalHorarioSaida({ isOpen, onClose }) {
  const [horarioSaida, setHorarioSaida] = useState("");
  const [modalInfoAberto, setModalInfoAberto] = useState(false);


  useEffect(() => {
    if (isOpen) {
      const horarioAtual = new Date().toTimeString().slice(0, 5);
  
  setHorarioSaida(horarioAtual);
}
  }, [isOpen]);

return isOpen ? (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center lg:ml-[200px]">
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-80"
      style={{
        backgroundImage: `url(${BGModal.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>

      <h2 className="text-xl font-bold text-teal-700 text-center mb-4">Horário de Saída</h2>
      <input
        type="time"
        className="border rounded p-2 w-full text-center"
        value={horarioSaida}
        onChange={(e) => setHorarioSaida(e.target.value)}
      />
      <div className="flex justify-between mt-4">
        <button
          className=" text-teal-900 py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancelar
        </button>
        
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded"
          onClick={() => {
                setModalInfoAberto(true);
              }}
            >
              Confirmar
            </button>
           

      </div>
    </div>
    <ModalNotas
        isOpen={modalInfoAberto} 
        onClose={() => setModalInfoAberto(false)} 
      />

  </div>

) : null;
}

export default ModalHorarioSaida;