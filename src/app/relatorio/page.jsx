'use client';

import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);


export default function Relatorio() {
    const relatorioRef = useRef(null);
    const [html2pdfLib, setHtml2pdfLib] = useState(null);

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


    useEffect(() => {
        import('html2pdf.js').then((mod) => {
            setHtml2pdfLib(mod);
        });
    }, []);

    //Dados para o Gráfico de pizza
    const dadosPorTipo = [
        {
            tipo: 'Danificado',
            valor: 12,
            subcategorias: [
                { nivel: 'Leve', valor: 1 },
                { nivel: 'Médio', valor: 7 },
                { nivel: 'Grave', valor: 4 }
            ]
        },
        { tipo: 'Em Produção', valor: 25 },
        {
            tipo: 'Disponivel', valor: 16
        },

        { tipo: 'Em Manutenção', valor: 1 },
        { tipo: 'Indisponível', valor: 47 },
    ];

    //Dados para o garfico de barras
    const dadosPorEquipamento = [
        {
            equipamento: 'Coletor de Dados',
            valor: 49,
            substatus: [
                { status: 'Danificado', valor: 3 },
                { status: 'Em Produção', valor: 7 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 15 },
                { status: 'Disponível', valor: 24 },
            ]
        },
        {
            equipamento: 'Impressora Industrial',
            valor: 44,
            substatus: [
                { status: 'Danificado', valor: 19 },
                { status: 'Em Produção', valor: 7 },
                { status: 'Manutenção', valor: 1 },
                { status: 'Indisponível', valor: 15 },
                { status: 'Disponível', valor: 2 },
            ]
        },
        {
            equipamento: 'Leitor BarCode',
            valor: 48,
            substatus: [
                { status: 'Danificado', valor: 0 },
                { status: 'Em Produção', valor: 13 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 35 },
                { status: 'Disponível', valor: 0 },
            ]
        },
        {
            equipamento: 'Leitor Fixo Barcode',
            valor: 5,
            substatus: [
                { status: 'Danificado', valor: 1 },
                { status: 'Em Produção', valor: 4 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 0 },
                { status: 'Disponível', valor: 0 },
            ]
        },
        {
            equipamento: 'Leitor Fixo RFID',
            valor: 10,
            substatus: [
                { status: 'Danificado', valor: 0 },
                { status: 'Em Produção', valor: 6 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 4 },
                { status: 'Disponível', valor: 0 },
            ]
        },
        {
            equipamento: 'SLED RFID',
            valor: 14,
            substatus: [
                { status: 'Danificado', valor: 0 },
                { status: 'Em Produção', valor: 4 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 10 },
                { status: 'Disponível', valor: 0 },
            ]
        },
        {
            equipamento: 'Impressora desktop',
            valor: 48,
            substatus: [
                { status: 'Danificado', valor: 0 },
                { status: 'Em Produção', valor: 13 },
                { status: 'Manutenção', valor: 0 },
                { status: 'Indisponível', valor: 50 },
                { status: 'Disponível', valor: 0 },
            ]
        },

    ];

    // dados da tabela de lista de equipamento
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
        { tipo: 'Coletor de Dados', modelo: 'MC9300', serial: 'S21217524200037', status: 'Indisponível', observacoes: '', intensidade: 'Leve' },
    ]
    );

    //definir altura máximo do gráfico de barras
    const maxGraficoAltura = 150;
    const maiorValor = Math.max(...dadosPorTipo.map(item => item.valor));

    //função para buscar os dados dos itens identificados como danificado
    const danificado = dadosPorTipo.find(item => item.tipo === 'Danificado');
    const leve = danificado?.subcategorias.find(sub => sub.nivel === 'Leve')?.valor || 0;
    const medio = danificado?.subcategorias.find(sub => sub.nivel === 'Médio')?.valor || 0;
    const grave = danificado?.subcategorias.find(sub => sub.nivel === 'Grave')?.valor || 0;

    //configuração do gráfico
    const options1 = {
        rotation: 20 * Math.PI,
        plugins: {
            legend: {
                display: false, // remove a legenda
            },
            tooltip: {
                enabled: false, // desativa o tooltip ao passar o mouse
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 'semibold',
                    size: 8,
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(0);
                    return `${percentage}%`;
                },
            },
        },
    };

    //configuração do gráfico de pizza
    const dataPrincipal = {
        labels: dadosPorTipo.map(item => item.tipo),
        datasets: [
            {
                data: dadosPorTipo.map(item => item.valor),
                backgroundColor: [
                    '#FFCC00', // Danificado
                    '#2CB1B7', // Em Produção
                    '#404040', // Disponível
                    '#1F4E78', // Em Manutenção
                    '#D3D3D3', // Indisponível

                ],
                borderWidth: 1,
            },
        ],
    };

    //cores da intensidade da lista equipamento
    const dataDanificados = {
        labels: ['Leve', 'Médio', 'Grave'],
        datasets: [
            {
                data: [leve, medio, grave],
                backgroundColor: ['#FF7B00', '#FF1919', '#8E0000'],
                borderWidth: 1,
            },
        ],
    };

    //Tabela 1 dos parametros de avaliação
    const parametros1 = [
        { tipoequipamento: "Access Point", parametro: "Antena" },
        { tipoequipamento: "Access Point", parametro: "Carcaça" },
        { tipoequipamento: "Access Point", parametro: "Comunicação" },
        { tipoequipamento: "Access Point", parametro: "Configuração" },
        { tipoequipamento: "Access Point", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Acessório", parametro: "Carcaça" },
        { tipoequipamento: "Acessório", parametro: "Comunicação" },
        { tipoequipamento: "Acessório", parametro: "Configuração" },
        { tipoequipamento: "Coletor de Dados", parametro: "Antena RFID" },
        { tipoequipamento: "Coletor de Dados", parametro: "Borracha de Proteção" },
        { tipoequipamento: "Coletor de Dados", parametro: "Carcaça" },
        { tipoequipamento: "Coletor de Dados", parametro: "Comunicação" },
        { tipoequipamento: "Coletor de Dados", parametro: "Configuração" },
        { tipoequipamento: "Coletor de Dados", parametro: "Engine" },
        { tipoequipamento: "Coletor de Dados", parametro: "Gatilho" },
        { tipoequipamento: "Coletor de Dados", parametro: "LCD" },
        { tipoequipamento: "Coletor de Dados", parametro: "Não liga" },
        { tipoequipamento: "Coletor de Dados", parametro: "Pinos de Conexão" },
        { tipoequipamento: "Coletor de Dados", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Coletor de Dados", parametro: "Teclado" },
        { tipoequipamento: "Coletor de Dados", parametro: "Tela" },
        { tipoequipamento: "Coletor de Dados", parametro: "Trava da Bateria" },
        { tipoequipamento: "Coletor de Dados", parametro: "Vidro do Engine" },
        { tipoequipamento: "Impressora Desktop", parametro: "Cabeça de Impressão" },
        { tipoequipamento: "Impressora Desktop", parametro: "Carcaça" },
        { tipoequipamento: "Impressora Desktop", parametro: "Comunicação" },
        { tipoequipamento: "Impressora Desktop", parametro: "Configuração" },
        { tipoequipamento: "Impressora Desktop", parametro: "Módulo RFID" },
        { tipoequipamento: "Impressora Desktop", parametro: "Não liga" },
        { tipoequipamento: "Impressora Desktop", parametro: "Rolete" },
        { tipoequipamento: "Impressora Desktop", parametro: "Sensor da Tampa" },
        { tipoequipamento: "Impressora Desktop", parametro: "Sensor de Mídia" },
        { tipoequipamento: "Impressora Desktop", parametro: "Sensor do Ribbon" },
        { tipoequipamento: "Impressora Desktop", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Impressora Desktop", parametro: "Suporte Mídia" },
        { tipoequipamento: "Impressora Desktop", parametro: "Suporte Ribbon" },
        { tipoequipamento: "Impressora Desktop", parametro: "Teclado" },
        { tipoequipamento: "Impressora Desktop", parametro: "Trava da Tampa" },
        { tipoequipamento: "Impressora Industrial", parametro: "Cabeça de Impressão" },
        { tipoequipamento: "Impressora Industrial", parametro: "Carcaça" },
        { tipoequipamento: "Impressora Industrial", parametro: "Configuração" },
        { tipoequipamento: "Impressora Industrial", parametro: "Cutter" },
        { tipoequipamento: "Impressora Industrial", parametro: "Módulo RFID" },
        { tipoequipamento: "Impressora Industrial", parametro: "Rebobinador/Peel off" },
        { tipoequipamento: "Impressora Industrial", parametro: "Rolete" },
        { tipoequipamento: "Impressora Industrial", parametro: "Sensor da Cabeça de Impressão" },
        { tipoequipamento: "Impressora Industrial", parametro: "Sensor de Mídia" },
        { tipoequipamento: "Impressora Industrial", parametro: "Sensor do Ribbon" },
        { tipoequipamento: "Impressora Industrial", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Impressora Industrial", parametro: "Suporte Mídia" },
        { tipoequipamento: "Impressora Industrial", parametro: "Suporte Ribbon" },
        { tipoequipamento: "Impressora Industrial", parametro: "Teclado" },
        { tipoequipamento: "Impressora Industrial", parametro: "Tela" },
        { tipoequipamento: "Impressora Industrial", parametro: "Trava da Cabeça de Impressão" },
        { tipoequipamento: "Impressora Portátil", parametro: "Borracha de Proteção" },
        { tipoequipamento: "Impressora Portátil", parametro: "Cabeça de Impressão" },
        { tipoequipamento: "Impressora Portátil", parametro: "Carcaça" },
        { tipoequipamento: "Impressora Portátil", parametro: "Comunicação" },
        { tipoequipamento: "Impressora Portátil", parametro: "Configuração" },
        { tipoequipamento: "Impressora Portátil", parametro: "Não liga" },
        { tipoequipamento: "Impressora Portátil", parametro: "Rolete" },
        { tipoequipamento: "Impressora Portátil", parametro: "Sensor da Tampa" },
        { tipoequipamento: "Impressora Portátil", parametro: "Sensor de Mídia" },
        { tipoequipamento: "Impressora Portátil", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Impressora Portátil", parametro: "Suporte Mídia" },
        { tipoequipamento: "Impressora Portátil", parametro: "Teclado" },
        { tipoequipamento: "Impressora Portátil", parametro: "Teclado" },
        { tipoequipamento: "Impressora Portátil", parametro: "Tela" },
        { tipoequipamento: "Impressora Portátil", parametro: "Trava da Bateria" },
        { tipoequipamento: "Impressora Portátil", parametro: "Trava da Tampa" },
        { tipoequipamento: "Leitor Barcode", parametro: "Antena RFID" },
        { tipoequipamento: "Leitor Barcode", parametro: "Borracha de Proteção" },
        { tipoequipamento: "Leitor Barcode", parametro: "Carcaça" },
        { tipoequipamento: "Leitor Barcode", parametro: "Comunicação" },
        { tipoequipamento: "Leitor Barcode", parametro: "Configuração" },
        { tipoequipamento: "Leitor Barcode", parametro: "Engine" },
        { tipoequipamento: "Leitor Barcode", parametro: "Gatilho" },
        { tipoequipamento: "Leitor Barcode", parametro: "Não liga" },
        { tipoequipamento: "Leitor Barcode", parametro: "Software / Firmware" },



    ];

    //Tabela 2 dos parametros de avaliação
    const parametros2 = [
        { tipoequipamento: "Leitor Barcode", parametro: "Trava da Bateria" },
        { tipoequipamento: "Leitor Barcode", parametro: "Vidro do Engine" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Carcaça" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Comunicação" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Configuração" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Engine" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Não liga" },
        { tipoequipamento: "Leitor Fixo Barcode", parametro: "Vidro do Engine" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Antena" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Carcaça" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Comunicação Ethernet" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Conector de Antena" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Configuração" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "LED" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Não liga" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Pinos de Conexão" },
        { tipoequipamento: "Leitor Fixo RFID", parametro: "Software / Sistema Operacional" },
        { tipoequipamento: "Sled RFID", parametro: "Antena RFID" },
        { tipoequipamento: "Sled RFID", parametro: "Carcaça" },
        { tipoequipamento: "Sled RFID", parametro: "Comunicação" },
        { tipoequipamento: "Sled RFID", parametro: "Configuração" },
        { tipoequipamento: "Sled RFID", parametro: "Engine" },
        { tipoequipamento: "Sled RFID", parametro: "Gatilho" },
        { tipoequipamento: "Sled RFID", parametro: "Suporte do Device" },
        { tipoequipamento: "Sled RFID", parametro: "Teclado" },
        { tipoequipamento: "Sled RFID", parametro: "Vidro do Engine" }
    ];


    // Configurações de paginação para PDF
    const LINHAS_POR_PAGINA = 41; // Número máximo de linhas por página para caber no PDF

    // Calcula o total de páginas com base no número de equipamentos da lista de equipamentos
    const totalPaginas = Math.ceil(equipamentos.length / LINHAS_POR_PAGINA);

    // Função para renderizar o status com a cor correta na lista de equipamento
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


    const coresStatus = {
        'Danificado': '#FFCC00',
        'Em Produção': '#2CB1B7',
        'Disponível': '#404040',
        'Manutenção': '#1F4E78',
        'Indisponível': '#D3D3D3'
    };

    const statusList = Object.keys(coresStatus);
    const labels = (dadosPorEquipamento ?? []).map(item => item.equipamento);


    //função para ler a lista de equipamentos
    const datasets = statusList.map(status => ({
        label: status,
        data: dadosPorEquipamento.map(equip => {
            const sub = equip.substatus.find(s => s.status === status);
            return sub ? sub.valor : 0;
        }),
        backgroundColor: coresStatus[status],
        datalabels: {
            color: function (context) {
                return context.dataset.backgroundColor;
            },
            font: {
                size: 10,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'top',
            formatter: value => value // mostra até o zero
        }
    }));

    // Calcular o valor máximo em todos os datasets para definir o limite do eixo Y
    const maxValue = useMemo(() => {
        let max = 0;
        datasets.forEach(dataset => {
            dataset.data.forEach(value => {
                if (value > max) max = value;
            });
        });
        return max;
    }, [datasets]);

    const data = useMemo(() => ({
        labels,
        datasets
    }), [dadosPorEquipamento]);


    //função de configuraçaõ do gráfico de barras
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
                display: true
            }
        },
        scales: {
            x: {
                stacked: false,
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                beginAtZero: true,
                suggestedMax: maxValue + 1, // Adiciona uma linha extra ao máximo
                ticks: {
                    font: {
                        size: 10
                    },
                    // Garante que sempre teremos um espaço adicional
                    callback: function (value, index, values) {
                        if (index === values.length - 1) {
                            // Se for o último tick, adicione um extra
                            return value;
                        }
                        return value;
                    }
                }
            }
        }
    };

    // Função para criar as linhas da tabela
    const createTableRows = (parametros, maxRows = 41) => {
        // Calcula quantas linhas vazias são necessárias para preencher a página
        const totalParametros = parametros.length;
        const emptyRowsNeeded = Math.max(0, maxRows - Math.ceil(totalParametros / 2));

        // Adiciona linhas vazias ao array para preencher a página
        const parametrosComLinhasVazias = [...parametros];
        for (let i = 0; i < emptyRowsNeeded * 2; i++) {
            parametrosComLinhasVazias.push({ tipoequipamento: "", parametro: "" });
        }

        // Divide os dados em duas colunas
        const firstColumn = parametrosComLinhasVazias.slice(0, Math.ceil(parametrosComLinhasVazias.length / 2));
        const secondColumn = parametrosComLinhasVazias.slice(Math.ceil(parametrosComLinhasVazias.length / 2));

        // Cria as linhas da tabela pareando os dados das duas colunas
        const tableRows = [];
        const maxLength = Math.max(firstColumn.length, secondColumn.length);

        for (let i = 0; i < maxLength; i++) {
            const item1 = firstColumn[i];
            const item2 = secondColumn[i];

            tableRows.push({
                col1Tipo: item1?.tipoequipamento || '',
                col1Parametro: item1?.parametro || '',
                col2Tipo: item2?.tipoequipamento || '',
                col2Parametro: item2?.parametro || ''
            });
        }

        return tableRows;
    };

    const tableRows1 = createTableRows(parametros1);
    const tableRows2 = createTableRows(parametros2);

    return (
        <div className="flex flex-col items-center p-4 relative overflow-x-auto">
            <button
                onClick={exportarPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Exportar PDF
            </button>

            <div id="relatorio" ref={relatorioRef}>
                {/* CAPA */}
                <div className="w-full h-full flex flex-col justify-between page">

                    <div className="w-full">
                        <img
                            src='/img/toporelatorio.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>

                    <div className="w-full flex flex-col items-end pr-5">
                        <img
                            src='/img/logokenvue.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '50%', height: 'auto', display: 'block' }}
                        />
                    </div>

                    <div className="text-sm text-gray-700 mt-1 space-y-2 text-left ml-auto mr-20 w-fit">
                        <h2 className="font-bold text-lg mb-2 ml-7">Dados da Visita</h2>
                        <div className="border-l-2 border-gray-300 pl-8 space-y-2 mr-15">
                            <p>Cliente: <strong>Kenvue</strong></p>
                            <p>Código: <strong>ABC123</strong></p>
                            <p>Responsável: <strong>Maria Oliveira</strong></p>
                            <p>E-mail: <strong>maria@empresa.com</strong></p>
                            <p>Telefone: <strong>(12) 98765-4321</strong></p>
                            <p>Cidade: <strong>São José dos Campos</strong></p>
                            <p>Data: <strong>08/05/2025</strong></p>
                            <p>Analista: <strong>João Souza</strong></p>
                        </div>
                    </div>


                    <div className="w-full mt-10">
                        <img
                            src='/img/footer.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                </div>

                {/* PÁGINA DE GRÁFICOS */}
                <div className="w-full h-full flex flex-col justify-between page ">

                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h1 className="font-bold text-lg text-gray-600" >Manutenção Preventiva</h1>
                            <p className="text-sm text-gray-600 ">Relatório dos Serviços Executados</p>
                        </div>
                        <img
                            src='/img/logokenvue.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '25%', height: 'auto', display: 'block' }}
                        />
                    </div>

                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center">
                        <p className="text-white text-sm relative -top-2">
                            Resumo
                        </p>
                    </div>

                    <div className='w-full text-gray text-xs font-regular py-1 px-2 mt-2 mb-3 flex items-center justify-between'>
                        <span className='flex-1 text-center h-6 border-b-4 border-[#2CB1B7] mx-1'>Em Produção</span>
                        <span className='flex-1 text-center h-6 border-b-4 border-[#404040] mx-1'>Disponível</span>
                        <span className='flex-1 text-center h-6 border-b-4 border-[#1F4E78] mx-1'>Em Manutenção</span>
                        <span className='flex-1 text-center h-6 border-b-4 border-[#FFCC00] mx-1'>Danificado</span>
                    </div>


                    <div className=' flex justify-end text-xs mb-2 mr-1.5'>
                        <div className='flex items-center gap-1'>
                            <div className='w-[50px] h-6 text-center border-b-4 border-[#FF7B00] mx-1 '>
                                <span>Leve</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='w-[52px] h-6 text-center border-b-4 border-[#FF1919] mx-1 '>
                                <span>Médio</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='w-[50px] h-6 text-center border-b-4 border-[#8E0000] mx-1 '>
                                <span>Grave</span>
                            </div>
                        </div>
                    </div>

                    <div className=" mb-1">
                        <h1 className="font-semibold mb-2 h-8 border-b-2">Visão Geral</h1>

                        <div className="relative flex justify-center items-center gap-12 mt-6 mb-6">

                            {/* Gráfico de Pizza MAIOR */}
                            <div className="w-60 h-60">
                                <Pie data={dataPrincipal} options={options1} />
                            </div>

                            {/* Linha de Conexão */}
                            <div className="absolute left-1/2 top-1/2 w-14 border-t-2 border-gray-300 rotate-[25deg] translate-x-12 -translate-y-4"></div>

                            {/* Gráfico Empilhado MENOR */}
                            {danificado && (
                                <div className="flex flex-col items-center">

                                    <div className="w-20 h-36 flex flex-col justify-end shadow-md rounded overflow-hidden border border-gray-300">
                                        {[
                                            { label: 'Grave', value: grave, color: '#8E0000' },
                                            { label: 'Médio', value: medio, color: '#FF1919' },
                                            { label: 'Leve', value: leve, color: '#FF7B00' },
                                        ].map((item, index) => {
                                            const totalEquipamentos = dadosPorTipo.reduce((sum, tipo) => sum + tipo.valor, 0);
                                            const heightPercent = (item.value / (leve + medio + grave || 1)) * 100; // Altura proporcional só entre danificados
                                            const percentTotal = ((item.value / totalEquipamentos) * 100).toFixed(0); // Texto com base no total

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-center text-white text-[8px] font-semibold  "
                                                    style={{
                                                        height: `${heightPercent}%`,
                                                        backgroundColor: item.color,
                                                    }}
                                                >
                                                    {item.value > 0 && `${Math.round((item.value / totalEquipamentos) * 100)}%`}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="w-full h-full p-4">
                            <h2 className="text-md font-semibold text-gray-600 mb-4">Visão por Tipo de Equipamento</h2>
                            <div className="w-full max-w-5xl mx-auto">
                                <Bar data={data} options={options} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full border-t-2 border-gray-200"></div>


                    <p className='text-xs mb-2'>
                        » Em Produção: Equipamento, em operação, sem defeitos encontrados. <br />
                        » Disponível: Equipamento funcionando mas não está sendo utilizado. <br />
                        » Danificado: Equipamento com avarias que estão prejudicando a operação. <br />
                        » Em Manutenção: Equipamento não encontrava-se disponível pois está sendo reparado em laboratório. <br />
                        » Indisponível: Equipamento não encontrava-se disponível para preventiva no dia marcado para realização do serviço.
                    </p>


                    <div className="w-full mt-4 pt-2 border-t border-gray-300" style={{ pageBreakInside: 'avoid' }}>
                        <div className="flex items-center text-xs text-gray-600 gap-3">
                            <img
                                src='/img/logoproxion.png'
                                alt="Logo Proxion"
                                loading="eager"
                                style={{ width: '10%', height: 'auto', display: 'block' }}
                            />
                            <p>
                                Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP -
                                CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* PÁGINA DE LISTA DE EQUIPAMENTOS */}
                <div className="w-full h-full flex flex-col justify-between page-break">
                    {Array.from({ length: totalPaginas }).map((_, pageIndex) => {
                        // Dados para a página atual
                        const startIndex = pageIndex * LINHAS_POR_PAGINA;
                        const endIndex = Math.min(startIndex + LINHAS_POR_PAGINA, equipamentos.length);
                        const equipamentosDaPagina = equipamentos.slice(startIndex, endIndex);

                        return (
                            <div
                                key={`page-${pageIndex}`}
                                className={pageIndex > 0 ? "page-break-before" : ""}
                                style={{ pageBreakBefore: pageIndex > 0 ? 'always' : 'auto' }}
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

                                        </tbody>
                                    </table>
                                </div>

                                {/* Rodapé - Repetido em todas as páginas */}
                                <div className="w-full mt-4 pt-1 border-t border-gray-300" style={{ pageBreakInside: 'avoid' }} >
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

                {/* PÁGINA DE PARÂMETROS 1 */}
                <div className="w-full h-full flex flex-col justify-between page no-break">

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-bold text-lg text-gray-600" >Manutenção Preventiva</h1>
                            <p className="text-sm text-gray-600 ">Relatório dos Serviços Executados</p>
                        </div>
                        <img
                            src='/img/logokenvue.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '25%', height: 'auto', display: 'block' }}
                        />
                    </div>

                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center ">
                        <p className="text-white text-sm relative -top-2">
                            Parâmetros Avaliados por Tipo de Equipamento
                        </p>
                    </div>

                    {/* Tabela de Equipamentos */}
                    <div className="overflow-hidden border-t border-gray-300 w-full" >
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-xs relative -top-3 h-8">
                                    <th className="py-1 px-2 text-left border-b text-center">Tipo de Equipamento</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Parâmetro Avaliado</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Tipo de Equipamento</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Parâmetro Avaliado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows1.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="py-1 px-2 border-b text-xs text-center">
                                            <span className="relative -top-[5px]">{row.col1Tipo}</span></td>
                                        <td className="py-1 px-2 border-b text-xs text-center">
                                            <span className="relative -top-[5px]">{row.col1Parametro}</span> </td>
                                        <td className="py-1 px-2 border-b text-xs text-center">
                                            <span className="relative -top-[5px]">{row.col2Tipo} </span> </td>
                                        <td className="py-1 px-2 border-b text-xs text-center">
                                            <span className="relative -top-[5px]">{row.col2Parametro} </span> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full mt-2 pt-1 border-t border-gray-300 " style={{ pageBreakInside: 'avoid' }}>
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

                {/* PÁGINA DE PARÂMETROS 2 */}
                <div className="w-full h-full flex flex-col justify-between page ">
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
                            Parâmetros Avaliados por Tipo de Equipamento
                        </p>
                    </div>

                    {/* Tabela de Equipamentos */}
                    <div className="overflow-hidden border-t border-gray-300 w-full" >
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-xs relative -top-3 h-8">
                                    <th className="py-1 px-2 text-left border-b text-center">Tipo de Equipamento</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Parâmetro Avaliado</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Tipo de Equipamento</th>
                                    <th className="py-1 px-2 text-left border-b text-center">Parâmetro Avaliado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows2.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className={`py-1 px-2 border-b text-xs text-center ${row.col1Tipo === "" ? "py-2" : ""}`}>
                                            <span className="relative -top-[4px]">{row.col1Tipo} </span></td>
                                        <td className={`py-1 px-2 border-b text-xs text-center ${row.col1Tipo === "" ? "py-2" : ""}`}>
                                            <span className="relative -top-[4px]">{row.col1Parametro} </span></td>
                                        <td className={`py-1 px-2 border-b text-xs text-center ${row.col1Tipo === "" ? "py-2" : ""}`}>
                                            <span className="relative -top-[4px]">{row.col2Tipo} </span></td>
                                        <td className={`py-1 px-2 border-b text-xs text-center ${row.col1Tipo === "" ? "py-2" : ""}`}>
                                            <span className="relative -top-[4px]">{row.col2Parametro} </span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div className="w-full h-6 bg-gray-700 flex items-center justify-center mb-2">
                            <p className="text-white text-sm relative -top-2">
                                Notas do Analista
                            </p>
                        </div>

                        <div class="flex items-center h-40 justify-center px-4">
                            <input
                                type="text"
                                class="h-28 w-full max-w-md px-4 border border-gray-300 rounded outline-none"
                                
                            />
                        </div>

                    </div>

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

                {/* PÁGINA FINAL */}
                <div className="w-full h-full flex flex-col justify-between page" >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h1 className="font-bold text-lg text-gray-600" >Manutenção Preventiva</h1>
                            <p className="text-sm text-gray-600 ">Relatório dos Serviços Executados</p>
                        </div>
                        <img
                            src='/img/logokenvue.png'
                            alt="Topo"
                            loading="eager"
                            style={{ width: '25%', height: 'auto', display: 'block' }}
                        />
                    </div>

                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center">
                        <p className="text-white text-sm relative -top-2">
                            Próximos passos
                        </p>
                    </div>

                    <p className='text-xs font-semibold mb-2'>

                        Possui equipamentos danificados e deseja repará-los? Acesse nosso portal de suporte através do código QR, ou clicando no link abaixo, e abra um
                        ticket com o nosso time!<br />
                        (Caso você não saiba como abrir um ticket, existe um tutorial em nossa base de conhecimento, artigo que você também pode acessar através do QR
                        CODE “Tutorial”.)<br />
                        <br />
                        Feito isso, nós verificaremos seu cadastro e, caso você tenha contratado o serviço de "Leva e Traz", coletaremos o equipamento em sua unidade
                        para realizar a manutenção em laboratório.
                        Obs.: É importante que a NF de Remessa para Conserto seja emitida e enviada na abertura do ticket.
                    </p>

                    <div className="flex justify-center gap-10 flex-wrap p-6 bg-white">
                        {/* Card 1 */}
                        <div className="text-center shadow-md rounded-lg p-4 bg-gray-50 w-44">
                            <h3 className="text-teal-700 font-bold text-base mb-2">Portal de Suporte</h3>
                            <img src="/img/QRCodeSuporte.png" alt="QR Code Suporte" className="mx-auto mb-2 w-32 h-32 object-contain" />
                            <a
                                href="https://www.proxion.com.br/suporte"
                                className="text-teal-600 hover:underline text-xs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.proxion.com.br/suporte
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="text-center shadow-md rounded-lg p-4 bg-gray-50 w-40">
                            <h3 className="text-teal-700 font-bold text-base mb-2">Tutorial</h3>
                            <img src="/img/QRCodeTutorial.png" alt="QR Code Tutorial" className="mx-auto mb-2 w-32 h-32 object-contain" />
                            <a
                                href="https://www.proxion.com.br/kb"
                                className="text-teal-600 hover:underline text-xs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.proxion.com.br/kb
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="text-center shadow-md rounded-lg p-4 bg-gray-50 w-40">
                            <h3 className="text-teal-700 font-bold text-lg mb-2">Site</h3>
                            <img src="/img/QRCodeSite.png" alt="QR Code Site" className="mx-auto mb-2 w-32 h-32 object-contain" />
                            <a
                                href="https://www.proxion.com.br"
                                className="text-teal-600 hover:underline text-xs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.proxion.com.br
                            </a>
                        </div>
                    </div>

                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center">
                        <p className="text-white text-sm relative -top-2">
                            Horário de Atendimento
                        </p>
                    </div>

                    <div class="max-w-md mx-auto  bg-white rounded shadow mt-6">

                        <table class="table-auto w-full border-collapse text-left text-sm">

                            <thead>
                                <tr class="bg-gray-200 text-teal-800 font-semibold text-center -top-4">
                                    <th class="px-3 py-2">
                                        <span className="relative -top-[4px]">Atividade</span>
                                    </th>
                                    <th class="px-3 py-2">
                                        <span className="relative -top-[4px]">  Data </span>
                                    </th>
                                    <th class="px-3 py-2">
                                        <span className="relative -top-[4px]"> Hora</span>                                        </th>
                                </tr>
                            </thead>

                            <tbody class="text-gray-800">
                                <tr class="border-t">
                                    <td class="bg-gray-200 text-teal-800 font-semibold px-3 -top-4">
                                        <span className="relative -top-[4px]">Chegada ao Cliente</span>
                                    </td>
                                    <td class="px-3 py-2 -top-4">
                                        <span className="relative -top-[4px]">20/05/2024</span>
                                    </td>
                                    <td class="px-3 py-2 -top-4">
                                        <span className="relative -top-[4px]">09:30</span>
                                    </td>
                                </tr>
                                <tr class="border-t">
                                    <td class="bg-gray-200 text-teal-800 font-semibold px-3 -top-4">
                                        <span className="relative -top-[4px]">Saída do Cliente
                                        </span></td>
                                    <td class="px-3 py-2 -top-4">
                                        <span className="relative -top-[4px]">20/05/2024
                                        </span>
                                    </td>
                                    <td class="px-3 py-2 -top-4">
                                        <span className="relative -top-[4px]">13:00
                                        </span>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>


                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center mt-6">
                        <p className="text-white text-sm relative -top-2">
                            Analista Responsável
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-4">
                        <img
                            src="/img/AssinaturaFelipe.png"
                            alt="Assinatura"
                            className="h-20 object-contain "
                        />

                        <div className="border-t-2 border-black w-60 "></div>

                        <p className="text-sm text-black font-medium">Felipe Feveret</p>
                    </div>


                    <div className="w-full h-6 bg-gray-700 flex items-center justify-center">
                        <p className="text-white text-sm relative -top-2">
                            Aprovação
                        </p>
                    </div>

                    <p className='text-xs mb-2  font-semibold text-center'>
                        “Declaro estar ciente e concordar com as condições apresentadas neste relatório”.
                    </p>

                    <div className=' flex justify-between gap-10 flex-wrap p-6 bg-white'>
                        <div> <p className='text-xs font-semibold mb-2 '>
                            Nome Completo:<br />
                            RG:<br />
                            Cargo:<br />
                            Data:<br />
                        </p></div>

                        <div className='mt-8'>

                            <div className="border-t-2 border-black w-60 "></div>

                            <p className="text-sm text-black font-medium text-center">Assinatura</p>
                        </div>

                    </div>



                    <div className="w-full mt-4 pt-2 border-t border-gray-300" style={{ pageBreakInside: 'avoid' }}>
                        <div className="flex items-center text-xs text-gray-600 gap-3">
                            <img
                                src='/img/logoproxion.png'
                                alt="Logo Proxion"
                                loading="eager"
                                style={{ width: '10%', height: 'auto', display: 'block' }}
                            />
                            <p>
                                Proxion Solutions: Avenida Shishima Hifumi, 2911, Conj. 205, Parque Tecnológico UNIVAP Urbanova - São José dos Campos/SP -
                                CEP 12244-000 | +55 12 3202-9292 | <a href="https://www.proxion.com.br" className="text-blue-600 underline">www.proxion.com.br</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
}
