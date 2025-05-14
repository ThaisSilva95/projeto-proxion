"use client";
import Image from 'next/image'
import BGIMG from '../IMG/BG.png'
import SideBarMenu from "../../Componentes/Menu/SideBarMenu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { set } from 'mongoose';
import Pen from '../IMG/Pen.svg';

export default function permisoespage() {
    const nomesExtras = ["João da Silva", "Maria Oliveira", "Carlos Souza", "Ana Paula"];
    const [menuOpen, setMenuOpen] = useState(false);
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

            setClientes(clientes.map(c => c.codigoCliente === clienteEditando.codigoCliente ? novoCliente : c));
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

    return (
        <div className="relative w-screen h-screen flex bg-gray-100 overflow-hiden">
            {/* Background */}
            <Image
                src={BGIMG}
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
                className="z-0" />

            <div className="absolute inset-0 bg-black/20 z-0"></div>

            <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {!menuOpen && (
                <button
                    className="absolute top-4 left-4 z-30 md:hidden text-white"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            )}
            {/* aplicação */}
            <div className='relative z-10'>
                <h1 className='w-screen pl-7 pt-7 font-semibold text-3xl text-white flex justify-start items-center'>Permissões</h1>
                {/* botões */}
                <div className="flex gap-4 mb-10 mt-10 pl-7">
                    <button onClick={handleAdicionar} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
                        + Adicionar
                    </button>
                    <button
                        onClick={() => {
                            if (selectedRow !== null) {
                                handleEditar((clientes.length > 0 ? clientes : empresas)[selectedRow]);
                            }
                        }}
                        className="flex items-center gap-0 bg-[#2C7172] hover:bg-teal-600 border border-white text-white font-semibold py-2 px-2 rounded">
                        <Image
                            src={Pen}
                            alt="Pen"
                            width={30}
                            height={30}
                            className="h-8 w-8"
                        />
                        Editar
                    </button>
                    <button
                        onClick={handleRemover}
                        className="bg-[#2C7172] hover:bg-red-600 border border-white text-white font-semibold py-2 px-4 rounded"
                    >
                        X Remover
                    </button>
                    {/* <input
                        type="text"
                        placeholder="Filtrar por cliente"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="bg-white text-[#2C7172] px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-white"
                    /> */}
                </div>
                <div>
                    <div className='flex w-full pl-7 gap-[10rem] border-b-[1px] border-solid border-white '>
                        <h2 className='flex items-center font-medium text-[1.3rem] capitalize text-white'><span className='block w-[15px] h-[15px] bg-white rounded-full mr-9 '></span>nome da função</h2>
                        <h2 className=' font-medium text-[1rem] capitalize text-white'>usuários atribuidos</h2>
                    </div>
                    <div className='flex w-full pl-7 gap-[15rem] my-3'>
                        <h4 className='flex items-center  text-[1rem] capitalize text-white'><span className='block w-[10px] h-[10px] bg-white rounded-full mr-10' ></span>administrador</h4>
                        <p className='text-white capitalize'>fulano da silva</p>
                    </div>
                    <div className='flex w-full pl-7 gap-[17rem] relative group'>
                        <h4 className='flex items-center  text-[1rem] capitalize text-white'><span className='block w-[10px] h-[10px] bg-white rounded-full mr-10'></span>analista</h4>
                        <p className='text-white capitalize'>fulano da silva<span className='text-cyan-400 cursor-pointer'> +{nomesExtras.length}</span>
                        </p>
                         <div className="absolute left-[34rem] top-3 mt-2 w-48 p-2 rounded bg-white text-[#2C7172] shadow-lg text-sm border border-gray-300 z-10
  opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                            {nomesExtras.map((nome, index) => (
                                <p key={index}>{nome}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

