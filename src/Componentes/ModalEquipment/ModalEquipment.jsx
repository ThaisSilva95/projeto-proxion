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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full h-full justify-center items-center z-50 text-[#00ABAD]">
      <div
        className="relative w-[912px] h-[95vh] overflow-y-auto p-8 bg-white rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${BGModal.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          X
        </button>
        <h2 className="text-xl font-bold text-center mb-4 ">
          Cadastro de Equipamento e Defeitos
        </h2>

        <div className="flex flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-col justify-start w-1/2">
            <label className="text-md font-semibold mb-1" htmlFor="equipamento">
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
          <button className=" text-white font-medium text-lg bg-[#FDA417] hover:bg-[#F7B500] w-[170px] h-[36px] rounded-lg">
            Adicionar Defeito
          </button>
        </div>
        <div>
          <h2 className="text-md font-semibold mb-2">
            Selecione os defeitos possíveis:
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className=" font-semibold text-sm">Defeitos Gerais</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className=" text-sm">
                    Carcaca
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Comunicação
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className=" text-sm">
                    Software
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Configuração
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Tela
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Borracha de proteção
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Vídeo de Engine
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Teclado
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Não liga
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    trava de Bateria
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Antena RFID
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Outros
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="lack text-sm">
                    Engine
                  </label>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#00ABAD]"></div>
            <div>
              <h3 className=" font-semibold text-sm">Impressora</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className=" text-sm">
                    Cabeça de Impressão
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Sensor do Ribbon
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className=" text-sm">
                    Sensor da tampa
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Sensor da Cabeça de Impressão
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Rolete
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Cutter
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Sensor de Mídia
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Suporte Mídia
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Módulo RFID
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Rebobinador/Pell off
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Suporte Ribbon
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Trava da Tampa
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Trava da Cabeça de Impressão
                  </label>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#00ABAD]"></div>
            <div>
              <h3 className=" font-semibold text-sm">Leitores</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="accent-[#00ABAD]"
                  />
                  <label htmlFor="carcaca" className="text-sm">
                    Suporte Device
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Firmware
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className=" text-sm">
                    Led
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="engineGeral"
                    value="Engine"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="engineGeral" className="text-sm">
                    Conector de Antena
                  </label>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#00ABAD]"></div>
            <div>
              <h3 className=" font-semibold text-sm">Coletores</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="text-sm">
                    LCD
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Pinos de Conexão
                  </label>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#00ABAD]"></div>
            <div>
              <h3 className=" font-semibold text-sm">Diversos</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="text-sm">
                    Antena
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Placa
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="tela"
                    value="Tela"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="tela" className=" text-sm">
                    Comunicação Ethernet
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-[#00ABAD] hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
