"use client";

import React from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import InputFile from "../../Componentes/InputFile/InputFile";
import Button from "../../Componentes/Button/Button";

function InportInspection() {
  return (
    <div className="justify-between text-center relative w-screen h-screen flex  flex-col items-center py-4 lg:py-16 px-10  gap-3">
      <h2 className="w-64 text-2xl font-bold mb-3 mt-16 lg:mt-16 text-[#ffffff]">
        Faça a importação da última vistoria
      </h2>
      <form
        action=""
        className="flex flex-col w-[300px] justify-center items-center mb-[170px] lg:mb-0 lg:justify-between lg:h-[370px]"
      >
        <InputFile />
        <Button textButton="Próximo" />
      </form>
      <Image
        src={Logo}
        alt="Error"
        className="fixed bottom-2 max-w-[100px] mx-auto mt-8 mb-8  lg:hidden"
      />
    </div>
  );
}

export default InportInspection;
