
"use client";

import Button from '../../Componentes/Button/Button'
import Link from 'next/link'
import { CheckCircle, ClipboardList, Camera, FileText, Clock, PieChart, Building2, RotateCcwIcon } from "lucide-react";


export default function Instrucoes() {
  

    const passos = [
        {
            icon: <Clock className="w-8 h-8 text-[#00ABAD]" />,
            titulo: "1. Iniciando a vistoria",
            descricao: "Clique em iniciar vistoria, informe o dia a e a hora de chegada na empresa",
        },
        {
            icon: <Building2 className="w-8 h-8 text-[#FDA417]" />,
            titulo: "2. Selecione a empresa",
            descricao: "Escolha a empresa, local e unidade onde será realizada a vistoria",
        },
        {
            icon: <ClipboardList className="w-8 h-8 text-[#00ABAD]" />,
            titulo: "3. Lista de Equipamentos",
            descricao: "Acesse a lista dos equipamentos que precisam ser vistoriados, você também pode incluir um novo equipamento e filtrar por equipamentos que ainda faltam na vistoria",
        },
        {
            icon: <PieChart className="w-8 h-8 text-[#FDA417]" />,
            titulo: "3. Registre os defeitos",
            descricao: "Clique em Selecionar Equipamento, informe o equipamento ou escaneie o código de barras, informe um novo status. Se selecionar Danificado o sistema irá buscar as opções de dano e intensidade do dano.",
        },
        {
            icon: < CheckCircle className="w-8 h-8 text-[#00ABAD]" />,
            titulo: "4. Finalizando a Vistoria",
            descricao: "Após vistoriar 100% dos equipamentos você pode finalizar a vistoria, informar o horário da saída e notas adicionais sobre a vistoria",
        },
        {
            icon: < FileText className="w-8 h-8 text-[#FDA417]" />,
            titulo: "5. Gerar Documentos",
            descricao: "Gere o CSV da vistoria e o Relatório",
        },
        {
            icon: < RotateCcwIcon  className="w-8 h-8 text-[#00ABAD]" />,
            titulo: "5. Retomar vistoria",
            descricao: "Caso necessário, você pode retomar um vistoria não finalizada nesta página",
        },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto overflow-y-auto " style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <h1 className="text-2xl font-bold mb-10 text-center text-white mt-8">Como realizar uma vistoria</h1>

            <div className="space-y-6">
                {passos.map((passo, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-4 bg-white shadow-md rounded-2xl p-4 border "
                    >
                        <div>{passo.icon}</div>
                        <div>
                            <h2 className="text-lg font-semibold">{passo.titulo}</h2>
                            <p className="text-sm text-gray-600">{passo.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center mb-10">
                <Link href="/iniciarvistoria">
                <Button
                    textButton="Começar vistoria"
                    className="bg-[#00ABAD] text-white hover:bg-[#008C8D] px-6 py-3 rounded-2xl text-lg"
                >
                    Começar Vistoria
                </Button>
                </Link>
            </div>
        </div>
    );
}
