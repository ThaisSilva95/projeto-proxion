'use client';

import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Capa from '../../Componentes/Relatorio/capa';
import Graficos from '../../Componentes/Relatorio/graficos';


export default function Relatorio() {
    const relatorioRef = useRef(null);
    const [html2pdfLib, setHtml2pdfLib] = useState(null);

    const dadosResumo = [
        { status: 'Produção', valor: 3 },
        { status: 'Disponível', valor: 2 },
        { status: 'Manutenção', valor: 1 },
        { status: 'Danificado', valor: 1 }
    ];

    const dadosPorTipo = [
        { tipo: 'Disponivel', valor: 25 },
        { tipo: 'Em Produção', valor: 10 },
        { tipo: 'Em Manutenção', valor: 2 },
        { tipo: 'Danificado', valor: 12 },
        { tipo: 'Indisponível', valor: 2 },
    ];

    useEffect(() => {
        import('html2pdf.js').then((mod) => {
            setHtml2pdfLib(mod);
        });
    }, []);

    const exportarPDF = () => {
        if (!html2pdfLib || !relatorioRef.current) return;

        const html2pdf = html2pdfLib.default || html2pdfLib;
        setTimeout(() => {
            html2pdf()
                .set({
                    margin: 0,
                    filename: 'relatorio.pdf',
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
                    enableLinks: true,
                })
                .from(relatorioRef.current)
                .save();
        }, 500);

    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={exportarPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Exportar PDF
            </button>

            <div id="relatorio" ref={relatorioRef}>
                <div className="page">
                    <Capa />
                </div>
                <div className="page ">
                    <Graficos dadosResumo={dadosResumo} dadosPorTipo={dadosPorTipo} />
                </div>
                {/* Adicione outras páginas aqui */}
            </div>
        </div>
    );
}
