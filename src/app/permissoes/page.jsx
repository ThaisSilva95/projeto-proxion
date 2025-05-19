"use client";
import Image from 'next/image';
import { useState } from "react";
import Pen from '../IMG/Pen.svg';
import PermissoesModal from '../../Componentes/ModalPermissao/permissoesmodal';
import AdicionarPermissaoModal from '../../Componentes/ModalPermissao/adicionarpermissao';

export default function PermissoesPage() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [showPermissoesModal, setShowPermissoesModal] = useState(false);
    const [showAdicionarPermissaoModal, setShowAdicionarPermissaoModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [permissoes, setPermissoes] = useState([
        { nome: "Fulano", permissoes: "Administrador" },
        { nome: "João, Maria, Fernando, Felipe", permissoes: "Analista" },
    ]);

    const handleAdicionar = () => {
        setShowAdicionarPermissaoModal(true);
    };

    const handleEditar = () => {
        if (selectedRow !== null) {
            setEditando(permissoes[selectedRow]);
            setShowPermissoesModal(true);
        }
    };

    const handleRemover = () => {
        if (selectedRow !== null) {
            const novaLista = [...permissoes];
            novaLista.splice(selectedRow, 1);
            setPermissoes(novaLista);
            setSelectedRow(null);
        }
    };

    const handleSalvar = (dados, isEdit) => {
        if (isEdit && selectedRow !== null) {
            const atualizados = permissoes.map((a, i) => (i === selectedRow ? dados : a));
            setPermissoes(atualizados);
        } else {
            setPermissoes([...permissoes, dados]);
        }
        setShowModal(false);
        setEditando(null);
    };

    return (
        <div className="h-auto p-8 text-white z-10 mt-7 w-full">
            <h2 className='text-2xl font-bold mb-10 mt-6 text-white'>Permissões</h2>

            {/* botões */}
            <div className="flex-wrap flex flex-row items-center justify-center lg:justify-start gap-3 px-4 w-[90%] mb-6 mt-5">
                <button onClick={handleAdicionar} className="bg-[#00ABAD] text-white font-bold px-4 rounded-md h-[36px]">+ Adicionar</button>
                <button onClick={handleEditar} className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]">
                    <Image src={Pen} alt="Pen" width={30} height={30} className="h-8 w-8" />Editar
                </button>
                <button onClick={handleRemover} className="flex flex-row items-center gap-2 bg-[#00aaad21] border-2 border-[#fff4f442] text-white font-bold px-4 rounded-md h-[36px]">
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

            {/* tabela */}
            <div className='max-h-[70vh] overflow-y-auto font-bold'>
                <table className="table-fixed w-full text-white border border-white/10 border-collapse mb-20">
                    <thead className="bg-teal-700">
                        <tr>
                            <th className="w-[2%] px-2 py-2 border border-white/10"></th>
                            <th className="w-[20%] text-left px-2 py-2 border border-white/10">Função</th>
                            <th className="w-[20%] text-left px-2 py-2 border border-white/10">Usuário Atribuídos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20 pb-8">
                        {permissoes
                            .filter((a) => a.nome.toLowerCase().includes(filtro.toLowerCase()))
                            .map((a, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-[#00aaad21] cursor-pointer ${selectedRow === index ? "bg-[#00aaad21]" : ""}`}
                                    onClick={() => setSelectedRow(index)}
                                >
                                    <td className="px-5 py-2">
                                        <input
                                            type="radio"
                                            name="selected"
                                            checked={selectedRow === index}
                                            onChange={() => setSelectedRow(index)}
                                        />
                                    </td>
                                    <td className="px-2 py-2 border border-white/10">{a.permissoes}</td>
                                    <td className="px-2 py-2 border border-white/10">{a.nome}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {showPermissoesModal && (
                <PermissoesModal
                    isOpen={showPermissoesModal}
                    onClose={() => {
                        setShowPermissoesModal(false);
                        setEditando(null);
                    }}
                    analistaEditando={editando}
                    role={editando?.permissoes || "Administrador"}
                />
            )}

            {showAdicionarPermissaoModal && (
                <AdicionarPermissaoModal
                    isOpen={showAdicionarPermissaoModal}
                    onClose={() => setShowAdicionarPermissaoModal(false)}
                />
            )}
        </div>
    );
}
