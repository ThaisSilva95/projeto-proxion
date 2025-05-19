"use client";

import Image from "next/image";
import logo from "../IMG/LOGOBG.png";

export default function PaginaParabens() {
  return (
    <div className="relative z-10 flex flex-col flex-1 items-center justify-center h-full p-4 text-white max-w-full overflow-y-auto mt-0">
      <div className="flex items-center gap-5">
        <div className="mb-20 ">
          <Image src={logo} alt="logo" width={180} height={100} />
        </div>
      </div>
      <div className="items-center text-center my-2">
        <p className="text-3xl font-bold mb-3">Parabéns !</p>
        <p className="text-3xl font-bold mb-5"> Vistoria Finalizada</p>
      </div>

      <div className="flex flex-col gap-4 items-center mt-0 w-full max-w-xl">
        <button
          type="submit"
          className="mt-6  w-60 bg-white text-[#00abae] font-bold py-3 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center"
        >
          Exportar CSV
        </button>

        <button
          type="submit"
          className="mt-6 w-60 bg-white text-[#00abae] font-bold py-3 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center"
        >
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}
