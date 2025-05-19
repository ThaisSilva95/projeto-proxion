import { MongoClient } from 'mongodb';

// URI de conexão do MongoDB
const uri = process.env.MONGODB_URI || "mongodb+srv://proxiondncproject:YItSgYJzoISOnZB9@cluster0.b99a618.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Opções de conexão
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Cliente MongoDB global
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, reutilizamos a conexão entre recarregamentos
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      console.error('Erro ao conectar ao MongoDB:', err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, uma nova conexão é criada para cada requisição
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  });
}

// Exportar a promise de conexão
export default clientPromise;