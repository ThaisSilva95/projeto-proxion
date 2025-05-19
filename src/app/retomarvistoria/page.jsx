"use client"

import Link from 'next/link'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import Button from '../../Componentes/Button/Button'

export default function ResumeInspection() {
    const [vistorias, setVistorias] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [filtro, setFiltro] = useState("");

    const vistoriasNaoFinalizadas = [
        {
            cliente: "JNJ",
            sublocal: "GRU",
            unidade: "CDD",
            data: "15/05/2025",

        },
        {
            cliente: "KN",
            sublocal: "SJC",
            unidade: "CDD",
            data: "14/05/2025",

        },
    ];

    return (
        <>
            <div className='p-6 max-w-4xl mx-auto text-center relative h-screen flex flex-col p-4 mt-10 lg:py-16 gap-3'>
                <h1 className='text-3xl font-bold mb-16 mt-6 text-white '> Retomar Vistoria</h1>


                <div className="max-w-[60vh] overflow-x-auto items-center rounded-lg shadow-lg mb-14 " style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} >
                    <table className="table-fixed w-full rounded-lg shadow-lg">
                        <thead className=" bg-white">
                            <tr>
                                <th className="w-[8%] text-center text-teal-700 px-2 py-2 "> Cliente </th>
                                <th className="w-[8%] text-center text-teal-700 px-2 py-2"> Unidade </th>
                                <th className="w-[8%] text-center text-teal-700 px-2 py-2 "> Sublocal </th>
                                <th className="w-[12%] text-center text-teal-700 px-3 py-3 "> Data da Vistoria </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-teal-700/20 pb-8 bg-gray-300 text-teal-700 font-semibold">
                            {(vistorias.length > 0 ? vistorias : vistoriasNaoFinalizadas)
                                .filter((vistoriasNaoFinalizadas) =>
                                    vistoriasNaoFinalizadas.cliente.toLowerCase().includes(filtro.toLowerCase())
                                )
                                .map((vistoriasNaoFinalizadas, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-[#00aaad21] cursor-pointer ${selectedRow === index ? "bg-[#00aaad21]" : ""
                                            }`}
                                        onClick={() => setSelectedRow(index)}
                                    >
                                        <td className="px-4 py-5 flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="selected"
                                                checked={selectedRow === index}
                                                onChange={() => setSelectedRow(index)}
                                            />
                                            {vistoriasNaoFinalizadas.cliente}</td>
                                        <td className="px-2 py-2 items-center gap-2"> {vistoriasNaoFinalizadas.sublocal}</td>
                                        <td className="px-2 py-2 items-center gap-2"> {vistoriasNaoFinalizadas.unidade}</td>
                                        <td className="px-2 py-2 items-center gap-2"> {vistoriasNaoFinalizadas.data}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <Link href="/listaequipamentos">
                    <Button
                        textButton="Retomar Vistoria" type="submit"
                    >

                    </Button>
                </Link>
            </div>
        </>
    )
}
