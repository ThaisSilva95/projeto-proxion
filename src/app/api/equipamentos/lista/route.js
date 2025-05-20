"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import Button from "../../Componentes/Button/Button";
import InputSelect from "../../Componentes/InputSelect/InputSelect";
import InputText from "../../Componentes/InputText/InputText";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SelectEquipment() {
  const searchParams = useSearchParams();
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

  // Obter parâmetros da URL
  useEffect(() => {
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    const subLocal = searchParams.get('subLocal');

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
  
  // Buscar tipos de equipamentos ao carregar a página
  useEffect(() => {
    const fetchTiposEquipamento = async () => {
      if (!empresaInfo.cliente || !empresaInfo.unidade) {
        return; // Não buscar se não tiver informações da empresa
      }

      setLoading(true);
      setError(null);

      try {
        // Adicionar parâmetros da empresa à requisição
        const url = `/api/equipamentos/tipos?cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}`;
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

    fetchTiposEquipamento();
  }, [empresaInfo]);

  // Buscar modelo quando um tipo é selecionado
  useEffect(() => {
    if (!tipoSelecionado || !empresaInfo.cliente || !empresaInfo.unidade) {
      setModelosEquipamento([]);
      return;
    }

    const fetchModelos = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `/api/equipamentos/modelos?cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}&tipo=${encodeURIComponent(tipoSelecionado)}`;
        console.log("Buscando modelos URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Modelos recebidos:", data);

        if (Array.isArray(data) && data.length > 0) {
          setModelosEquipamento(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setModelosEquipamento([]);
          setError("Nenhum modelo encontrado para este tipo");
          
          // Usando dados estáticos como fallback
          setModelosEquipamento([
            "Modelo A",
            "Modelo B",
            "Modelo C",
            "Modelo D",
            "Modelo E",
          ]);
        }
      } catch (err) {
        console.error("Erro ao buscar modelos:", err);
        setError(err.message);
        // Usando dados estáticos como fallback
        setModelosEquipamento([
          "Modelo A",
          "Modelo B",
          "Modelo C",
          "Modelo D",
          "Modelo E",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchModelos();
  }, [tipoSelecionado, empresaInfo]);

  // Buscar números de série quando um modelo é selecionado
  useEffect(() => {
    if (!modeloSelecionado || !tipoSelecionado || !empresaInfo.cliente || !empresaInfo.unidade) {
      setNumerosDeSerie([]);
      return;
    }

    const fetchNumerosSerie = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `/api/equipamentos/series?cliente=${encodeURIComponent(empresaInfo.cliente)}&unidade=${encodeURIComponent(empresaInfo.unidade)}${empresaInfo.subLocal ? `&subLocal=${encodeURIComponent(empresaInfo.subLocal)}` : ''}&tipo=${encodeURIComponent(tipoSelecionado)}&modelo=${encodeURIComponent(modeloSelecionado)}`;
        console.log("Buscando séries URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Séries recebidas:", data);

        if (Array.isArray(data) && data.length > 0) {
          setNumerosDeSerie(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setNumerosDeSerie([]);
          setError("Nenhum número de série encontrado para este modelo");
          
          // Usando dados estáticos como fallback
          setNumerosDeSerie(["SN001", "SN002", "SN003", "SN004", "SN005"]);
        }
      } catch (err) {
        console.error("Erro ao buscar números de série:", err);
        setError(err.message);
        // Usando dados estáticos como fallback
        setNumerosDeSerie(["SN001", "SN002", "SN003", "SN004", "SN005"]);
      } finally {
        setLoading(false);
      }
    };

    fetchNumerosSerie();
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

    // Salvar seleções no localStorage incluindo informações da empresa
    localStorage.setItem("equipamentoSelecionado", JSON.stringify({
      tipo: tipoSelecionado,
      modelo: modeloSelecionado,
      numeroSerie,
      // Incluir informações da empresa para contexto
      cliente: empresaInfo.cliente,
      unidade: empresaInfo.unidade,
      subLocal: empresaInfo.subLocal
    }));

    // Aqui você pode navegar para a próxima página ou enviar os dados para o servidor
    console.log("Dados selecionados:", {
      tipo: tipoSelecionado,
      modelo: modeloSelecionado,
      numeroSerie,
      ...empresaInfo
    });

    // O redirecionamento será feito pelo Link ao redor do botão
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
        Selecionar Equipamento
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
            pathname: "/vistoriaequipamento",
            query: {
              cliente: empresaInfo.cliente,
              unidade: empresaInfo.unidade,
              subLocal: empresaInfo.subLocal,
              tipo: tipoSelecionado,
              modelo: modeloSelecionado,
              serie: serieManual || serieSelecionada
            }
          }}
          onClick={(e) => {
            if (!tipoSelecionado || !modeloSelecionado || (!serieSelecionada && !serieManual)) {
              e.preventDefault();
              setError("Por favor, preencha todos os campos");
              return;
            }
            handleSubmit();
          }}
        >
          <Button
            textButton="Selecionar"
            type="button"
            disabled={
              !tipoSelecionado ||
              !modeloSelecionado ||
              (!serieSelecionada && !serieManual) ||
              loading
            }
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