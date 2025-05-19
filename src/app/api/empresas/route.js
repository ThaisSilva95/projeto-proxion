export async function GET(request) {
  try {
    // Conectar ao MongoDB
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const database = client.db("ProxionDnc");
    const collection = database.collection("Proxion");
    
    // Construir a consulta baseada nos parâmetros
    const filter = query
      ? {
          $or: [
            { "Cod.Cliente": { $regex: query, $options: 'i' } },
            { "Cod.Unidade": { $regex: query, $options: 'i' } },
            { "Cod.Sublocal": { $regex: query, $options: 'i' } }
          ]
        }
      : {};
    
    // Buscar documentos no MongoDB
    const empresas = await collection.find(filter).limit(20).toArray();
    
    // Retornar os resultados como JSON
    return Response.json({ empresas });
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return Response.json({ error: "Erro ao buscar empresas" }, { status: 500 });
  }
}