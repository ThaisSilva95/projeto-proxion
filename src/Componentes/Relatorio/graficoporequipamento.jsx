'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function GraficoPorEquipamento({ dadosPorEquipamento }) {
  const coresStatus = {
    'Danificado': '#FFCC00',
    'Em Produção': '#2CB1B7',
    'Disponível': '#404040',
    'Manutenção': '#1F4E78',
    'Indisponível': '#D3D3D3'
  };

  const statusList = Object.keys(coresStatus);
  const labels = (dadosPorEquipamento ?? []).map(item => item.equipamento);

  const datasets = statusList.map(status => ({
    label: status,
    data: dadosPorEquipamento.map(equip => {
      const sub = equip.substatus.find(s => s.status === status);
      return sub ? sub.valor : 0;
    }),
    backgroundColor: coresStatus[status],
    datalabels: {
      color: function(context) {
        return context.dataset.backgroundColor;
      },
      font: {
        size: 10,
        weight: 'bold'
      },
      anchor: 'end',
      align: 'top',
      formatter: value => value // mostra até o zero
    }
  }));

  // Calcular o valor máximo em todos os datasets para definir o limite do eixo Y
  const maxValue = useMemo(() => {
    let max = 0;
    datasets.forEach(dataset => {
      dataset.data.forEach(value => {
        if (value > max) max = value;
      });
    });
    return max;
  }, [datasets]);

  const data = useMemo(() => ({
    labels,
    datasets
  }), [dadosPorEquipamento]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
         enabled: false 
      },
      datalabels: {
        display: true
      }
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: maxValue + 1, // Adiciona uma linha extra ao máximo
        ticks: {
          font: {
            size: 10
          },
          // Garante que sempre teremos um espaço adicional
          callback: function(value, index, values) {
            if (index === values.length - 1) {
              // Se for o último tick, adicione um extra
              return value;
            }
            return value;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-md font-semibold text-gray-600 mb-4">Visão por Tipo de Equipamento</h2>
      <div className="w-full max-w-5xl mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}