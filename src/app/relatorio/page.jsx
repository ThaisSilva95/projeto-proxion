'use client';

import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Capa from '../../Componentes/Relatorio/capa';
import Graficos from '../../Componentes/Relatorio/graficos';


export default function Relatorio() {
    const relatorioRef = useRef(null);
    const [html2pdfLib, setHtml2pdfLib] = useState(null);

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
                })
                .from(relatorioRef.current)
                .save();
        }, 500);

    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={exportarPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Exportar PDF
            </button>

            <div id="relatorio" ref={relatorioRef}>
                <div className="page page-break">
                    <Capa />
                </div>
                <div className="page page-break">
                    <Graficos />
                </div>
                {/* Adicione outras páginas aqui */}
            </div>
        </div>
    );
}
