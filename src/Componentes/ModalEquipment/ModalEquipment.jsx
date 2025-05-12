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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-[#00ABAD]">
      <div
        className="relative w-[912px] p-8 bg-white rounded-lg shadow-lg"
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
        <h2 className="text-2xl font-bold text-center mb-8 ">
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
          <button className=" text-white font-medium text-lg bg-[#FDA417] w-[170px] h-[36px] rounded-lg">
            Adicionar Defeito
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Selecione os defeitos possíveis:
          </h2>
          <div className="grid grid-rows-3">
            <div>
              <h3 className=" font-semibold text-md mb-1">Defeitos Gerais</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="ml-2 text-sm">
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
                  <label htmlFor="tela" className="ml-2 text-sm">
                    Tela
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className="ml-2 text-sm">
                    Não Liga
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
            <div>
              <h3 className=" font-semibold text-md mb-1">Defeitos Gerais</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="ml-2 text-sm">
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
                  <label htmlFor="tela" className="ml-2 text-sm">
                    {" "}
                    Tela
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className="ml-2 text-sm">
                    Não Liga
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

            <div>
              <h3 className=" font-semibold text-md mb-1">Defeitos Gerais</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="ml-2 text-sm">
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
                  <label htmlFor="tela" className="ml-2 te    ">
                    Tela
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className="ml-2 text-sm">
                    Não Liga
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
            <div>
              <h3 className=" font-semibold text-md mb-1">Defeitos Gerais</h3>
              <div className="grid grid-cols-4">
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="carcaca"
                    value="Carcaca"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="carcaca" className="ml-2 text-sm">
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
                  <label htmlFor="tela" className="ml-2 te  ">
                    Tela
                  </label>
                </div>
                <div className="flex gap-2 items-center justify-start mb-1">
                  <input
                    type="checkbox"
                    id="naoLiga"
                    value="Nao Liga"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="naoLiga" className="ml-2 text-sm">
                    Não Liga
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
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-[#00ABAD]"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded bg-teal-500 text-white"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
