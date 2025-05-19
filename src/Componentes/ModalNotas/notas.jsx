import { useState } from "react";
import BGModal from "../../app/IMG/BGModal.png";

function ModalNotas({ isOpen, onClose }) {
  const [notas, setNotas] = useState("");

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center lg:ml-[200px]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80"
        style={{
          backgroundImage: `url(${BGModal.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <h2 className="text-xl text-teal-700 text-center font-bold mb-4">Informações Complementares</h2>

        {/* Campo de Notas */}
        <textarea
          className="border rounded p-2 w-full h-60 resize-none text-teal-700"
          placeholder="Digite suas notas aqui..."
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button className="text-teal-700  py-2 px-4 rounded" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="bg-teal-500 text-white py-2 px-4 rounded"
            onClick={() => window.location.href = "/paginaparabens"}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ModalNotas;