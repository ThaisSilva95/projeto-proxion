"use client";

import { useState } from "react";
import Image from "next/image";
import Pen from "../IMG/Pen.svg";
import ModalUser from '../../Componentes/ModalUser/modaluser';

export default function RegisteredAnalysts() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [analistas, setAnalistas] = useState([
    { nome: "Amanda", cpf: "000.000.000-00", usuario: "fulano", senha: "********", assinatura: "", foto: "" },
    { nome: "João", cpf: "000.000.000-00", usuario: "fulano", senha: "********", assinatura: "", foto: "" },
    { nome: "Maria", cpf: "000.000.000-00", usuario: "fulano", senha: "********", assinatura: "", foto: "" },
    { nome: "Antonio", cpf: "000.000.000-00", usuario: "fulano", senha: "********", assinatura: "", foto: "" },
  ]);

  const handleRemover = () => {
    if (selectedRow !== null) {
      const novaLista = analistas.filter((_, i) => i !== selectedRow);
      setAnalistas(novaLista);
      setSelectedRow(null);
    }
  };

  const handleSalvar = (analista, isEdit) => {
    if (isEdit && selectedRow !== null) {
      const atualizados = analistas.map((a, i) => (i === selectedRow ? analista : a));
      setAnalistas(atualizados);
    } else {
      setAnalistas([...analistas, analista]);
    }
    setShowModal(false);
    setEditando(null);
    setSelectedRow(null);
  };

  return (
    <div className="h-auto p-8 text-white z-10 mt-7 w-full">
      <h2 className="text-2xl font-bold mb-10 mt-6 text-white">Usuários Cadastrados</h2>

      <div className="flex-wrap flex flex-row items-center justify-center lg:justify-start gap-3 px-4 w-[90%] mb-6 mt-5">
        <button
          onClick={() => {
            setEditando(null);
            setShowModal(true);
          }}
          className="flex flex-row items-center gap-2 bg-[#00ABAD] text-white font-bold px-4 rounded-md h-[36px]">
          + Adicionar
        </button>

        <button
          onClick={() => {
            if (selectedRow !== null) {
              setEditando(analistas[selectedRow]);
              setShowModal(true);
            }
          }}
          disabled={selectedRow === null}
          className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]">
          <Image src={Pen} alt="Editar" width={18} height={18} />
          Editar
        </button>

        <button
          onClick={handleRemover}
          className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]"
          disabled={selectedRow === null}
        >
          <span>X</span> Remover
        </button>

        <input
          type="text"
          placeholder="Filtrar"
          className="bg-white border-2 border-[#fff4f442] text-teal-700 font-bold px-4 rounded-md h-[36px] w-[108px]"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <table className="table-fixed w-full text-white border border-white/10 border-collapse mb-20">
          <thead className="bg-teal-700">
            <tr>
              <th className="w-[4%] px-2 py-2 border border-white/10"></th>
              <th className="w-[20%] text-left px-2 py-2 border border-white/10">Nome</th>
              <th className="w-[20%] text-left px-2 py-2 border border-white/10">CPF</th>
              <th className="w-[15%] text-left px-2 py-2 border border-white/10">Usuário</th>
              <th className="w-[15%] text-left px-2 py-2 border border-white/10">Senha</th>
              <th className="w-[20%] text-left px-2 py-2 border border-white/10">Assinatura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20 pb-8">
            {analistas
              .filter((a) => a.nome.toLowerCase().includes(filtro.toLowerCase()))
              .map((a, index) => (
                <tr
                  key={index}
                  className={`hover:bg-[#00aaad21] cursor-pointer ${selectedRow === index ? "bg-[#00aaad21]" : ""}`}
                  onClick={() => setSelectedRow(index)}
                >
                  <td className="px-2 py-2">
                    <input
                      type="radio"
                      name="selected"
                      checked={selectedRow === index}
                      onChange={() => setSelectedRow(index)}
                    />
                  </td>
                  <td className="px-2 py-2 border border-white/10">{a.nome}</td>
                  <td className="px-2 py-2 border border-white/10">{a.cpf}</td>
                  <td className="px-2 py-2 border border-white/10">{a.usuario}</td>
                  <td className="px-2 py-2 border border-white/10">{a.senha}</td>
                  <td className="px-2 py-2 border border-white/10">
                    <button className="bg-white text-teal-700 px-4 py-1 rounded-md font-bold">
                      {a.assinatura ? "Assinatura enviada" : "Sem assinatura"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ModalUser
          onClose={() => {
            setShowModal(false);
            setEditando(null);
          }}
          onSave={handleSalvar}
          analistaEditando={editando} // <-- Dados passados corretamente
        />
      )}
    </div>
  );
}
