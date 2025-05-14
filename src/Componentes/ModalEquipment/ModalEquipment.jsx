"use client";

import { useState, useEffect } from "react";
import BGModal from "../../app/IMG/BGModal.png";

export default function ClientModal({
  isOpen,
  onClose,
  onSave,
  clienteEditando,
}) {
  const [formData, setFormData] = useState({
    equipamento: "",
    defeitos: [],
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      const updatedDefeitos = checked
        ? [...prevFormData.defeitos, value]
        : prevFormData.defeitos.filter((defeito) => defeito !== value);
      return { ...prevFormData, defeitos: updatedDefeitos };
    });
  };

  if (!isOpen) return null;

  const gruposDeDefeitos = [
    {
      nome: "Defeitos Gerais",
      opcoes: [
        "Carcaca", "Tela", "Nao Liga", "Engine", "Comunicação", "Borracha de Proteção",
        "Trava da Bateria", "Gatilho", "Software/Sistema Operacional", "Video de Engie",
        "Antena RFID", "Botão Feed", "Configuração", "Teclado", "Outros",
      ],
    },
    {
      nome: "Impressora",
      opcoes: [
        "Cabeça da Impressão", "Rolete", "Suporte Mídia", "Suporte Ribbon", "Sensor Ribbon",
        "Cutter", "Módulo RFID", "Trava da Tampa", "Sensor da Tampa", "Sensor de Midia",
        "Rebobinador/Peel off", "Trava da cabeça da impressão", "Sensor da Cabeça de impressão",
      ],
    },
    {
      nome: "Leitores",
      opcoes: ["Suporte Device", "Firmware", "LED", "Conector de Antena"],
    },
    {
      nome: "Coletores",
      opcoes: ["LCD", "Pinos de Conexão", "Atualização"],
    },
    {
      nome: "Diversos",
      opcoes: ["Antena", "Placa", "Comunicação Ethernet"],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-teal-700">
      <div
        className="relative w-[912px] p-8 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
        style={{
          backgroundImage: `url(${BGModal.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <button className="absolute top-4 right-4 text-xl font-bold" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold text-center mb-8">
          Cadastro de Equipamento e Defeitos
        </h2>

        <div className="flex flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-col justify-start w-1/2">
            <label className="text-lg font-semibold mb-1" htmlFor="equipamento">
              Tipo de Equipamento
            </label>
            <input
              type="text"
              name="equipamento"
              className="border border-[#00ABAD] rounded-lg p-2 w-full text-black"
              value={formData.equipamento}
              onChange={(e) =>
                setFormData({ ...formData, equipamento: e.target.value })
              }
            />
          </div>
          <button className="text-white font-medium text-lg bg-[#FDA417] w-[170px] h-[36px] rounded-lg">
            Adicionar Defeito
          </button>
        </div>

        {gruposDeDefeitos.map((grupo, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-bold text-md mb-1">{grupo.nome}</h3>
            <div className="grid grid-cols-4 gap-2">
              {grupo.opcoes.map((defeito) => (
                <div key={defeito} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id={defeito}
                    value={defeito}
                    onChange={handleCheckboxChange}
                    checked={formData.defeitos.includes(defeito)}
                    className="accent-[#00ABAD]"
                  />
                  <label htmlFor={defeito} className="text-sm font-semibold">
                    {defeito}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Botões de Ação */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:brightness-105 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg hover:brightness-110 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
