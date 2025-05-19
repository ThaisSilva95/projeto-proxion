// app/api/equipamentos/vistoriar/route.js
import clientPromise from '../../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      numeroSerie, 
      novoStatus, 
      defeitosDetectados, 
      notas,
      vistoriadoPor,
      dataVistoria 
    } = body;
    
    if (!numeroSerie || !novoStatus) {
      return Response.json({ error: 'Número de série e novo status são obrigatórios' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ProxionDnc");
    
    // IMPORTANTE: Note a correção do nome do campo: "Numero de serie" (com espaços)
    // em vez de "Numero_de_serie" (com underscores)
    const atualizacao = {
      $set: {
        Status: novoStatus,
        Status_Vistoria: "Vistoriado", // Este campo será usado na agregação
        Data_Vistoria: dataVistoria || new Date().toISOString(),
        Vistoriado_Por: vistoriadoPor || "Usuário atual",
        Notas: notas || ""
      }
    };
    
    // Se tiver defeitos detectados, adicionar ao documento
    if (defeitosDetectados) {
      atualizacao.$set.Defeitos = defeitosDetectados;
    }
    
    // CORREÇÃO: Usando o nome correto do campo conforme definido no MongoDB
    const resultado = await db.collection("Proxion").updateOne(
      { "Numero de serie": parseInt(numeroSerie) },  // Convertendo para número
      atualizacao
    );

    if (resultado.matchedCount === 0) {
      // Tentar novamente sem converter para número (caso seja string no banco)
      const resultadoString = await db.collection("Proxion").updateOne(
        { "Numero de serie": numeroSerie },
        atualizacao
      );
      
      if (resultadoString.matchedCount === 0) {
        return Response.json({ error: 'Equipamento não encontrado' }, { status: 404 });
      }
    }

    return Response.json({ 
      success: true,
      message: 'Equipamento vistoriado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao vistoriar equipamento:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}