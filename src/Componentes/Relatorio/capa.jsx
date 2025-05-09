import Image from 'next/image';
import topoImagem from '../../../public/img/toporelatorio.png'; 
import rodapeImagem from '../../../public/img/footer.png';
import logokenvue from '../../../public/img/logokenvue.png';

export default function Capa() {
    return (
        <div className="bg-white flex flex-col items-center justify-between min-h-screen h-auto p-10 relative px-0">
      
        <div className="w-full mb-10 ">
          <Image src={topoImagem} alt="Topo" width={600} height={100} priority className="mx-auto no-break " />
        </div>
  
        <div className="w-full flex justify-end mb-6">
            <Image src={logokenvue} alt="logocliente" width={300} height={200} priority className="h-16 no-break" />
        </div>
     
        <div className="text-left text-sm text-gray-700 w-fit mr-10 mb-20 self-end space-y-2">
          <h2 className="font-bold mb-2">Dados da Visita</h2>
          <p>Cliente: <strong>Johnson & Johnson</strong></p>
          <p>Código: <strong>ABC123</strong></p>
          <p>Responsável: <strong>Maria Oliveira</strong></p>
          <p>E-mail: <strong>maria@empresa.com</strong></p>
          <p>Telefone: <strong>(12) 98765-4321</strong></p>
          <p>Cidade: <strong>São José dos Campos</strong></p>
          <p>Data: <strong>08/05/2025</strong></p>
          <p>Analista: <strong>João Souza</strong></p>
        </div>
  
        
        <div className="w-full mt-auto">
          <Image src={rodapeImagem} alt="Rodapé" width={600} height={50} priority className="mx-auto no-break" />
        </div>
      </div>
    );
  }