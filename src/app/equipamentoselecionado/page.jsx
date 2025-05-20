"use client";

import React, { useState, useEffect } from "react";
import Button from "../../Componentes/Button/Button";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const EquipamentoSelecionado = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [status, setStatus] = useState("");
  const [defectType, setDefectType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [equipamento, setEquipamento] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notas, setNotas] = useState("");

  // Opções de status, defeitos e intensidade
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

  // Carregar dados da URL ou do localStorage
  useEffect(() => {
    // Verificar se temos parâmetros na URL primeiro
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    const subLocal = searchParams.get('subLocal');
    const tipo = searchParams.get('tipo');
    const modelo = searchParams.get('modelo');
    const serie = searchParams.get('serie');
    const equipamentoId = searchParams.get('equipamentoId');
    
    if (cliente && unidade && tipo && modelo && serie) {
      // Se temos todos os parâmetros na URL, usamos eles
      setEmpresa({
        cliente,
        unidade,
        subLocal: subLocal || ''
      });
      
      setEquipamento({
        id: equipamentoId || `eq-${Date.now()}`, // Geramos um ID se não houver
        tipo,
        modelo,
        numeroSerie: serie,
        cliente,
        unidade,
        subLocal: subLocal || '',
        statusAtual: 'Pendente'
      });
      
      console.log("Dados carregados da URL:", { cliente, unidade, tipo, modelo, serie });
    } else {
      // Caso contrário, tentamos carregar do localStorage
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
    }
    
    // Se temos um equipamentoId, vamos buscar vistorias anteriores
    if (equipamentoId) {
      // Buscar no localStorage todas as vistorias para ver se já temos algo
      const historicoVistorias = localStorage.getItem('historicoVistorias');
      if (historicoVistorias) {
        try {
          const vistorias = JSON.parse(historicoVistorias);
          const vistoriaExistente = vistorias.find(v => v.equipamentoId === equipamentoId);
          
          if (vistoriaExistente) {
            setEquipamento(prev => ({
              ...prev,
              statusAtual: vistoriaExistente.novoStatus || prev?.statusAtual || 'Pendente',
              ultimaVistoria: vistoriaExistente.dataVistoria
            }));
          }
        } catch (e) {
          console.error("Erro ao processar histórico de vistorias:", e);
        }
      }
    }
  }, [searchParams]);

  const handleSubmitVistoria = async () => {
    if (!status) {
      setError("Por favor, selecione um status");
      return;
    }

    // Validação para equipamentos danificados
    if (status === "Danificado" && (!defectType || !intensity)) {
      setError("Por favor, preencha os detalhes do defeito");
      return;
    }

    if (!equipamento || !equipamento.numeroSerie) {
      setError("Dados do equipamento incompletos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Preparar dados da vistoria
      const defeitosDetectados = status === "Danificado" 
        ? { tipo: defectType, intensidade: intensity } 
        : null;

      const vistoriaData = {
        equipamentoId: equipamento.id || `eq-${Date.now()}`,
        numeroSerie: equipamento.numeroSerie,
        cliente: equipamento.cliente || empresa?.cliente,
        unidade: equipamento.unidade || empresa?.unidade,
        subLocal: equipamento.subLocal || empresa?.subLocal,
        tipo: equipamento.tipo,
        modelo: equipamento.modelo,
        novoStatus: status,
        defeitosDetectados,
        notas,
        dataVistoria: new Date().toISOString()
      };

      console.log("Dados da vistoria:", vistoriaData);
      
      // Salvar a vistoria no localStorage
      // Primeiro, obter vistorias existentes
      const historicoVistorias = localStorage.getItem('historicoVistorias');
      let vistorias = [];
      
      if (historicoVistorias) {
        try {
          vistorias = JSON.parse(historicoVistorias);
        } catch (e) {
          console.error("Erro ao parsear histórico de vistorias:", e);
        }
      }
      
      // Adicionar nova vistoria
      vistorias.push(vistoriaData);
      
      // Salvar histórico atualizado
      localStorage.setItem('historicoVistorias', JSON.stringify(vistorias));
      
      // Atualizar dados locais (equipamento atual e lista)
      atualizarDadosLocais(vistoriaData);
      
      setSuccess(true);
      
      // Aguardar um momento antes de redirecionar
      setTimeout(() => {
        voltarParaLista();
      }, 1500);
      
    } catch (err) {
      console.error("Erro ao processar vistoria:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Função para atualizar dados no localStorage após vistoria bem-sucedida
  const atualizarDadosLocais = (vistoriaData) => {
    try {
      // Atualizar dados do equipamento no localStorage
      if (equipamento) {
        const equipamentoAtualizado = {
          ...equipamento,
          statusAtual: vistoriaData.novoStatus,
          ultimaVistoria: vistoriaData.dataVistoria
        };
        
        localStorage.setItem("equipamentoSelecionado", JSON.stringify(equipamentoAtualizado));
      }
      
      // Atualizar lista de equipamentos (para a tabela e gráfico)
      const listaAtualStr = localStorage.getItem("listaEquipamentos");
      let listaAtual = [];
      
      if (listaAtualStr) {
        try {
          listaAtual = JSON.parse(listaAtualStr);
        } catch (e) {
          console.error("Erro ao parsear lista do localStorage:", e);
        }
      }
      
      // Encontrar e atualizar o item correspondente
      let encontrado = false;
      
      const listaAtualizada = listaAtual.map(item => {
        if (item.tipo === vistoriaData.tipo) {
          encontrado = true;
          return {
            ...item,
            avaliados: (item.avaliados || 0) + 1
          };
        }
        return item;
      });
      
      // Se não encontrou, adicionar novo item
      if (!encontrado && vistoriaData.tipo) {
        listaAtualizada.push({
          tipo: vistoriaData.tipo,
          avaliados: 1,
          total: 1
        });
      }
      
      // Salvar lista atualizada no localStorage
      localStorage.setItem("listaEquipamentos", JSON.stringify(listaAtualizada));
      console.log("Lista de equipamentos atualizada no localStorage:", listaAtualizada);
      
      // Adicionar um sinalizador para recarregar dados na lista
      localStorage.setItem("atualizarLista", "true");
      
    } catch (storageError) {
      console.error("Erro ao atualizar dados no localStorage:", storageError);
    }
  };

  // Voltar para a lista com parâmetro de atualização
  const voltarParaLista = () => {
  const { cliente, unidade, subLocal } = empresa || equipamento || {};
  
  if (!cliente || !unidade) {
    // Se não tivermos os dados, usamos a rota absoluta
    router.push('/listaequipamentos');
    return;
  }
  
  // Criar URL com parâmetros
  let url = `/listaequipamentos?cliente=${encodeURIComponent(cliente)}&unidade=${encodeURIComponent(unidade)}`;
  if (subLocal) {
    url += `&subLocal=${encodeURIComponent(subLocal)}`;
  }
  
  // Adicionar parâmetro de atualização
  url += `&atualizacao=${Date.now()}`;
  
  // Use replace em vez de push para garantir que o histórico de navegação seja limpo
  router.replace(url);
};

  // Redirecionar para página de defeito se necessário
  const handleDefeitosDetalhados = () => {
    if (!equipamento) {
      setError("Dados do equipamento incompletos");
      return;
    }
    
    const queryParams = new URLSearchParams({
      tipo: equipamento.tipo,
      modelo: equipamento.modelo,
      serie: equipamento.numeroSerie,
      defectType,
      intensity
    }).toString();
    
    router.push(`/equipamentodefeito?${queryParams}`);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-4 lg:py-8 gap-3">
      {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">Processando...</div>}
      
      <div className="max-w-4xl text-white p-6 space-y-4 w-[300px]">
        {/* Cabeçalho */}
        <h2 className="text-2xl font-bold mb-3 text-center">
          Vistoria de Equipamento
        </h2>
        
        {/* Informações do equipamento */}
        <div className="text-center rounded-lg bg-white bg-opacity-20 shadow-lg p-3">
          {equipamento ? (
            <>
              <p>Equipamento: {equipamento.tipo}</p>
              <p>Modelo: {equipamento.modelo}</p>
              <p>Nº de série: {equipamento.numeroSerie}</p>
              {empresa && (
                <p className="text-xs mt-2">
                  {equipamento.cliente || empresa.cliente} - {equipamento.unidade || empresa.unidade}
                  {(equipamento.subLocal || empresa.subLocal) && ` (${equipamento.subLocal || empresa.subLocal})`}
                </p>
              )}
            </>
          ) : (
            <p>Carregando dados do equipamento...</p>
          )}
        </div>

        {/* Status atual */}
        {equipamento?.statusAtual && (
          <div>
            <p className="font-semibold text-xl text-center">
              Status Atual: {equipamento.statusAtual}
            </p>
          </div>
        )}

        {/* Formulário */}
        {!success ? (
          <>
            <div>
              <label className="block mb-2 font-semibold">
                Informe novo status
              </label>
              <select
                className="w-full p-2 rounded text-[#01AAAD]"
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
                    className="w-full p-2 rounded text-[#01AAAD]"
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
                    className="w-full p-2 rounded text-[#01AAAD]"
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
                
                <button
                  onClick={handleDefeitosDetalhados}
                  className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition mt-2"
                >
                  Detalhar Defeitos
                </button>
              </>
            )}

            <div>
              <label className="block mt-4 mb-2 font-semibold">
                Notas do Equipamento
              </label>
              <textarea
                className="w-full p-2 text-[#01AAAD] rounded"
                rows={3}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Observações sobre o equipamento..."
              ></textarea>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmitVistoria}
              textButton="Equipamento Vistoriado"
              disabled={loading}
            />
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-lg">
              Vistoria registrada com sucesso!
            </div>
            
            <p className="text-white">Redirecionando para a lista...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipamentoSelecionado;