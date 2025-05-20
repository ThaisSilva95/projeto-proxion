"use client";

import { useState } from "react";
import Image from "next/image";
import LogoJNJ from "../IMG/Logo-jnj.png";
import LogoKenvue from "../../../public/img/logokenvue.png";
import Pen from "../IMG/Pen.svg";
import ClienteModal from "../../Componentes/ModalCompanies/customer-registration";

export default function RegisteredCompanies() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleAdicionar = () => {
    setClienteEditando(null);
    setModalOpen(true);
  };

  const handleEditar = (cliente) => {
    setClienteEditando(cliente);
    setModalOpen(true);
  };

  const handleSalvar = (novoCliente) => {
    if (clienteEditando) {
      setClientes(
        clientes.map((c) =>
          c.codigoCliente === clienteEditando.codigoCliente ? novoCliente : c
        )
      );
    } else {
      setClientes([...clientes, novoCliente]);
    }
    setModalOpen(false);
  };

  const handleRemover = () => {
    const listaAtual = clientes.length > 0 ? clientes : empresas;

    if (selectedRow !== null) {
      const novaLista = [...listaAtual];
      novaLista.splice(selectedRow, 1);
      setClientes(novaLista);
      setSelectedRow(null);
    }
  };

  const [filtro, setFiltro] = useState("");

  const empresas = [
  {
    cliente: "KNV",
    unidade: "SJC",
    sublocal: "DPA",
    responsavel: "Laura",
    email: "email1@email.com",
    telefone: "16588539",
    cidade: "São José dos Campos - SP",
    logo: LogoKenvue,
  },
  {
    cliente: "JSN",
    unidade: "SJC",
    sublocal: "DPA",
    responsavel: "Gustavo",
    email: "email11@email.com",
    telefone: "38444340",
    cidade: "São José dos Campos - SP",
    
  },
  {
    cliente: "JSN",
    unidade: "SJC",
    sublocal: "PRD",
    responsavel: "Mariana",
    email: "email111@email.com",
    telefone: "84160295",
    cidade: "São José dos Campos - SP",
    
  },
  {
    cliente: "KNV",
    unidade: "SJC",
    sublocal: "MAM",
    responsavel: "Rafael",
    email: "email1111@email.com",
    telefone: "12870069",
    cidade: "São José dos Campos - SP",
    logo: LogoKenvue,
  },
  {
    cliente: "KNV",
    unidade: "SJC",
    sublocal: "OTC",
    responsavel: "Camila",
    email: "email11111@email.com",
    telefone: "36165345",
    cidade: "São José dos Campos - SP",
    logo: LogoKenvue,
  },
  {
    cliente: "JNJ",
    unidade: "SJC",
    sublocal: "MDD",
    responsavel: "Lucas",
    email: "email111111@email.com",
    telefone: "42155363",
    cidade: "São José dos Campos - SP",
    logo: LogoJNJ,
  },
  {
    cliente: "JNJ",
    unidade: "EXT",
    sublocal: "CDD",
    responsavel: "Isabela",
    email: "email1111111@email.com",
    telefone: "82811917",
    cidade: "Extrema - MG",
    logo: LogoJNJ,
  },
  {
    cliente: "JNJ",
    unidade: "EXT",
    sublocal: "VSC",
    responsavel: "Bruno",
    email: "email11111111@email.com",
    telefone: "12063193",
    cidade: "Extrema - MG",
    logo: LogoJNJ,
  },
  {
    cliente: "JSN",
    unidade: "CAJ",
    sublocal: "CDD",
    responsavel: "Aline",
    email: "email111111111@email.com",
    telefone: "72682610",
    cidade: "Cajamar - SP",
    
  },
  {
    cliente: "JNJ",
    unidade: "GRU",
    sublocal: "CDD",
    responsavel: "Felipe",
    email: "email1111111111@email.com",
    telefone: "88732968",
    cidade: "Guarulhos - SP",
    logo: LogoJNJ,
  },
  {
    cliente: "JNJ",
    unidade: "GRU",
    sublocal: "STP",
    responsavel: "Juliana",
    email: "email11111111111@email.com",
    telefone: "73383440",
    cidade: "Guarulhos - SP",
    logo: LogoJNJ,
  },
  {
    cliente: "KNV",
    unidade: "JPA",
    sublocal: "CDD",
    responsavel: "Thiago",
    email: "email111111111111@email.com",
    telefone: "57871286",
    cidade: "João Pessoa - PB",
    logo: LogoKenvue,
  },
  {
    cliente: "KNV",
    unidade: "GYN",
    sublocal: "CDD",
    responsavel: "Bianca",
    email: "email1111111111111@email.com",
    telefone: "32875693",
    cidade: "Goiânia - GO",
    logo: LogoKenvue,
  },
  {
    cliente: "JNJ",
    unidade: "POA",
    sublocal: "STP",
    responsavel: "Diego",
    email: "email11111111111111@email.com",
    telefone: "99730367",
    cidade: "Porto Alegre - RS",
    logo: LogoJNJ,
  },
  {
    cliente: "JNJ",
    unidade: "CPS",
    sublocal: "STP",
    responsavel: "Larissa",
    email: "email111111111111111@email.com",
    telefone: "33882418",
    cidade: "Campinas - SP",
    logo: LogoJNJ,
  },
  {
    cliente: "JNJ",
    unidade: "BHZ",
    sublocal: "STP",
    responsavel: "André",
    email: "email1111111111111111@email.com",
    telefone: "43901621",
    cidade: "Belo Horizonte - SP",
    logo: LogoJNJ,
  },
  {
    cliente: "PLN",
    unidade: "SJC",
    sublocal: "HPL",
    responsavel: "Fernanda",
    email: "email11111111111111111@email.com",
    telefone: "12512170",
    cidade: "São José dos Campos - SP",
    
  },
  {
    cliente: "PLN",
    unidade: "JAC",
    sublocal: "HPL",
    responsavel: "Daniel",
    email: "email111111111111111111@email.com",
    telefone: "41677398",
    cidade: "Jacareí - SP",
    
  },
  {
    cliente: "PLN",
    unidade: "CPV",
    sublocal: "HPL",
    responsavel: "Natália",
    email: "email1111111111111111111@email.com",
    telefone: "78701139",
    cidade: "Caçapava - SP",
    
  },
  {
    cliente: "PLN",
    unidade: "TTE",
    sublocal: "HPL",
    responsavel: "Pedro",
    email: "email11111111111111111111@email.com",
    telefone: "45804271",
    cidade: "Taubaté - SP",
   
  },
  {
    cliente: "SCH",
    unidade: "CAJ",
    sublocal: "CDD",
    responsavel: "Vanessa",
    email: "email111111111111111111111@email.com",
    telefone: "53134335",
    cidade: "Cajamar - SP",
    
  },
  {
    cliente: "PUL",
    unidade: "JAC",
    sublocal: "CDD",
    responsavel: "Caio",
    email: "email1111111111111111111111@email.com",
    telefone: "20147610",
    cidade: "Jacareí - SP",
    
  },
];

  return (
    <>
      <div className="h-auto p-8 text-white z-10 mt-7 w-full">
        <h2 className="text-2xl font-bold mb-10 mt-6 text-white ">Empresas Cadastradas</h2>
       


        <div className="flex-wrap flex flex-row items-center justify-center lg:justify-start gap-3 px-4 w-[90%] mb-6 mt-5">
          <button
            onClick={handleAdicionar}
            className="flex flex-row items-center gap-2 bg-[#00ABAD] text-white font-bold px-4 rounded-md h-[36px]"
          >
            + Adicionar
          </button>

          <button
            onClick={() => {
              if (selectedRow !== null) {
                handleEditar((clientes.length > 0 ? clientes : empresas)[selectedRow]);
              }
            }}
            className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]"
            disabled={selectedRow === null}
          >
            <Image src={Pen} alt="Editar" width={18} height={18} />
            Editar
          </button>

          <button
            onClick={handleRemover}
            className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]"
            disabled={selectedRow === null}
          >
            <span>X</span> Remover
          </button>

          <input
            type="text"
            placeholder="Filtrar"
            className="bg-white border-2 border-[#fff4f442] text-teal-700 font-bold px-4 rounded-md h-[36px] w-[108px]"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
       


        <div className="max-h-[70vh] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <table className="table-fixed w-full text-white border border-white/10 border-collapse border-spacing-2 mb-20">
            <thead className=" bg-[#00aaad21]">
              <tr >
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Cliente</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Unidade</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Sublocal</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Responsável</th>
                <th className="w-[14%] text-left px-2 py-2 border border-white/10">E-mail</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Telefone</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Cidade</th>
                <th className="w-[12%] text-left px-2 py-2 border border-white/10">Logo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 pb-8">
              {(clientes.length > 0 ? clientes : empresas)
                .filter((empresa) =>
                  empresa.cliente.toLowerCase().includes(filtro.toLowerCase())
                )
                .map((empresa, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-[#00aaad21] cursor-pointer ${selectedRow === index ? "bg-[#00aaad21]" : ""
                      }`}
                    onClick={() => setSelectedRow(index)}
                  >
                    <td className="px-2 py-2 flex items-center gap-2">
                      <input
                        type="radio"
                        name="selected"
                        checked={selectedRow === index}
                        onChange={() => setSelectedRow(index)}
                      />
                      {empresa.cliente}
                    </td>
                    <td className="px-2 py-2 border border-white/10">{empresa.unidade}</td>
                    <td className="px-2 py-2 border border-white/10">{empresa.sublocal}</td>
                    <td className="px-2 py-2 border border-white/10">{empresa.responsavel}</td>
                    <td className="px-2 py-2 border border-white/10 truncate max-w-[160px]">{empresa.email}</td>
                    <td className="px-2 py-2 border border-white/10">{empresa.telefone}</td>
                    <td className="px-2 py-2 border border-white/10">{empresa.cidade}</td>
                    <td className="px-2 py-2 border border-white/10">
                      <Image
                        src={empresa.logo}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-8 w-auto"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>


      </div>

      {modalOpen && (
        <ClienteModal
          clienteEditando={clienteEditando}
          isOpen={modalOpen}
          onSave={handleSalvar}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
