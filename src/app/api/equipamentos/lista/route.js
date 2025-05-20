import clientPromise from '../../../../../lib/mongodb';

export async function GET(request) {
  try {
    // Captura a URL completa para análise
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    console.log("📩 URL completa:", request.url);
    console.log("🔍 URL path:", url.pathname);
    console.log("🔍 URL search:", url.search);
    
    // Extração robusta de parâmetros com múltiplas variações
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    
    // Busca todas as variações possíveis de sublocal dos parâmetros
    let subLocal = searchParams.get('sublocal') || 
                   searchParams.get('subLocal') || 
                   searchParams.get('sub-local') || 
                   searchParams.get('sublLocal');
    
    // Tentativa de extrair do caminho da URL se não estiver nos parâmetros
    if (!subLocal) {
      // Extrai do formato /lista?cliente=PLN&unidade=SJC&sublocal=HPL
      const pathMatch = url.pathname.match(/\/lista[?\/]cliente=([^&\/]+)[&\/]unidade=([^&\/]+)[&\/](?:sublocal|subLocal|sublLocal)=([^&\/]+)/i);
      if (pathMatch) {
        subLocal = pathMatch[3];
        console.log("🔍 Sublocal extraído do path (formato 1):", subLocal);
      } else {
        // Extrai do formato /cliente-PLN/unidade-SJC/sublocal-HPL
        const altPathMatch = url.pathname.match(/\/sub[-_]?local[?=\/]([^&\/]+)/i);
        if (altPathMatch) {
          subLocal = altPathMatch[1];
          console.log("🔍 Sublocal extraído do path (formato 2):", subLocal);
        } else {
          // Última tentativa - extrai do final do path se seguir um padrão como /PLN/SJC/HPL
          const segments = url.pathname.split('/').filter(Boolean);
          if (segments.length >= 3 && cliente && unidade) {
            // Se temos cliente e unidade e há um terceiro segmento, podemos tentar usá-lo como sublocal
            const possibleSublocal = segments[segments.length - 1];
            if (possibleSublocal !== cliente && possibleSublocal !== unidade) {
              subLocal = possibleSublocal;
              console.log("🔍 Sublocal extraído do final do path:", subLocal);
            }
          }
        }
      }
    }
    
    // Extrai HPL da URL se ela contiver "HPL" em qualquer lugar
    if (!subLocal && url.toString().includes("HPL")) {
      subLocal = "HPL";
      console.log("🔍 Sublocal 'HPL' extraído da URL por conter essa string");
    }

    console.log("📩 Parâmetros processados:", { 
      cliente, 
      unidade, 
      subLocal,
      todosParametros: Object.fromEntries(searchParams.entries())
    });

    if (!cliente || !unidade) {
      return Response.json({ 
        error: 'Parâmetros obrigatórios faltando (cliente ou unidade)',
        parametrosRecebidos: { cliente, unidade, subLocal }
      }, { status: 400 });
    }

    // Conectar ao MongoDB
    console.log("🔄 Conectando ao MongoDB...");
    const client = await clientPromise;
    const db = client.db("ProxionDnc");

    // Construir o filtro base
    let filtro = {
      "Cod.Cliente": cliente,
      "Cod.Unidade": unidade
    };

    // Adicionar sublocal ao filtro se existir
    if (subLocal) {
      filtro["Cod.Sublocal"] = subLocal;
      console.log("🔍 Sublocal adicionado ao filtro:", subLocal);
    } else {
      console.log("⚠️ Nenhum sublocal encontrado na requisição");
    }

    console.log("🔍 Filtro aplicado:", JSON.stringify(filtro));

    // Verificar se existem documentos com este filtro
    const totalEncontrado = await db.collection("Proxion").countDocuments(filtro);
    console.log(`📊 Total de documentos encontrados: ${totalEncontrado}`);

    // Se não encontrar nenhum documento com o filtro exato, tentar busca insensível a maiúsculas/minúsculas
    if (totalEncontrado === 0) {
      console.log("⚠️ Nenhum documento encontrado com filtro exato. Tentando busca insensível a maiúsculas/minúsculas...");
      
      // Criar filtro case-insensitive
      filtro = {
        "Cod.Cliente": { $regex: new RegExp(`^${escapeRegExp(cliente)}$`, "i") },
        "Cod.Unidade": { $regex: new RegExp(`^${escapeRegExp(unidade)}$`, "i") }
      };
      
      if (subLocal) {
        filtro["Cod.Sublocal"] = { $regex: new RegExp(`^${escapeRegExp(subLocal)}$`, "i") };
      }
      
      const totalInsensivel = await db.collection("Proxion").countDocuments(filtro);
      console.log(`📊 Total encontrado com busca insensível: ${totalInsensivel}`);
      
      // Se ainda não encontrar, tentar busca sem o sublocal
      if (totalInsensivel === 0 && subLocal) {
        console.log("⚠️ Tentando busca sem o sublocal...");
        delete filtro["Cod.Sublocal"];
        
        const totalSemSublocal = await db.collection("Proxion").countDocuments(filtro);
        console.log(`📊 Total encontrado sem sublocal: ${totalSemSublocal}`);
      }
    }

    // Executar agregação para agrupar por tipo de equipamento
    try {
      const resultado = await db.collection("Proxion").aggregate([
        { $match: filtro },
        { $group: {
            _id: "$Categoria",
            total: { $sum: 1 },
            avaliados: {
              $sum: {
                $cond: [
                  { $eq: ["$Status_Vistoria", "Vistoriado"] },
                  1,
                  0
                ]
              }
            }
          }
        },
        { $project: {
            tipo: "$_id",
            total: 1,
            avaliados: 1,
            _id: 0
          }
        },
        { $sort: { tipo: 1 } }
      ]).toArray();

      console.log("✅ Resultado processado:", resultado);
      
      // Se não encontrou resultados, buscar informações de diagnóstico
      if (resultado.length === 0) {
        console.log("⚠️ Nenhum equipamento encontrado para agrupar");
        
        // Verificar a estrutura dos documentos na coleção
        const amostraDocumentos = await db.collection("Proxion").find().limit(2).toArray();
        let estruturaDoc = {};
        
        // Verificar a estrutura e caminhos importantes
        if (amostraDocumentos.length > 0) {
          const doc = amostraDocumentos[0];
          estruturaDoc = {
            campos: Object.keys(doc),
            camposCod: doc.Cod ? Object.keys(doc.Cod) : []
          };
          
          console.log("🔍 Estrutura do documento de exemplo:", estruturaDoc);
        }
        
        // Buscar valores distintos para diagnóstico
        const clientes = await db.collection("Proxion").distinct("Cod.Cliente");
        const unidades = await db.collection("Proxion").distinct("Cod.Unidade");
        const sublocais = await db.collection("Proxion").distinct("Cod.Sublocal");
        
        console.log("👥 Clientes disponíveis:", clientes.slice(0, 10));
        console.log("🏢 Unidades disponíveis:", unidades.slice(0, 10));
        console.log("📍 Sublocais disponíveis:", sublocais.slice(0, 10));
        
        // Verificar combinações existentes
        const combinacoes = await db.collection("Proxion").aggregate([
          { $group: {
              _id: { 
                cliente: "$Cod.Cliente", 
                unidade: "$Cod.Unidade", 
                sublocal: "$Cod.Sublocal" 
              },
              count: { $sum: 1 }
            }
          },
          { $match: { 
              "_id.cliente": { $regex: cliente, $options: "i" },
              "_id.unidade": { $regex: unidade, $options: "i" }
            }
          },
          { $limit: 10 }
        ]).toArray();
        
        // Verificar se há alguma combinação próxima com dados
        console.log("🔍 Combinações similares encontradas:", combinacoes);
        
        // Retornar informações de diagnóstico
        return Response.json({
          resultado: [],
          diagnostico: {
            filtroAplicado: filtro,
            parametrosRecebidos: { cliente, unidade, subLocal },
            url: request.url,
            clientesDisponiveis: clientes.slice(0, 20),
            unidadesDisponiveis: unidades.slice(0, 20),
            sublocaisDisponiveis: sublocais.slice(0, 20),
            combinacoesSimilares: combinacoes,
            estruturaDocumento: estruturaDoc
          }
        });
      }
      
      return Response.json(resultado);
    } catch (dbError) {
      console.error('⚠️ Erro na consulta ao banco de dados:', dbError);
      return Response.json({ 
        error: 'Erro ao processar a consulta', 
        message: dbError.message 
      }, { status: 500 });
    }
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

// Função auxiliar para encontrar caminhos de chaves em um objeto aninhado
function findKeyPaths(obj, targetKey, currentPath = '', result = []) {
  if (!obj || typeof obj !== 'object') return result;
  
  for (const key in obj) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    
    if (key === targetKey) {
      result.push(newPath);
    }
    
    if (obj[key] && typeof obj[key] === 'object') {
      findKeyPaths(obj[key], targetKey, newPath, result);
    }
  }
  
  return result;
}

// Função para achatar um documento aninhado
function flattenDocument(doc, prefix = '', result = {}) {
  for (const key in doc) {
    const value = doc[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenDocument(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}