'use client';

import Image from 'next/image';
import logokenvue from '../../../public/img/logokenvue.png';
import logoproxion from '../../../public/img/logoproxion.png';
import GraficoPorEquipamento from './graficoporequipamento'
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);


export default function Graficos({ dadosPorTipo, dadosPorEquipamento }) {

  const maxGraficoAltura = 150;
  const maiorValor = Math.max(...dadosPorTipo.map(item => item.valor));

  const danificado = dadosPorTipo.find(item => item.tipo === 'Danificado');
  const leve = danificado?.subcategorias.find(sub => sub.nivel === 'Leve')?.valor || 0;
  const medio = danificado?.subcategorias.find(sub => sub.nivel === 'Médio')?.valor || 0;
  const grave = danificado?.subcategorias.find(sub => sub.nivel === 'Grave')?.valor || 0;
  const options = {
    rotation: 20 * Math.PI,
    plugins: {
      legend: {
        display: false, // remove a legenda
      },
      tooltip: {
        enabled: false, // desativa o tooltip ao passar o mouse
      },
      datalabels: {
        color: 'white',
        font: {
          weight: 'semibold',
          size: 8,
        },
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`;
        },
      },
    },
  };

  const dataPrincipal = {
    labels: dadosPorTipo.map(item => item.tipo),
    datasets: [
      {
        data: dadosPorTipo.map(item => item.valor),
        backgroundColor: [
          '#FFCC00', // Danificado
          '#2CB1B7', // Em Produção
          '#404040', // Disponível
          '#1F4E78', // Em Manutenção
          '#D3D3D3', // Indisponível

        ],
        borderWidth: 1,
      },
    ],
  };


  const dataDanificados = {
    labels: ['Leve', 'Médio', 'Grave'],
    datasets: [
      {
        data: [leve, medio, grave],
        backgroundColor: ['#FF7B00', '#FF1919', '#8E0000'],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div className="w-full h-full flex flex-col justify-between">

      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="font-bold text-lg text-gray-600" >Manutenção Preventiva</h1>
          <p className="text-sm text-gray-600 ">Relatório dos Serviços Executados</p>
        </div>
        <img
          src='/img/logokenvue.png'
          alt="Topo"
          loading="eager"
          style={{ width: '25%', height: 'auto', display: 'block' }}
        />
      </div>

      <div className="w-full h-6 bg-gray-700 flex items-center justify-center">
        <p className="text-white text-sm relative -top-2">
          Resumo
        </p>
      </div>

      <div className='w-full text-gray text-xs font-regular py-1 px-2 mt-2 mb-3 flex items-center justify-between'>
        <span className='flex-1 text-center h-6 border-b-4 border-[#2CB1B7] mx-1'>Em Produção</span>
        <span className='flex-1 text-center h-6 border-b-4 border-[#404040] mx-1'>Disponível</span>
        <span className='flex-1 text-center h-6 border-b-4 border-[#1F4E78] mx-1'>Em Manutenção</span>
        <span className='flex-1 text-center h-6 border-b-4 border-[#FFCC00] mx-1'>Danificado</span>
      </div>


      <div className=' flex justify-end text-xs mb-2 mr-1.5'>
        <div className='flex items-center gap-1'>
          <div className='w-[50px] h-6 text-center border-b-4 border-[#FF7B00] mx-1 '>
            <span>Leve</span>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='w-[52px] h-6 text-center border-b-4 border-[#FF1919] mx-1 '>
            <span>Médio</span>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='w-[50px] h-6 text-center border-b-4 border-[#8E0000] mx-1 '>
            <span>Grave</span>
          </div>
        </div>
      </div>

      <div className=" mb-1">
        <h1 className="font-semibold mb-2 h-8 border-b-2">Visão Geral</h1>

        <div className="relative flex justify-center items-center gap-12 mt-6 mb-6">

          {/* Gráfico de Pizza MAIOR */}
          <div className="w-60 h-60">
            <Pie data={dataPrincipal} options={options} />
          </div>

          {/* Linha de Conexão */}
          <div className="absolute left-1/2 top-1/2 w-14 border-t-2 border-gray-300 rotate-[25deg] translate-x-12 -translate-y-4"></div>

          {/* Gráfico Empilhado MENOR */}
          {danificado && (
            <div className="flex flex-col items-center">

              <div className="w-20 h-36 flex flex-col justify-end shadow-md rounded overflow-hidden border border-gray-300">
                {[
                  { label: 'Grave', value: grave, color: '#8E0000' },
                  { label: 'Médio', value: medio, color: '#FF1919' },
                  { label: 'Leve', value: leve, color: '#FF7B00' },
                ].map((item, index) => {
                  const totalEquipamentos = dadosPorTipo.reduce((sum, tipo) => sum + tipo.valor, 0);
                  const heightPercent = (item.value / (leve + medio + grave || 1)) * 100; // Altura proporcional só entre danificados
                  const percentTotal = ((item.value / totalEquipamentos) * 100).toFixed(0); // Texto com base no total

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center text-white text-[8px] font-semibold  "
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: item.color,
                      }}
                    >
                      {item.value > 0 && `${Math.round((item.value / totalEquipamentos) * 100)}%`}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-2">
        <GraficoPorEquipamento dadosPorEquipamento={dadosPorEquipamento} />
      </div>

      <div className="w-full border-t-2 border-gray-200"></div>


      <p className='text-xs mb-2'>
        » Em Produção: Equipamento, em operação, sem defeitos encontrados. <br />
        » Disponível: Equipamento funcionando mas não está sendo utilizado. <br />
        » Danificado: Equipamento com avarias que estão prejudicando a operação. <br />
        » Em Manutenção: Equipamento não encontrava-se disponível pois está sendo reparado em laboratório. <br />
        » Indisponível: Equipamento não encontrava-se disponível para preventiva no dia marcado para realização do serviço.
      </p>


      <div className="w-full mt-4 pt-2 border-t border-gray-300" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex items-center text-xs text-gray-600 gap-3">
          <img
            src='/img/logoproxion.png'
            alt="Logo Proxion"
            loading="eager"
            style={{ width: '10%', height: 'auto', display: 'block' }}
          />
          <p>
            Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP -
            CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
          </p>
        </div>
      </div>
    </div>
  );
}