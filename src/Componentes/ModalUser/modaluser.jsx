import React, { useState, useEffect } from 'react';

export default function AnalystModal({ onClose, analistaEditando = null, onSubmit }) {
  const [analistas, setAnalistas] = useState({
    nome: '',
    cpf: '',
    usuario: '',
    senha: '',
    assinatura: null,
    foto: null
  });
  const [previewAssinatura, setPreviewAssinatura] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    if (analistaEditando) {
      setAnalistas(analistaEditando);
    }
  }, [analistaEditando]);


  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'assinatura') {
          setAnalistas({ ...analistas, assinatura: file });
          setPreviewAssinatura(reader.result);
        } else if (type === 'foto') {
          setAnalistas({ ...analistas, foto: file });
          setPreviewFoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Somente arquivos PNG ou JPG são permitidos.');
    }
  };

  const handleChange = (e) => {
    setAnalistas({ ...analistas, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(analistas);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <button
          className="absolute top-4 right-4 text-teal-700 text-xl font-bold"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">Cadastro de Analista</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-teal-700 font-semibold block mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={analistas.nome}
              onChange={handleChange}
              className="w-full border border-[#00ABAD] text-teal-700 rounded-lg px-4 py-2 outline-none"
            />

            <label className="text-teal-700 font-semibold block mt-4 mb-1">CPF</label>
            <input
              type="text"
              name="cpf"
              value={analistas.cpf}
              placeholder="000.000.000-00"
              onChange={handleChange}
              className="w-full border border-[#00ABAD] text-teal-700 rounded-lg px-4 py-2 outline-none"
            />

            <label className="text-teal-700 font-semibold block mt-4 mb-1">Usuário</label>
            <input
              type="text"
              name="usuario"
              value={analistas.usuario}
              onChange={handleChange}
              className="w-full border border-[#00ABAD] text-teal-700 rounded-lg px-4 py-2 outline-none"
            />

            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1">
                <label className=" text-teal-700 font-semibold block mb-1">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={analistas.senha}
                  onChange={handleChange}
                  className="w-full border border-[#00ABAD] text-teal-700 rounded-lg px-4 py-2 outline-none"
                />
              </div>
              <button className="text-teal-700 text-sm font-semibold whitespace-nowrap mt-6">
                Redefinir senha
              </button>
            </div>
          </div>

          <div>
            <label className="text-teal-700 font-semibold block mb-1">Assinatura</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleFileChange(e, 'assinatura')}
              className="mb-2"
            />
            <p className="text-sm text-gray-600 mb-2">Apenas arquivos PNG ou JPG.</p>
            <div className="w-full h-20 border border-[#00ABAD] rounded-lg flex items-center justify-center bg-gray-100">
              {previewAssinatura ? (
                <img src={previewAssinatura} alt="Assinatura Preview" className="h-full object-contain" />
              ) : (
                <span className="text-3xl text-[#00ABAD]"></span>
              )}
            </div>

            <label className="text-teal-700 font-semibold block mt-6 mb-1">Foto do Usuário</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleFileChange(e, 'foto')}
              className="mb-2"
            />
            <p className="text-sm text-gray-600 mb-2">Apenas arquivos PNG ou JPG.</p>

          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="text-teal-700 font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
