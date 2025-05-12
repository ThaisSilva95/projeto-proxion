'use client';

import Image from 'next/image';
import logokenvue from '../../../public/img/logokenvue.png';
import logoproxion from '../../../public/img/logoproxion.png';

export default function Graficos({ dadosResumo, dadosPorTipo }) {
  const total = dadosResumo.reduce((acc, item) => acc + item.valor, 0);
  const maxGraficoAltura = 150; // Altura máxima das barras
  const maiorValor = Math.max(...dadosPorTipo.map(item => item.valor));

  return (
    <div className="w-full h-full flex flex-col justify-between">

      <div className="flex justify-between items-start mb-6">
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

      <div className="mt-0 mb-4">
        <h1 className=" font-semibold mb-2 h-8 border-b-2">Visão Geral</h1>
        <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto flex items-center justify-center relative mt-10 mb-10">
          <span className="text-lg font-bold">{total} Total</span>
         
        </div>
      </div>

      <div className="mb-6">
        <h1 className="font-semibold mb-2 h-8 border-b-2">Visão por Tipo de Equipamento</h1>

        <div className="w-full flex flex-col items-center">

          <div className="w-full flex items-end gap-4 h-40 mt-24">
            {dadosPorTipo.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <span className="text-sm font-semibold mb-1 text-gray-400">{item.valor}</span>

                <div
                  className="w-full bg-blue-500"
                  style={{
                    height: `${(item.valor / maiorValor) * maxGraficoAltura}px`
                  }}
                />

              </div>
            ))}
          </div>

          <div className="w-full border-t-2 border-gray-200 mt-2"></div>

          
          <div className="w-full flex justify-between text-center mt-2">
            {dadosPorTipo.map((item, index) => (
              <span key={index} className="w-full text-sm font-semibold text-gray-400">{item.tipo}</span>
            ))}
          </div>
        </div>

      </div>

      <p className='text-xs mb-2'>
        » Em Produção: Equipamento, em operação, sem defeitos encontrados. <br />
        » Disponível: Equipamento funcionando mas não está sendo utilizado. <br />
        » Danificado: Equipamento com avarias que estão prejudicando a operação. <br />
        » Em Manutenção: Equipamento não encontrava-se disponível pois está sendo reparado em laboratório. <br />
        » Indisponível: Equipamento não encontrava-se disponível para preventiva no dia marcado para realização do serviço.
      </p>


      <div className="flex items-start border-t pt-6 text-xs text-gray-600 gap-5">
        <img
          src='/img/logoproxion.png'
          alt="Topo"
          loading="eager"
          style={{ width: '10%', height: '100%', display: 'block' }}
        />
        <p>
          Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP -
          CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
        </p>

      </div>
    </div >
  );
}