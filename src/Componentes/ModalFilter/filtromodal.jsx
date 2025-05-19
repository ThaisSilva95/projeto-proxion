"use client";
import { useState } from "react";
import BGModal from "../../app/IMG/BGModal.png";

export default function FiltroModal({ isOpen, onClose }) {
  const [status, setStatus] = useState("Indisponível");
  const [equipamento, setEquipamento] = useState("Coletor de Dados");
  const [isResultadoModalOpen, setIsResultadoModalOpen] = useState(false);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const itensOriginais = [
    { modelo: "MC9200", patrimonio: "45148614005", status: "Indisponível", equipamento: "Coletor de Dados" },
    { modelo: "MC9300", patrimonio: "66611817160", status: "Disponível", equipamento: "Leitor Barcode" },
    { modelo: "MC9200", patrimonio: "29316595793", status: "Produção", equipamento: "Sled RFID" },
  ];

  const aplicarFiltro = () => {
    const filtrados = itensOriginais.filter(item => 
      item.status === status && item.equipamento === equipamento
    );
    setDadosFiltrados(filtrados);
    setIsResultadoModalOpen(true);
  };

  const copiarDados = () => {
    const texto = dadosFiltrados
      .map(item => `${item.modelo} - ${item.patrimonio}`)
      .join("\n");
    navigator.clipboard.writeText(texto)
      .then(() => alert("Dados copiados com sucesso!"))
      .catch(() => alert("Falha ao copiar os dados."));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="relative w-[90%] max-w-md p-12 bg-white rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${BGModal.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">Filtrar por:</h2>

        <div className="mb-6">
          <label className="block text-center text-teal-700 font-semibold mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 rounded-lg bg-cyan-200 text-teal-800 font-bold shadow-md text-center">
            <option>Produção</option>
            <option>Indisponível</option>
            <option>Disponível</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-center text-teal-700 font-semibold mb-2">Equipamento</label>
          <select value={equipamento} onChange={(e) => setEquipamento(e.target.value)}
            className="w-full p-3 rounded-lg bg-cyan-200 text-teal-800 font-bold shadow-md text-center">
            <option>Leitor Barcode</option>
            <option>Coletor de Dados</option>
            <option>Sled RFID</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button onClick={onClose} className="text-cyan-700 font-medium hover:underline">Cancelar</button>
          <button onClick={aplicarFiltro} className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg shadow">
            Confirmar
          </button>
        </div>
      </div>

      {isResultadoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Resultado Filtro</h2>
            <p className="text-teal-700 mb-2">{status} - {equipamento}</p>
            <div className="bg-cyan-200 rounded-lg p-4 mb-4">
              {dadosFiltrados.length > 0 ? (
                dadosFiltrados.map((item, index) => (
                  <div key={index} className="flex justify-between text-teal-900 font-semibold px-2 py-1">
                    <span>{item.modelo}</span>
                    <span>{item.patrimonio}</span>
                  </div>
                ))
              ) : (
                <p className="text-red-500 font-bold">Nenhum item encontrado.</p>
              )}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setIsResultadoModalOpen(false)} className="text-cyan-700 font-medium hover:underline">
                Fechar
              </button>
              {dadosFiltrados.length > 0 && (
                <button onClick={copiarDados} className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow">
                  Copiar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}