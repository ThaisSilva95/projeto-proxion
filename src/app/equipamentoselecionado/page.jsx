"use client";

import React, { useState, useEffect } from "react";
import Button from "../../Componentes/Button/Button";
import Link from 'next/link';

const EquipmentStatusForm = () => {
  const [status, setStatus] = useState("");
  const [defectType, setDefectType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [equipamento, setEquipamento] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notas, setNotas] = useState("");

  const statusOptions = [
    "Produção", 
    "Indisponível", 
    "Danificado", 
    "Disponível", 
    "Manutenção"
  ];
  
  const defectOptions = [
    "Engine", 
    "Carcaça", 
    "Tela", 
    "Comunicação", 
    "Configuração", 
    "Não Liga"
  ];
  
  const intensityOptions = ["Leve", "Médio", "Grave"];

  // Carregar dados do equipamento e da empresa
  useEffect(() => {
    try {
      // Carregar empresa
      const empresaData = localStorage.getItem("empresaSelecionada");
      if (empresaData) {
        setEmpresa(JSON.parse(empresaData));
      }
      
      // Carregar equipamento
      const equipData = localStorage.getItem("equipamentoSelecionado");
      if (equipData) {
        setEquipamento(JSON.parse(equipData));
      } else {
        setError("Nenhum equipamento selecionado");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setError("Erro ao carregar dados");
    }
  }, []);

  const handleSubmitVistoria = async () => {
    if (!status) {
      setError("Por favor, selecione um status");
      return;
    }

    if (status === "Danificado" && (!defectType || !intensity)) {
      setError("Por favor, preencha os detalhes do defeito");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const defeitosDetectados = status === "Danificado" 
        ? { tipo: defectType, intensidade: intensity } 
        : null;

      const response = await fetch("/api/equipamentos/vistoriar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroSerie: equipamento.numeroSerie,
          novoStatus: status,
          defeitosDetectados,
          notas,
          dataVistoria: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao vistoriar equipamento");
      }

      setSuccess(true);
      
      // Após sucesso, podemos atualizar o localStorage para refletir essa vistoria
      // Isso ajudará a atualizar a contagem na tela de lista
      try {
        const listaAtualizada = JSON.parse(localStorage.getItem("listaEquipamentos") || "[]");
        const novaLista = listaAtualizada.map(item => {
          if (item.tipo === equipamento.tipo) {
            return {
              ...item,
              avaliados: item.avaliados + 1
            };
          }
          return item;
        });
        localStorage.setItem("listaEquipamentos", JSON.stringify(novaLista));
      } catch (storageError) {
        console.error("Erro ao atualizar localStorage:", storageError);
      }
      
    } catch (err) {
      console.error("Erro ao registrar vistoria:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-white max-w-full overflow-y-auto mt-5">
      {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">Processando...</div>}
      
      <div className="max-w-4xl text-white p-6 space-y-4">
        {/* Informações do equipamento */}
        <div className="text-center rounded-lg bg-white bg-opacity-50 shadow-lg p-3">
          {equipamento ? (
            <>
              <p>Equipamento: {equipamento.tipo}</p>
              <p>Modelo: {equipamento.modelo}</p>
              <p>Nº de série: {equipamento.numeroSerie}</p>
              {empresa && (
                <p className="text-xs mt-2">
                  {empresa.cliente} - {empresa.unidade} ({empresa.subLocal})
                </p>
              )}
            </>
          ) : (
            <p>Carregando dados do equipamento...</p>
          )}
        </div>

        {/* Status atual */}
        <div>
          <p className="font-semibold text-[24px] text-center">
            Status Atual: {equipamento?.statusAtual || "Produção"}
          </p>
        </div>

        {/* Formulário */}
        {!success ? (
          <>
            <div>
              <label className="block mb-2 font-semibold">
                Informe novo status
              </label>
              <select
                className="w-full p-2 rounded text-[#00ABAD]"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Selecione...</option>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {status === "Danificado" && (
              <>
                <div>
                  <label className="block mt-4 mb-2 font-semibold">
                    Selecionar defeito
                  </label>
                  <select
                    className="w-full p-2 rounded text-[#00ABAD]"
                    value={defectType}
                    onChange={(e) => setDefectType(e.target.value)}
                  >
                    <option value="">Selecione o defeito...</option>
                    {defectOptions.map((defect) => (
                      <option key={defect} value={defect}>
                        {defect}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mt-4 mb-2 font-semibold">
                    Intensidade do dano
                  </label>
                  <select
                    className="w-full p-2 rounded text-[#00ABAD]"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                  >
                    <option value="">Selecione a intensidade...</option>
                    {intensityOptions.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block mt-4 mb-2 font-semibold">
                Notas do Equipamento
              </label>
              <textarea
                className="w-full p-2 text-[#00ABAD] rounded"
                rows={3}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              ></textarea>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmitVistoria}
              className="bg-teal-500 text-white w-full py-3 px-4 rounded-lg font-semibold hover:bg-teal-600 transition"
              disabled={loading}
            >
              Equipamento Vistoriado
            </button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-lg">
              Vistoria registrada com sucesso!
            </div>
            <Link href="/listaequipamentos">
              <button className="bg-teal-500 text-white w-full py-3 px-4 rounded-lg font-semibold hover:bg-teal-600 transition">
                Voltar para Lista de Equipamentos
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentStatusForm;