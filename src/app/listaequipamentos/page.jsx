"use client";

import Image from "next/image";
import { useState } from "react";
import BGIMG from "../IMG/BG.png";
import { Menu } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import FiltroModal from "../../Componentes/ModalFilter/filtromodal";
import Link from "next/link";
import ModalSaida from '../../Componentes/ModalSaida/modalsaida'



export default function ListaDeEquipamentos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalSaidaAberto, setModalSaidaAberto] = useState(false);


  const equipamentos = [
    { tipo: "Coletor de Dados", avaliados: 0, total: 45 },
    { tipo: "Leitor Barcode", avaliados: 0, total: 15 },
    { tipo: "Impressora Industrial", avaliados: 0, total: 15 },
    { tipo: "Impressora Desktop", avaliados: 0, total: 15 },
    { tipo: "Impressora Portátil", avaliados: 0, total: 15 },
    { tipo: "Leitor Fixo RFID", avaliados: 0, total: 15 },
    { tipo: "Acess Point", avaliados: 0, total: 15 },
  ];

  const totalEquipamentos = equipamentos.reduce(
    (acc, curr) => {
      return {
        avaliados: acc.avaliados + curr.avaliados,
        total: acc.total + curr.total,
      };
    },
    { avaliados: 0, total: 0 }
  );

  const percentual =
    totalEquipamentos.total > 0
      ? Math.round((totalEquipamentos.avaliados / totalEquipamentos.total) * 100)
      : 0;

  const chartData = [{ name: "Progresso", value: percentual, fill: "#14b8a6" }];

  return (
    <div className="relative w-screen flex flex-col items-center  bg-gray-100 pt-6 overflow-auto z-10 bg-transparent pb-20 md:justify-center">

      {/* Conteúdo acima da lista */}
      <div className="z-10 flex flex-col justify-between gap-3 mt-1">
        <h1 className="text-center font-bold text-3xl text-white py-5 px-4">
          Lista de Equipamentos
        </h1>

        <div className="flex justify-between items-center w-full max-w-md">
          {/* Gráfico de progresso */}
          <div className="relative w-[150px] h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
              {percentual}%
            </div>
          </div>

          {/* Botão Selecionar Equipamento */}
          <button className="w-[154px] h-[96px] bg-teal-500 text-white rounded-lg text-center text-l font-bold shadow-md hover:bg-teal-600 transition">
            <Link href="/selecionarequipamento">
              Selecionar
              <br />
              Equipamento
            </Link>
          </button>
        </div>
      </div>
      {/* Bloco da tabela */}
      <div className="z-10 bg-white/70 rounded-lg shadow-lg p-4 w-[95%] max-w-md mt-10 mb-8">
        <table className="w-full text-teal-800 text-sm">
          <thead>
            <tr className="font-semibold border-b border-teal-400">
              <th className="text-left">Tipo Equipamento</th>
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
          <button className="bg-white px-10  py-3 rounded-xl shadow-md">
            <span className="text-teal-700 text-xl">+</span>
          </button>
          <button className="bg-white px-10  py-3 rounded-xl shadow-md">
            <span className="text-teal-700">🔍</span>
          </button>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-white px-10  py-3 rounded-xl shadow-md">
            <span className="text-teal-700">Filtro</span>
          </button>
          <FiltroModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
        </div>

        {/* Botão Finalizar Vistoria */}

        <button
          onClick={() => setModalSaidaAberto(true)}
          className="bg-teal-500 text-white rounded-lg py-3 px-6 mt-8 w-full"
        >
          Finalizar Vistoria
        </button>

        {/* Modal de horário de saída */}
        <ModalSaida
          isOpen={modalSaidaAberto}
          onClose={() => setModalSaidaAberto(false)}
        />

      </div>
    </div>
  );
}
