"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../Componentes/Button/Button";
import InputSelect from "../../Componentes/InputSelect/InputSelect";
import InputText from "../../Componentes/InputText/InputText";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function SelectEquipment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tiposEquipamento, setTiposEquipamento] = useState([]);
  const [modelosEquipamento, setModelosEquipamento] = useState([]);
  const [numerosDeSerie, setNumerosDeSerie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [serieSelecionada, setSerieSelecionada] = useState("");
  const [serieManual, setSerieManual] = useState("");
  const [empresaInfo, setEmpresaInfo] = useState({
    cliente: '',
    unidade: '',
    subLocal: ''
  });
  
  // Verificar se um equipamento específico foi selecionado da lista (modo edição)
  const [isEditMode, setIsEditMode] = useState(false);

  // Obter parâmetros da URL
  useEffect(() => {
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    const subLocal = searchParams.get('subLocal');
    const equipamentoId = searchParams.get('equipamentoId');
    
    // Verificar se temos um ID de equipamento (vindo da lista)
    if (equipamentoId) {
      setIsEditMode(true);
      // Buscar detalhes do equipamento pelo ID
      fetchEquipamentoDetails(equipamentoId);
    }

    if (cliente && unidade) {
      setEmpresaInfo({
        cliente,
        unidade,
        subLocal: subLocal || ''
      });
      console.log("Dados da empresa carregados da URL:", { cliente, unidade, subLocal });
    } else {
      // Tentar carregar do localStorage como fallback
      try {
        const empresaSelecionada = localStorage.getItem("empresaSelecionada");
        if (empresaSelecionada) {
          const dados = JSON.parse(empresaSelecionada);
          setEmpresaInfo({
            cliente: dados.cliente || '',
            unidade: dados.unidade || '',
            subLocal: dados.subLocal || ''
          });
          console.log("Dados da empresa carregados do localStorage:", dados);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        setError("Erro ao carregar dados da empresa. Por favor retorne e selecione novamente.");
      }
    }
  }, [searchParams]);

  // Função para buscar detalhes de um equipamento específico
  const fetchEquipamentoDetails = async (equipamentoId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/equipamentos/${equipamentoId}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const equipamento = await response.json();
      
      if (equipamento) {
        // Preencher os campos com os dados do equipamento
        setTipoSelecionado(equipamento.tipo);
        // Carregar os modelos primeiro antes de selecionar
        await fetchTiposEquipamento();
        setModeloSelecionado(equipamento.modelo);
        // Carregar as séries antes de selecionar
        await fetchModelos(equipamento.tipo);
        
        // Verificar se o número de série está na lista ou é manual
        if (numerosDeSerie.includes(equipamento.numeroSerie)) {
          setSerieSelecionada(equipamento.numeroSerie);
        } else {
          setSerieManual(equipamento.numeroSerie);
        }
        
        console.log("Equipamento carregado:", equipamento);
      } else {
        setError("Equipamento não encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes do equipamento:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Buscar tipos de equipamentos usando a nova API unificada
  const fetchTiposEquipamento = async () => {
    if (!empresaInfo.cliente || !empresaInfo.unidade) {
      return; // Não buscar se não tiver informações da empresa
    }

    setLoading(true);
    setError(null);

    try {
      // Usar a nova API unificada com o parâmetro busca=tipos
      const url = `/api/equipamentos/selecao?busca=tipos&cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}`;
      console.log("Buscando tipos URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setTiposEquipamento(data);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        // Usando dados estáticos como fallback em caso de lista vazia
        console.log("Nenhum tipo encontrado, usando fallback");
        setTiposEquipamento(["Tipo 1", "Tipo 2", "Tipo 3", "Tipo 4", "Tipo 5"]);
      }
    } catch (err) {
      console.error("Erro ao buscar tipos de equipamento:", err);
      setError(err.message);
      // Usando dados estáticos como fallback
      setTiposEquipamento(["Tipo 1", "Tipo 2", "Tipo 3", "Tipo 4", "Tipo 5"]);
    } finally {
      setLoading(false);
    }
  };

  // Executar fetchTiposEquipamento quando empresaInfo mudar
  useEffect(() => {
    fetchTiposEquipamento();
  }, [empresaInfo]);

  // Buscar modelo quando um tipo é selecionado usando a nova API unificada
  const fetchModelos = async (tipo = tipoSelecionado) => {
    if (!tipo || !empresaInfo.cliente || !empresaInfo.unidade) {
      setModelosEquipamento([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Usar a nova API unificada com o parâmetro busca=modelos
      const url = `/api/equipamentos/selecao?busca=modelos&cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}&tipo=${encodeURIComponent(tipo)}`;
      console.log("Buscando modelos URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Modelos recebidos:", data);

      if (Array.isArray(data) && data.length > 0) {
        setModelosEquipamento(data);
        return data; // Retornar dados para uso em outras funções
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        // Usando dados estáticos como fallback
        const fallbackData = [
          "Modelo A",
          "Modelo B",
          "Modelo C",
          "Modelo D",
          "Modelo E",
        ];
        setModelosEquipamento(fallbackData);
        return fallbackData;
      }
    } catch (err) {
      console.error("Erro ao buscar modelos:", err);
      setError(err.message);
      // Usando dados estáticos como fallback
      const fallbackData = [
        "Modelo A",
        "Modelo B",
        "Modelo C",
        "Modelo D",
        "Modelo E",
      ];
      setModelosEquipamento(fallbackData);
      return fallbackData;
    } finally {
      setLoading(false);
    }
  };

  // Executar fetchModelos quando tipoSelecionado mudar
  useEffect(() => {
    if (tipoSelecionado) {
      fetchModelos();
    }
  }, [tipoSelecionado, empresaInfo]);

  // Buscar números de série quando um modelo é selecionado usando a nova API unificada
  const fetchNumerosSerie = async () => {
    if (!modeloSelecionado || !tipoSelecionado || !empresaInfo.cliente || !empresaInfo.unidade) {
      setNumerosDeSerie([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Usar a nova API unificada com o parâmetro busca=series
      const url = `/api/equipamentos/selecao?busca=series&cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}&tipo=${encodeURIComponent(tipoSelecionado)}&modelo=${encodeURIComponent(modeloSelecionado)}`;
      console.log("Buscando séries URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Séries recebidas:", data);

      if (Array.isArray(data) && data.length > 0) {
        setNumerosDeSerie(data);
        return data;
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        // Usando dados estáticos como fallback
        const fallbackData = ["SN001", "SN002", "SN003", "SN004", "SN005"];
        setNumerosDeSerie(fallbackData);
        return fallbackData;
      }
    } catch (err) {
      console.error("Erro ao buscar números de série:", err);
      setError(err.message);
      // Usando dados estáticos como fallback
      const fallbackData = ["SN001", "SN002", "SN003", "SN004", "SN005"];
      setNumerosDeSerie(fallbackData);
      return fallbackData;
    } finally {
      setLoading(false);
    }
  };

  // Executar fetchNumerosSerie quando modeloSelecionado mudar
  useEffect(() => {
    if (modeloSelecionado) {
      fetchNumerosSerie();
    }
  }, [tipoSelecionado, modeloSelecionado, empresaInfo]);

  const handleTipoChange = (tipo) => {
    console.log("Tipo selecionado:", tipo);
    setTipoSelecionado(tipo);
    setModeloSelecionado("");
    setSerieSelecionada("");
    setSerieManual("");
  };

  const handleModeloChange = (modelo) => {
    console.log("Modelo selecionado:", modelo);
    setModeloSelecionado(modelo);
    setSerieSelecionada("");
    setSerieManual("");
  };

  const handleSerieChange = (serie) => {
    setSerieSelecionada(serie);
    setSerieManual(""); // Limpar input manual quando selecionar da lista
  };

  const handleSerieManualChange = (e) => {
    setSerieManual(e.target.value);
    setSerieSelecionada(""); // Limpar seleção da lista quando digitar manualmente
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const numeroSerie = serieManual || serieSelecionada;

    if (!tipoSelecionado || !modeloSelecionado || !numeroSerie) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    // Dados do equipamento a serem salvos
    const equipamentoData = {
      tipo: tipoSelecionado,
      modelo: modeloSelecionado,
      numeroSerie,
      // Incluir informações da empresa para contexto
      cliente: empresaInfo.cliente,
      unidade: empresaInfo.unidade,
      subLocal: empresaInfo.subLocal,
      // Adicionar timestamp para rastreabilidade
      dataSelecionado: new Date().toISOString(),
      // Adicionar status para a vistoria
      statusVistoria: "pendente"
    };

    // Salvar seleções no localStorage
    localStorage.setItem("equipamentoSelecionado", JSON.stringify(equipamentoData));

    try {
      // Se estamos no modo de edição, atualizamos o equipamento existente
      if (isEditMode) {
        const equipamentoId = searchParams.get('equipamentoId');
        
        // Chamar API para atualizar o equipamento
        const response = await fetch(`/api/equipamentos/${equipamentoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(equipamentoData),
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao atualizar equipamento: ${response.statusText}`);
        }
        
        console.log("Equipamento atualizado com sucesso!");
      } else {
        // Caso contrário, registramos um novo equipamento para vistoria
        const response = await fetch('/api/equipamentos/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(equipamentoData),
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao registrar equipamento: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Equipamento registrado com sucesso!", result);
        
        // Guardar o ID do equipamento recém-criado
        if (result.id) {
          equipamentoData.id = result.id;
          localStorage.setItem("equipamentoSelecionado", JSON.stringify(equipamentoData));
        }
      }
      
      // Aqui os dados foram salvos com sucesso
      console.log("Dados do equipamento salvos:", equipamentoData);
      
      // O redirecionamento será feito pelo Link ao redor do botão
    } catch (err) {
      console.error("Erro ao processar seleção do equipamento:", err);
      setError(`Erro ao processar seleção: ${err.message}`);
    }
  };

  // Função para verificar se o botão deve ser desabilitado
  const isButtonDisabled = () => {
    return !tipoSelecionado || 
           !modeloSelecionado || 
           (!serieSelecionada && !serieManual) || 
           loading;
  };

  return (
    <div className="relative w-screen h-screen flex justify-center flex-col items-center p-4 lg:py-8 gap-3">
      {/* Informação da empresa selecionada */}
      {empresaInfo.cliente && (
        <div className="mb-4 text-white text-center">
          <p className="font-medium">
            {empresaInfo.cliente} - {empresaInfo.unidade}
            {empresaInfo.subLocal && ` - ${empresaInfo.subLocal}`}
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-3 text-[#ffffff]">
        {isEditMode ? "Editar Equipamento" : "Selecionar Equipamento"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
        <InputSelect
          labelText="Tipo"
          inputHeight="50px"
          showIcon
          textStyle="text-xl font-medium text-[#01AAAD]"
          opcoes={tiposEquipamento}
          value={tipoSelecionado}
          onChange={handleTipoChange}
          disabled={loading || !empresaInfo.cliente}
        />
        <InputSelect
          labelText="Modelo"
          inputHeight="50px"
          showIcon
          textStyle="text-xl font-medium text-[#01AAAD]"
          opcoes={modelosEquipamento}
          value={modeloSelecionado}
          onChange={handleModeloChange}
          disabled={!tipoSelecionado || loading}
        />
        <InputSelect
          labelText="n° série"
          inputHeight="50px"
          showIcon
          textStyle="text-xl font-medium text-[#01AAAD]"
          opcoes={numerosDeSerie}
          value={serieSelecionada}
          onChange={handleSerieChange}
          disabled={!modeloSelecionado || loading}
        />
        <InputText
          inputHeight="50px"
          InputPlaceholder="Digite o n° de serie"
          textStyle="text-center text-xl font-medium text-[#01AAAD]"
          inputMargin="18px 0 0 0"
          value={serieManual}
          onChange={handleSerieManualChange}
          onEnter={(value) => {
            setSerieManual(value); 
            setSerieSelecionada(""); 
          }}
          disabled={loading}
        />

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-2">
            {error}
          </div>
        )}
        
        <Link 
          href={{
            pathname: "/equipamentoselecionado",
            query: {
              cliente: empresaInfo.cliente,
              unidade: empresaInfo.unidade,
              subLocal: empresaInfo.subLocal,
              tipo: tipoSelecionado,
              modelo: modeloSelecionado,
              serie: serieManual || serieSelecionada,
              // Se estamos em modo de edição, passar o ID do equipamento
              ...(isEditMode ? { equipamentoId: searchParams.get('equipamentoId') } : {})
            }
          }}
          onClick={(e) => {
            if (isButtonDisabled()) {
              e.preventDefault();
              setError("Por favor, preencha todos os campos");
              return;
            }
            handleSubmit();
          }}
        >
          <Button
            textButton={isEditMode ? "Atualizar" : "Selecionar"}
            type="button"
            disabled={isButtonDisabled()}
          />
        </Link>
      </form>

      {loading && <div className="mt-4 text-white">Carregando...</div>}

      {/* Botão para voltar para a lista */}
      <Link 
        href={`/listaequipamentos?cliente=${empresaInfo.cliente}&unidade=${empresaInfo.unidade}${empresaInfo.subLocal ? `&subLocal=${empresaInfo.subLocal}` : ''}`}
        className="mt-6 text-white underline"
      >
        Voltar para a lista
      </Link>
    </div>
  );
}

export default SelectEquipment;