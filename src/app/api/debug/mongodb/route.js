// Debug Helper - app/api/debug/mongodb/route.js
// Este endpoint é útil para verificar a estrutura dos documentos no MongoDB

import clientPromise from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const client = await clientPromise;
    const db = client.db("ProxionDnc");
    
    // Obter uma amostra de documentos
    const documentos = await db.collection("Proxion").find().limit(2).toArray();
    
    // Verificar estrutura dos campos
    const campos = {};
    if (documentos.length > 0) {
      const doc = documentos[0];
      
      // Verificar e documentar a estrutura
      const estrutura = {
        possuiCodCliente: doc.Cod && doc.Cod.Cliente ? true : false,
        possuiClienteRaiz: doc.Cliente ? true : false,
        nomeCampoSerie: doc["Numero de serie"] ? "Numero de serie" : 
                        doc.Numero_de_serie ? "Numero_de_serie" : "Desconhecido",
        tipoSerie: doc["Numero de serie"] ? typeof doc["Numero de serie"] : "N/A",
        estruturaCompleta: Object.keys(doc)
      };
      
      // Verificar estrutura do objeto Cod
      if (doc.Cod) {
        estrutura.estruturaCod = Object.keys(doc.Cod);
      }
      
      // Verificar campos de vistoria
      estrutura.camposVistoria = {
        possuiStatusVistoria: doc.Status_Vistoria ? true : false,
        possuiVistoriaNome: doc.status_vistoria ? true : false,
        outrosCampos: Object.keys(doc).filter(k => k.toLowerCase().includes('vistori'))
      };
      
      return Response.json({
        sucesso: true,
        estrutura,
        amostra: documentos
      });
    }
    
    return Response.json({
      sucesso: false,
      mensagem: "Nenhum documento encontrado na coleção"
    });
    
  } catch (error) {
    console.error('Erro ao analisar MongoDB:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}