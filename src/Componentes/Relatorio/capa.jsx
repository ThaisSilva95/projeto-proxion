import Image from 'next/image';



export default function Capa() {
  return (
    <div className="w-full h-full flex flex-col justify-between">

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
  );
}