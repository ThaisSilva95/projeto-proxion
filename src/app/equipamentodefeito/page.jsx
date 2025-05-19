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
        <h2 className="text-2xl font-bold mb-10 mt-6 text-[#ffffff]">
          Equipamentos e Defeitos
        </h2>
       
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
            className=" flex flex-row items-center bg-white border-2 border-[#fff4f442] text-teal-700 font-bold px-4 rounded-md h-[36px] w-[108px]"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
       
        <div className="flex flex-col items-center mt-3 py-8 ">
          <table className="table-fixed w-full text-white border border-white/10 border-collapse mb-20">
            <thead className="bg-teal-700">
              <tr className="">
                <th className="w-[1%] px-2 py-2 border border-white/10"></th>
                <th className="w-[10%] text-left px-2 py-2 border border-white/10">Tipo de Equipamento</th>
                <th className="w-[20%] text-left px-2 py-2 border border-white/10">Defeitos</th>
              </tr>
              
            </thead>
            <tbody className="divide-y divide-white/20 pb-8">
              {listaExibida.map((equipamento, index) => (
                <tr
                  key={index}
                  className={`hover:bg-[#00aaad21] cursor-pointer ${selectedRow === index ? "bg-[#00aaad21]" : ""}`}
                  onClick={() => setSelectedRow(index)}
                >
                  <td className="px-4 py-2">
                    <input
                      type="radio"
                      name="selected"
                      checked={selectedRow === index}
                      onChange={() => setSelectedRow(index)}
                    />
                     </td>
                    <td className="px-2 py-2 border border-white/10">{equipamento.tipo}</td>
                  
                  <td className="px-2 py-2 border border-white/10">{equipamento.defeitos}</td>
                 
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
