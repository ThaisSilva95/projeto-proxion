// app/api/relatorio/gerar/route.js
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      empresaId, 
      dataInicio, 
      dataFim,
      formato // "csv" ou "pdf"
    } = body;
    
    if (!empresaId) {
      return Response.json({ error: 'ID da empresa é obrigatório' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ProxionDnc");
    
    // Filtro para a consulta
    const filtro = {
      Empresa: empresaId,
      Status_Vistoria: "Vistoriado"
    };
    
    // Adicionar filtro de data se fornecido
    if (dataInicio || dataFim) {
      filtro.Data_Vistoria = {};
      
      if (dataInicio) {
        filtro.Data_Vistoria.$gte = dataInicio;
      }
      
      if (dataFim) {
        filtro.Data_Vistoria.$lte = dataFim;
      }
    }
    
    // Buscar equipamentos vistoriados
    const equipamentosVistoriados = await db.collection("Proxion")
      .find(filtro)
      .toArray();
    
    // Formatar dados para CSV
    let dadosFormatados;
    
    if (formato === "csv") {
      // Colunas para o CSV
      const colunas = [
        'Categoria', 'Modelo', 'Numero_de_serie', 'Status', 
        'Data_Vistoria', 'Vistoriado_Por', 'Defeitos', 'Notas'
      ];
      
      // Converter para string CSV
      const linhas = equipamentosVistoriados.map(equip => {
        const linha = [];
        colunas.forEach(col => {
          let valor = equip[col] || '';
          
          // Formatações especiais
          if (col === 'Defeitos' && equip[col]) {
            valor = `${equip[col].tipo} - ${equip[col].intensidade}`;
          }
          
          // Sanitizar valores para CSV (remover vírgulas, etc)
          if (typeof valor === 'string') {
            valor = `"${valor.replace(/"/g, '""')}"`;
          }
          
          linha.push(valor);
        });
        return linha.join(',');
      });
      
      // Adicionar cabeçalho e juntar linhas
      dadosFormatados = [colunas.join(','), ...linhas].join('\n');
    } else {
      // Para outros formatos, retorna o JSON bruto
      dadosFormatados = equipamentosVistoriados;
    }
    
    return Response.json({ 
      success: true,
      formato,
      dados: dadosFormatados,
      totalVistoriados: equipamentosVistoriados.length
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}