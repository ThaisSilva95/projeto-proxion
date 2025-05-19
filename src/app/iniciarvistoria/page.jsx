"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import avatar from "../IMG/Avatar.png";
import logo from "../IMG/LOGOBG.png";
import Link from "next/link";
import Button from "../../Componentes/Button/Button";


export default function HomeInspection() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const agora = new Date();
    setData(agora.toISOString().split("T")[0]);
    setHora(agora.toTimeString().slice(0, 5));
  }, []);

  return (
    <div className="relative z-10 flex flex-col flex-1 justify-center items-center p-4 text-white max-w-full overflow-y-auto">
      <div className="flex items-center gap-5 mb-10">
        <Image
          src={avatar}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-[32px] md:text-4xl font-bold">Fulano Silva</p>
          <p className="text-[22px]">Analista</p>
        </div>
      </div>

      <div className="flex flex-col gap-10 items-center max-w-xl ">
        <div className="text-center w-full">
          <p className="text-white text-[22px] font-semibold">Data</p>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="text-[#00A7B2] px-6 py-3 rounded-md text-[22px] text-center font-semibold shadow mt-2 w-[250px] max-w-xs"
          />
        </div>

        <div className="text-center w-full">
          <p className="text-white text-[22px] font-semibold">
            Horário de Chegada
          </p>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="text-[#00A7B2] px-6 py-3 rounded-md text-[22px] text-center font-semibold shadow mt-2 w-[250px] max-w-xs"
          />
        </div>

        <Link href="/selecionarempresa">
          <Button textButton="Iniciar vistoria"></Button>
        </Link>
      </div>

     
    </div>
  );
}
