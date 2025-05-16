"use client";
import Image from "next/image";
import { useState } from "react";
import InputMask from "react-input-mask";
import avatar from "../IMG/Avatar.png";
import Upload from "../IMG/Upload.svg";
import Button from '../../Componentes/Button/Button'

// file script
export default function ChangeProfile() {
  const [ArquivoName, setArquivoName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const handleArquivo = (e) => {
    const arquivo = e.target.files[0];
    const arquivoNameV = arquivo.name;
    if (arquivoNameV) {
      setArquivoName(arquivoNameV);
    } else {
      setArquivoName("");
    }
  };
  const handleOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const arquivo = e.dataTransfer.files[0];
    if (arquivo) {
      setArquivoName(arquivo.name);
    }
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative z-10 flex flex-col flex-1 justify-center items-center text-white overflow-y-auto mb-10" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div className=" flex justify-center items-center gap-x-5 mb-6 w-full mt-20 md:mt-0">
        <div className="w-28 h-28 rounded-full mt-10 relative overflow-hidden md:mt-1">
          
          <Image
            src={avatar}
            alt="Avatar"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />

          
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2l-6 6m2-6H9v3m0 3h3v3" />
            </svg>
          </div>

          
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              
            }}
          />
        </div>

        <div className="mt-5">
          <h1 className="text-white font-bold text-lg capitalize">
            Fulano da silva
          </h1>
          <h2 className="text-white font-light text-l capitalize">analista</h2>
        </div>
      </div>

      <form
        action=""
        className="flex flex-col w-auto itens-center justify-center mx-auto gap-4"
      >
        <label className="w-auto">
          <span className="block text-white font-normal capitalize pl-2">
            nome completo
          </span>
          <input
            type="text"
            className="w-[350px] h-[42px] bg-white rounded-md pl-2 text-sky-500  outline-sky-500"
          />
        </label>

        <label className="w-auto">
          <span className="block text-white font-normal uppercase pl-2">
            cpf
          </span>
          <InputMask
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            className="w-[350px] h-[42px] bg-white rounded-md pl-2 text-sky-500 outline-sky-500"
          />
        </label>

        <label className="w-auto">
          <span className="block text-white font-normal capitalize pl-2">
            Usuário
          </span>
          <input
            type="text"
            className="w-[350px] h-[42px] bg-white rounded-md pl-2 text-sky-500 outline-sky-500"
          />
        </label>
        <label className="w-auto">
          <span className="block text-white font-normal capitalize pl-2">
            Senha
          </span>
          <input
            type="text"
            className="w-[350px] h-[42px] bg-white rounded-md text-sky-500 pl-2 outline-sky-500"
          />
        </label>



        <div className="mb-5">
          <h2 className="block text-white font-normal capitalize pl-2">
            assinatura
          </h2>
          <label
            htmlFor="arquivo"
            onDragOver={handleOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            className={`w-[350px] h-[120px] bg-white rounded-md border-4 border-dashed border-gray-400 cursor-pointer transition flex flex-col justify-center items-center gap-2 p-5 ${isDragging
              ? "bg-blues-500 border-white"
              : "bg-white border-gray-400 cursor-pointer"
              }`}
          >
            <input
              type="file"
              id="arquivo"
              className="hidden"
              onChange={handleArquivo}
            />
            <Image src={Upload} width={30} height={30} />


          </label>
        </div>
      </form>

      <Button textButton="Alterar Perfil">

      </Button>
    </div>
  );
}
