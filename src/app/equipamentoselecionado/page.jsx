"use client";

import React, { useState } from "react";
import Button from "../../Componentes/Button/Button";

const EquipmentStatusForm = () => {
  const [status, setStatus] = useState("");
  const [defectType, setDefectType] = useState("");
  const [intensity, setIntensity] = useState("");

  const statusOptions = [
    "Produção",
    "Indisponível",
    "Danificado",
    "Disponível",
    "Manutenção",
  ];
  const defectOptions = [
    "Engine",
    "Carcaça",
    "Tela",
    "Comunicação",
    "Configuração",
    "Não Liga",
  ];
  const intensityOptions = ["Leve", "Médio", "Grave"];

  return (
    <div className="relative z-10 flex flex-col flex-1 items-center justify-between h-full p-4 text-white max-w-full overflow-y-auto mt-5">
      <div className="max-w-4xl text-white p-6 space-y-4">
        <div className="text-center rounded-lg bg-white bg-opacity-50 shadow-lg p-3">
          <p>Equipamento: Leitor Barcode</p>
          <p>Modelo: DS4308</p>
          <p>Nº de série: 54212274680</p>
        </div>

        <div>
          <p className="font-semibold text-[24px] text-center">
            Status Atual: Produção
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Informe novo status
          </label>
          <select
            className="w-full p-2 rounded text-[#00ABAD]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione...</option>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {status === "Danificado" && (
          <>
            <div>
              <label className="block mt-4 mb-2 font-semibold">
                Selecionar defeito
              </label>
              <select
                className="w-full p-2 rounded text-[#00ABAD]"
                value={defectType}
                onChange={(e) => setDefectType(e.target.value)}
              >
                <option value="">Selecione o defeito...</option>
                {defectOptions.map((defect) => (
                  <option key={defect} value={defect}>
                    {defect}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mt-4 mb-2 font-semibold">
                Intensidade do dano
              </label>
              <select
                className="w-full p-2 rounded text-[#00ABAD]"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
              >
                <option value="">Selecione a intensidade...</option>
                {intensityOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block mt-4 mb-2 font-semibold">
            Notas do Equipamento
          </label>
          <textarea
            className="w-full p-2 text-[#00ABAD] rounded"
            rows={3}
          ></textarea>
        </div>

        <Button textButton="Equipamento Vistoriado" type="submit" />
      </div>
    </div>
  );
};

export default EquipmentStatusForm;
