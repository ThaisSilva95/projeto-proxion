'use client';

import { useEffect, useState } from 'react';


export default function ListaEquipamentos() {
    // Dados de exemplo (simulando dados que viriam de uma API)
    const [equipamentos, setEquipamentos] = useState([
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1407500506201', status: 'Danificado', observacoes: 'Tela', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1414100502497', status: 'Danificado', observacoes: 'Carcaça', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1418900505920', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1419700500977', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9200', serial: '1601800501159', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201318', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201402', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200793', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200803', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200836', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200837', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200854', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200871', status: 'Indisponível', observacoes: '', intensidade: 'Grave' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200103', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200239', status: 'Indisponível', observacoes: '', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200002', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200006', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1407500506201', status: 'Danificado', observacoes: 'Tela', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1414100502497', status: 'Danificado', observacoes: 'Carcaça', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1418900505920', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1419700500977', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9200', serial: '1601800501159', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201318', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201402', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200793', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200803', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200836', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200837', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200854', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200871', status: 'Indisponível', observacoes: '', intensidade: 'Grave' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200103', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200239', status: 'Indisponível', observacoes: '', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200002', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200006', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1407500506201', status: 'Danificado', observacoes: 'Tela', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1414100502497', status: 'Danificado', observacoes: 'Carcaça', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1418900505920', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1419700500977', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9200', serial: '1601800501159', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201318', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201402', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200793', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200803', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200836', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200837', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200854', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200871', status: 'Indisponível', observacoes: '', intensidade: 'Grave' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200103', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200239', status: 'Indisponível', observacoes: '', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200002', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200006', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1407500506201', status: 'Danificado', observacoes: 'Tela', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1414100502497', status: 'Danificado', observacoes: 'Carcaça', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1418900505920', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1419700500977', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9200', serial: '1601800501159', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201318', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201402', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200793', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200803', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200836', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200837', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200854', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200871', status: 'Indisponível', observacoes: '', intensidade: 'Grave' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200103', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200239', status: 'Indisponível', observacoes: '', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200002', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200006', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1407500506201', status: 'Danificado', observacoes: 'Tela', intensidade: 'Leve' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1414100502497', status: 'Danificado', observacoes: 'Carcaça', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1418900505920', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9190', serial: '1419700500977', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9200', serial: '1601800501159', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201318', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21147524201402', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200793', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200803', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200836', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200837', status: 'Disponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200854', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21148524200871', status: 'Indisponível', observacoes: '', intensidade: 'Grave' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200103', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21216524200239', status: 'Indisponível', observacoes: '', intensidade: 'Médio' },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200002', status: 'Indisponível', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200006', status: 'Em Produção', observacoes: '', intensidade: null },
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },]);

    // Configurações de paginação para PDF
    const LINHAS_POR_PAGINA = 41; // Número máximo de linhas por página para caber no PDF

    // Calcula o total de páginas com base no número de equipamentos
    const totalPaginas = Math.ceil(equipamentos.length / LINHAS_POR_PAGINA);

    // Função para renderizar o status com a cor correta
    const renderizarStatus = (status) => {
        switch (status) {
            case 'Danificado':
                return <span className="text-yellow-500 font-medium">{status}</span>;
            case 'Em Produção':
                return <span className="text-cyan-500 font-medium">{status}</span>;
            case 'Disponível':
                return <span className="text-gray-700 font-medium">{status}</span>;
            case 'Indisponível':
                return <span className="text-gray-400 font-medium">{status}</span>;
            default:
                return <span>{status}</span>;
        }
    };

    // Função para obter a cor da intensidade do dano
    const getCorIntensidade = (intensidade) => {
        switch (intensidade) {
            case 'Leve':
                return '#FF7B00';
            case 'Médio':
                return '#FF1919';
            case 'Grave':
                return '#8E0000';
            default:
                return 'transparent';
        }
    };

  

    return (
        <div className="w-full h-full flex flex-col justify-between">
            {Array.from({ length: totalPaginas }).map((_, pageIndex) => {
                // Dados para a página atual
                const startIndex = pageIndex * LINHAS_POR_PAGINA;
                const endIndex = Math.min(startIndex + LINHAS_POR_PAGINA, equipamentos.length);
                const equipamentosDaPagina = equipamentos.slice(startIndex, endIndex);

                return (
                    <div
                        key={`page-${pageIndex}`}
                        className={pageIndex > 0 ? "page-break-before mt-8" : ""}
                        style={pageIndex > 0 ? { pageBreakBefore: 'always' } : {}}
                    >
                        {/* Cabeçalho - Repetido em todas as páginas */}
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h1 className="font-bold text-lg text-gray-600">Manutenção Preventiva</h1>
                                <p className="text-sm text-gray-600">Relatório dos Serviços Executados</p>
                            </div>
                            <img
                                src='/img/logokenvue.png'
                                alt="Topo"
                                loading="eager"
                                style={{ width: '25%', height: 'auto', display: 'block' }}
                            />
                        </div>

                        <div className="w-full h-6 bg-gray-700 flex items-center justify-center mb-2">
                            <p className="text-white text-sm relative -top-2">
                                Lista de Equipamento
                            </p>
                        </div>

                        {/* Tabela de Equipamentos */}
                        <div className="overflow-hidden border-t border-gray-300 w-full " style={{ pageBreakInside: 'avoid' }}>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-xs relative -top-3 h-8 ">
                                        <th className="py-1 px-2 text-left border-b text-center ">Tipo de Equipamento</th>
                                        <th className="py-1 px-2 text-left border-b text-center">Modelo</th>
                                        <th className="py-1 px-2 text-left border-b text-center">Serial Number</th>
                                        <th className="py-1 px-2 text-left border-b text-center">Status</th>
                                        <th className="py-1 px-2 text-left border-b text-center"></th>
                                        <th className="py-1 px-2 text-left border-b text-center">Observações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs ">
                                    {equipamentosDaPagina.map((equipamento, index) => (
                                        <tr key={`row-${pageIndex}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-0.5  px-2 border-b border-gray-200 text-center">
                                                <span className="relative -top-[4px]">{equipamento.tipo}</span>
                                            </td>
                                            <td className="py-0.5  px-2 border-b border-gray-200 text-center leading-tight">
                                                <span className="relative -top-[4px]">{equipamento.modelo}  </span>
                                            </td>
                                            <td className="py-0.5  px-2 border-b border-gray- text-center leading-tight">
                                                <span className="relative -top-[4px]">{equipamento.serial} </span>
                                            </td>
                                            <td className="py-0.5  px-2 border-b border-gray- text-center leading-tight">
                                                <span className="relative -top-[4px]"> {renderizarStatus(equipamento.status)} </span>
                                            </td>
                                            <td className="py-0.5  px-2 border-b border-gray- text-center leading-tight">
                                                {equipamento.intensidade && (
                                                    <div
                                                        className="w-3 h-3 rounded-full mx-auto"
                                                        style={{ backgroundColor: getCorIntensidade(equipamento.intensidade) }}
                                                        title={equipamento.intensidade}
                                                    />
                                                )}

                                            </td>
                                            <td className="py-0.5 px-2 border-b border-gray-200 text-center leading-tight">
                                                <span className="relative -top-[4px]">{equipamento.observacoes}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Adicionar linhas vazias se não houver equipamentos suficientes para preencher a página */}
                                    {Array(Math.max(0, LINHAS_POR_PAGINA - equipamentosDaPagina.length)).fill().map((_, index) => (
                                        <tr key={`empty-${pageIndex}-${index}`} className={(equipamentosDaPagina.length + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-0.5 px-2 border-b border-gray-200">&nbsp;</td>
                                            <td className="py-0.5 px-2 border-b border-gray-200"></td>
                                            <td className="py-0.5 px-2 border-b border-gray-200"></td>
                                            <td className="py-0.5 px-2 border-b border-gray-200"></td>
                                            <td className="py-0.5 px-2 border-b border-gray-200"></td>
                                            <td className="py-0.5 px-2 border-b border-gray-200"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Rodapé - Repetido em todas as páginas */}
                        <div className="w-full mt-2 pt-1 border-t border-gray-300" style={{ pageBreakInside: 'avoid' }}>
                            <div className="flex items-center text-xs text-gray-600 gap-2">
                                <img
                                    src='/img/logoproxion.png'
                                    alt="Logo Proxion"
                                    loading="eager"
                                    style={{ width: '8%', height: 'auto', display: 'block' }}
                                />
                                <p>
                                    Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP -
                                    CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Estilos específicos para impressão */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    
                    .page-break-before {
                        page-break-before: always;
                    }
                }
            `}</style>
        </div>
    );
}