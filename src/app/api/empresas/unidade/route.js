import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cliente = searchParams.get('cliente');
    
    if (!cliente) {
      return NextResponse.json(
        { error: 'Parâmetros cliente são obrigatórios' },
        { status: 400 }
      );
    }
    
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('ProxionDnc');
    const collection = database.collection('Proxion');
    
    // Buscar unidade específicos
    const unidade = await collection.distinct('Cod.Unidade', { 
      "Cod.Cliente": cliente
    });
    
    await client.close();
    
    return NextResponse.json(unidade);
  } catch (error) {
    console.error('Erro ao buscar unidade:', error);
    
    return NextResponse.json(
      { error: 'Erro ao buscar unidade' },
      { status: 500 }
    );
  }
}