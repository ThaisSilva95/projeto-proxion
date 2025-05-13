"use client";

import { useState } from "react";
import Image from "next/image";
import LogoJNJ from "../IMG/Logo-jnj.png";
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
      cliente: "ABC",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "DEF",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "HIJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
    },
    {
      cliente: "JNJ",
      unidade: "GRU",
      sublocal: "CDD",
      responsavel: "João Silva",
      email: "joao.silva@jnj.com.br",
      telefone: "(12) 99999-9999",
      cidade: "São José dos Campos",
      logo: LogoJNJ,
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
