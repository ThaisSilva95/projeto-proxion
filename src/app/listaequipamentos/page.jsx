"use client";

import { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import FiltroModal from "../../Componentes/ModalFilter/filtromodal";
import Link from "next/link";
import ModalSaida from '../../Componentes/ModalSaida/modalsaida';
import { useSearchParams } from 'next/navigation';

export default function ListaDeEquipamentos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalSaidaAberto, setModalSaidaAberto] = useState(false);
  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [empresaInfo, setEmpresaInfo] = useState({
    cliente: '',
    unidade: '',
    subLocal: ''
  });
  
  const searchParams = useSearchParams();
  const cliente = searchParams.get('cliente');
  const unidade = searchParams.get('unidade');
  const subLocal = searchParams.get('subLocal');
  
  useEffect(() => {
    if (cliente && unidade) {
      setEmpresaInfo({
        cliente,
        unidade,
        subLocal: subLocal || ''
      });

      buscarEquipamentos(cliente, unidade, subLocal);
    } else {
      setErro("Informações da empresa não fornecidas na URL");
      setCarregando(false);
    }
  }, [cliente, unidade, subLocal]);
  
  // Função para buscar equipamentos da API
  const buscarEquipamentos = async (cliente, unidade, subLocal) => {
    console.log("🔍 Buscando para:", cliente, unidade, subLocal);
    
    try {
      setCarregando(true);
      setEquipamentos([]); // Limpar os equipamentos antes de uma nova busca
      
      // Construir a URL da API com os parâmetros
      let url = `/api/equipamentos/lista?cliente=${encodeURIComponent(cliente)}&unidade=${encodeURIComponent(unidade)}`;
      if (subLocal) {
        url += `&subLocal=${encodeURIComponent(subLocal)}`;
      }
      
      console.log("🔍 URL da requisição:", url);
      
      const resposta = await fetch(url);
      
      if (!resposta.ok) {
        throw new Error(`Erro ao buscar equipamentos: ${resposta.status}`);
      }
      
      const dados = await resposta.json();
      
      // Processar os dados recebidos
      if (Array.isArray(dados)) {
        console.log("Dados recebidos:", dados);
        setEquipamentos(dados);
      } else if (dados.error) {
        setErro(dados.error);
      } else if (dados.resultado && Array.isArray(dados.resultado)) {
        console.log("Dados recebidos na propriedade resultado:", dados.resultado);
        setEquipamentos(dados.resultado);
      } else {
        setErro("Formato de dados inesperado da API");
      }
    } catch (erro) {
      console.error("Erro ao buscar equipamentos:", erro);
      setErro(`Não foi possível carregar os equipamentos: ${erro.message}`);
      
      // Não usamos dados de fallback, apenas deixamos a lista vazia
      setEquipamentos([]);
    } finally {
      setCarregando(false);
    }
  };
  
  // Cálculo do total e percentual
  const totalEquipamentos = equipamentos.reduce(
    (acc, curr) => {
      return {
        avaliados: acc.avaliados + (curr.avaliados || 0),
        total: acc.total + (curr.total || 0),
      };
    },
    { avaliados: 0, total: 0 }
  );

  const percentual =
    totalEquipamentos.total > 0
      ? Math.round((totalEquipamentos.avaliados / totalEquipamentos.total) * 100)
      : 0;

  const chartData = [{ name: "Progresso", value: percentual, fill: "#14b8a6" }];

  // Lidar com filtro
  const aplicarFiltro = (filtros) => {
    // Implementar a lógica de filtragem aqui
    console.log("Filtros aplicados:", filtros);
    
    // Exemplo: Buscar novamente com os filtros
    const { cliente, unidade, subLocal } = empresaInfo;
    buscarEquipamentos(cliente, unidade, subLocal);
  };

  return (
    <div className="relative w-screen flex flex-col items-center bg-gray-100 pt-6 overflow-auto z-10 bg-transparent pb-20 md:justify-center">
      {/* Informações da empresa selecionada */}
      {empresaInfo.cliente && (
        <div className="z-10 text-white text-center mb-2">
          <p className="font-medium">
            {empresaInfo.cliente} - {empresaInfo.unidade}
            {empresaInfo.subLocal && ` - ${empresaInfo.subLocal}`}
          </p>
        </div>
      )}

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
            <Link 
              href={`/selecionarequipamento?cliente=${empresaInfo.cliente}&unidade=${empresaInfo.unidade}${empresaInfo.subLocal ? `&subLocal=${empresaInfo.subLocal}` : ''}`}
            >
              Selecionar
              <br />
              Equipamento
            </Link>
          </button>
        </div>
      </div>
      
      {/* Bloco da tabela */}
      <div className="z-10 bg-white/70 rounded-lg shadow-lg p-4 w-[95%] max-w-md mt-10 mb-8">
        {carregando ? (
          <div className="text-center py-8">
            <p>Carregando equipamentos...</p>
          </div>
        ) : erro ? (
          <div className="text-center py-8 text-red-500">
            <p>{erro}</p>
            <button 
              onClick={() => buscarEquipamentos(empresaInfo.cliente, empresaInfo.unidade, empresaInfo.subLocal)} 
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
            >
              Tentar novamente
            </button>
          </div>
        ) : equipamentos.length === 0 ? (
          <div className="text-center py-8">
            <p>Nenhum equipamento encontrado para esta empresa.</p>
          </div>
        ) : (
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
        )}

        {/* Botões de ação */}
        <div className="flex justify-between items-center mt-6">
          <button className="bg-white px-10 py-3 rounded-xl shadow-md">
            <span className="text-teal-700 text-xl">+</span>
          </button>
          <button className="bg-white px-10 py-3 rounded-xl shadow-md">
            <span className="text-teal-700">🔍</span>
          </button>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-white px-10 py-3 rounded-xl shadow-md">
            <span className="text-teal-700">Filtro</span>
          </button>
          <FiltroModal 
            isOpen={modalAberto} 
            onClose={() => setModalAberto(false)} 
            onAplicar={aplicarFiltro}
          />
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