"use client";

import Image from "next/image";
import { useState } from "react";
import BGIMG from "../IMG/BG.png";
import { Menu } from "lucide-react";
import SideBarMenu from "../../Componentes/Menu/SideBarMenu";

export default function ListaDeEquipamentos() {
  const [menuOpen, setMenuOpen] = useState(false);

  const equipamentos = [
    { tipo: "Coletor de Dados", avaliados: 0, total: 45 },
    { tipo: "Leitor Barcode", avaliados: 0, total: 15 },
    { tipo: "Impressora Industrial", avaliados: 0, total: 15 },
    { tipo: "Impressora Desktop", avaliados: 0, total: 15 },
    { tipo: "Impressora Portátil", avaliados: 0, total: 15 },
    { tipo: "Leitor Fixo RFID", avaliados: 0, total: 15 },
    { tipo: "Acess Point", avaliados: 0, total: 15 },
  ];

  return (
    <div className="fixed sm:relative z-20 h-full w-full grid grid-cols-1 sm:grid-cols-[1fr_2fr]">
      {/* Sidebar */}
      <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {!menuOpen && (
        <button
          className="absolute top-4 left-4 z-30 md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}

      {/* Conteúdo principal */}
      <div className="relative w-screen flex flex-col items-center justify-start bg-gray-100 pt-6 overflow-auto **pb-20**"> {/* Removi min-h-screen e aumentei pb */}
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={BGIMG}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Conteúdo acima da lista */}
        <div className="z-10 flex flex-col justify-between gap-3 mt-1">
          <h1 className="text-center font-bold text-3xl text-white py-0 px-4">
            Lista de Equipamentos
          </h1>

          <div className="flex justify-between items-center w-full max-w-md">
            {/* Círculo com 0% */}
            <div className="w-[96px] h-[96px] border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-xl bg-teal-800">
              0%
            </div>

            {/* Botão Selecionar Equipamento */}
            <button className="w-[154px] h-[96px] bg-teal-500 text-white rounded-lg text-center text-sm font-semibold shadow-md hover:bg-teal-600 transition">
              Selecionar<br />Equipamento
            </button>
          </div>
        </div>

        {/* Bloco da tabela */}
        <div className="z-10 bg-white/90 rounded-lg shadow-lg p-4 w-[95%] max-w-md mt-10 mb-8">
          <table className="w-full text-teal-800 text-sm">
            <thead>
              <tr className="font-semibold border-b border-teal-400">
                <th className="text-left">Tipo</th>
                <th className="text-center">Avaliados</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((item, index) => (
                <tr key={index} className="border-b border-teal-400">
                  <td className="py-2">{item.tipo}</td>
                  <td className="text-center">{item.avaliados}</td>
                  <td className="text-center">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botões de ação */}
          <div className="flex justify-between items-center mt-6">
            <button className="bg-white p-4 rounded-xl shadow-md">
              <span className="text-teal-700 text-xl">+</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-md">
              <span className="text-teal-700">🔍</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-md">
              <span className="text-teal-700">🔽</span>
            </button>
          </div>

          {/* Botão Finalizar Vistoria */}

          <button className="w-full bg-teal-500 text-white rounded-lg text-center text-sm font-semibold shadow-md hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-6">
            Finalizar Vistoria
          </button>
        </div>
      </div>
    </div>
  );
}