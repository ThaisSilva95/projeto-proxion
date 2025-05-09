'use client';

import Image from 'next/image';
import logokenvue from '../../../public/img/logokenvue.png';
import logoproxion from '../../../public/img/logoproxion.png';

export default function Graficos() {
  return (
    <div className="pagina bg-white flex flex-col items-center justify-between min-h-screen h-auto  relative">

      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="font-bold text-lg text-gray-600" >Manutenção Preventiva</h1>
          <p className="text-sm text-gray-600 ">Relatório dos Serviços Executados</p>
        </div>
        <Image src={logokenvue} alt="Logo Kenvue" width={150} height={0} priority className='no-break'/>
      </div>

      {/* Conteúdo (iremos montar aqui aos poucos...) */}
      <div className="flex-grow">
        {/* Gráficos e legendas entram aqui depois */}
        <p className="text-center text-gray-400 mt-40">[Gráficos mock virão aqui]</p>
      </div>

      <div className="flex items-start border-t pt-4 text-xs text-gray-600 no-break">
        <Image src={logoproxion} alt="Proxion Logo" width={60} height={0} priority className="mr-4" />
        <p>
          Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP<br />
          CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
        </p>
        <span className="ml-auto font-semibold text-sm">2</span>
      </div>
    </div>
  );
}