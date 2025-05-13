"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import ModalEquipment from "../../Componentes/ModalEquipment/ModalEquipment";
import EditIcon from "../../app/IMG/edit.svg";

function PageEquipamentos() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [equipamentosCadastrados, setEquipamentosCadastrados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [equipamentoEditando, setEquipamentoEditando] = useState(null);
  const [filtro, setFiltro] = useState("");

  const handleAdicionar = () => {
    setEquipamentoEditando(null);
    setModalOpen(true);
  };

  const handleEditar = (equipamento) => {
    setEquipamentoEditando(equipamento);
    setModalOpen(true);
  };

  const handleSalvar = (novoEquipamento) => {
    if (equipamentoEditando) {
      setEquipamentosCadastrados(
        equipamentosCadastrados.map((eq) =>
          eq.tipo === equipamentoEditando.tipo ? novoEquipamento : eq
        )
      );
    } else {
      setEquipamentosCadastrados([...equipamentosCadastrados, novoEquipamento]);
    }
    setModalOpen(false);
  };

  const handleRemover = () => {
    if (selectedRow !== null) {
      const novaLista = [...equipamentosCadastrados];
      novaLista.splice(selectedRow, 1);
      setEquipamentosCadastrados(novaLista);
      setSelectedRow(null);
    }
  };

  const equipamentos = [
    {
      tipo: "Coletor de Dados",
      defeitos:
        "Tela, LCD, Teclado, Gatilho, Engine, Carcaça, Vidro de Engine, Pino de Conexão +6",
    },
    {
      tipo: "Leitor Barcode",
      defeitos:
        "Tela, LCD, Teclado, Gatilho, Engine, Carcaça, Vidro de Engine, Pino de Conexão +6",
    },
  ];

  const listaExibida = (
    equipamentosCadastrados.length > 0 ? equipamentosCadastrados : equipamentos
  ).filter(
    (equipamento) =>
      equipamento.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
      equipamento.defeitos.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <div className="relative w-full h-screen flex flex-col p-4 lg:py-8 gap-3">
        <h2 className="text-2xl font-bold mb-3 mt-16 text-[#ffffff]">
          Equipamentos e Defeitos
        </h2>
        <div className="relative w-[95%] h-[2px] flex flex-col items-center bg-[#ffffff]" />
        <div className="flex-wrap flex flex-row items-center justify-center lg:justify-start gap-3 px-4 w-[90%]">
          <button
            className="flex flex-row items-center gap-2 bg-[#00ABAD] text-white font-bold px-4 rounded-md h-[36px]"
            onClick={handleAdicionar}
          >
            + Adicionar
          </button>

          <button
            className=" flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]"
            onClick={() => {
              if (selectedRow !== null && listaExibida[selectedRow]) {
                handleEditar(listaExibida[selectedRow]);
              }
            }}
            disabled={selectedRow === null}
          >
            <Image src={EditIcon} alt="Editar" width={18} height={18} />
            Editar
          </button>
          <button
            className=" flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]"
            onClick={handleRemover}
            disabled={selectedRow === null}
          >
            <span>X</span> Remover
          </button>
          <input
            type="text"
            placeholder="Filtrar"
            className=" flex flex-row items-center bg-white border-2 border-[#fff4f442] text-gray font-bold px-4 rounded-md h-[36px] w-[108px]"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="relative w-[95%] h-[2px] flex flex-col items-center bg-[#ffffff]" />
        <div className="flex flex-col items-center mt-3 py-8 ">
          <table className="text-white w-[95%] flex flex-col justify-center">
            <thead className="flex flex-col w-full justify-center">
              <tr className="flex flex-row items-center justify-start mb-2">
                <th className="w-1/2 text-left">
                  <span>Tipo de Equipamento</span>
                </th>
                <th className="w-1/2 text-left">Defeitos</th>
              </tr>
              <tr className="relative w-full h-[1px] flex flex-col items-center bg-[#ffffff62] mb-6" />
            </thead>
            <tbody className="flex flex-col gap-y-4 h-[300px] overflow-y-auto">
              {listaExibida.map((equipamento, index) => (
                <tr
                  key={index}
                  className={`flex flex-row items-center justify-start ${
                    selectedRow === index ? "bg-[#00aaad21]" : ""
                  }`}
                  onClick={() => setSelectedRow(index)}
                >
                  <td className="w-1/2 text-left flex items-center">
                    <input
                      type="radio"
                      name="selected"
                      checked={selectedRow === index}
                      onChange={() => setSelectedRow(index)}
                    />
                    <span className="ml-2">{equipamento.tipo}</span>
                  </td>
                  <td className="w-1/2 text-left">{equipamento.defeitos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
      {modalOpen && (
        <ModalEquipment
          clienteEditando={equipamentoEditando}
          isOpen={modalOpen}
          onSave={handleSalvar}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default PageEquipamentos;
