import clientPromise from '../../../../../lib/mongodb';

// API unificada para buscar tipos, modelos e séries de equipamentos
export async function GET(request) {
  try {
    // Obter URL e parâmetros
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Extrair parâmetros comuns
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    const subLocal = searchParams.get('sublocal') || searchParams.get('subLocal') || searchParams.get('sub-local');
    const tipo = searchParams.get('tipo');
    const modelo = searchParams.get('modelo');
    
    // Identificar qual tipo de busca realizar baseado no parâmetro 'busca'
    const busca = searchParams.get('busca') || 'tipos'; // Valor padrão é 'tipos'
    
    console.log(`📩 Iniciando busca de '${busca}' com parâmetros:`, { 
      cliente, 
      unidade, 
      subLocal,
      tipo,
      modelo,
      urlCompleta: request.url
    });

    // Validação de parâmetros obrigatórios
    if (!cliente || !unidade) {
      return Response.json({ 
        error: 'Parâmetros obrigatórios cliente e unidade são necessários',
        parametrosRecebidos: { cliente, unidade, subLocal }
      }, { status: 400 });
    }

    // Conectar ao MongoDB
    const client = await clientPromise;
    const db = client.db("ProxionDnc");
    const collection = db.collection("Proxion");

    // Construir filtro base com base nos parâmetros fornecidos
    let filtro = {
      "Cod.Cliente": cliente,
      "Cod.Unidade": unidade
    };

    // Adicionar sublocal ao filtro se existir
    if (subLocal) {
      filtro["Cod.Sublocal"] = subLocal;
    }

    // Adicionar tipo ao filtro se existir e a busca não for de tipos
    if (tipo && busca !== 'tipos') {
      filtro["Categoria"] = tipo;
    }

    // Adicionar modelo ao filtro se existir e a busca for de séries
    if (modelo && busca === 'series') {
      filtro["Modelo"] = modelo;
    }

    console.log(`🔍 Filtro aplicado para busca de '${busca}':`, JSON.stringify(filtro));

    // Realizar a busca conforme o tipo solicitado
    let resultado;
    
    switch (busca.toLowerCase()) {
      case 'tipos':
        // Buscar tipos de equipamentos distintos
        resultado = await collection.distinct("Categoria", filtro);
        console.log(`✅ ${resultado.length} tipos encontrados`);
        break;
        
      case 'modelos':
        // Buscar modelos distintos para o tipo selecionado
        resultado = await collection.distinct("Modelo", filtro);
        console.log(`✅ ${resultado.length} modelos encontrados para o tipo ${tipo}`);
        break;
        
      case 'series':
        // Buscar números de série distintos para o modelo selecionado
        resultado = await collection.distinct("Numero de serie", filtro);
        console.log(`✅ ${resultado.length} números de série encontrados para o modelo ${modelo}`);
        break;
        
      default:
        return Response.json({ 
          error: `Tipo de busca '${busca}' não reconhecido. Use 'tipos', 'modelos' ou 'series'` 
        }, { status: 400 });
    }

    // Se não encontrou resultados, buscar informações de diagnóstico
    if (!resultado || resultado.length === 0) {
      console.log(`⚠️ Nenhum resultado encontrado para busca de '${busca}'`);
      
      // Tentar busca insensível a maiúsculas/minúsculas
      console.log("⚠️ Tentando busca insensível a maiúsculas/minúsculas...");
      
      // Criar novo filtro case-insensitive
      let filtroCaseInsensitive = {
        "Cod.Cliente": { $regex: new RegExp(`^${escapeRegExp(cliente)}$`, "i") },
        "Cod.Unidade": { $regex: new RegExp(`^${escapeRegExp(unidade)}$`, "i") }
      };
      
      if (subLocal) {
        filtroCaseInsensitive["Cod.Sublocal"] = { $regex: new RegExp(`^${escapeRegExp(subLocal)}$`, "i") };
      }
      
      if (tipo && busca !== 'tipos') {
        filtroCaseInsensitive["Categoria"] = { $regex: new RegExp(`^${escapeRegExp(tipo)}$`, "i") };
      }
      
      if (modelo && busca === 'series') {
        filtroCaseInsensitive["Modelo"] = { $regex: new RegExp(`^${escapeRegExp(modelo)}$`, "i") };
      }
      
      // Buscar valores distintos para diagnóstico
      const clientes = await collection.distinct("Cod.Cliente");
      const unidades = await collection.distinct("Cod.Unidade");
      const sublocais = await collection.distinct("Cod.Sublocal");
      
      // Buscar valores específicos relacionados ao tipo de busca
      let valoresDiagnostico = [];
      switch (busca.toLowerCase()) {
        case 'tipos':
          valoresDiagnostico = await collection.distinct("Categoria");
          break;
        case 'modelos':
          valoresDiagnostico = await collection.distinct("Modelo");
          break;
        case 'series':
          valoresDiagnostico = await collection.distinct("Numero de serie");
          break;
      }
      
      return Response.json({
        resultado: [],
        diagnostico: {
          tipoConsulta: busca,
          filtroAplicado: filtro,
          parametrosRecebidos: { cliente, unidade, subLocal, tipo, modelo },
          url: request.url,
          clientesDisponiveis: clientes.slice(0, 20),
          unidadesDisponiveis: unidades.slice(0, 20),
          sublocaisDisponiveis: sublocais.slice(0, 20),
          valoresDisponiveis: valoresDiagnostico.slice(0, 20)
        }
      });
    }
    
    // Ordenar o resultado para melhor apresentação
    if (Array.isArray(resultado)) {
      resultado.sort();
    }
    
    // Retornar resultados
    return Response.json(resultado);
    
  } catch (error) {
    console.error('❌ Erro ao processar requisição:', error);
    console.error('Stack trace:', error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Função auxiliar para escapar caracteres especiais em expressões regulares
function escapeRegExp(string) {
  return string ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
}