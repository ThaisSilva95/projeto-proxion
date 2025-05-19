"use client";

import Image from "next/image";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import LogoTransparente from "../../app/IMG/LogoFTransp.png";
import { usePathname } from "next/navigation";

function SidebarMenu({ menuOpen, setMenuOpen }) {
  const pathname = usePathname();


  return (
    <div
      className={`fixed lg:relative z-20 h-full bg-[#D9D9D9] text-black p-10 w-64 transition-transform duration-300 ease-in-out
      ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="flex items-center justify-start mb-10">
        <Image src={LogoTransparente} alt="Logo" width={120} height={60} />
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-10 text-sm font-semibold">
        <div>
          <h2 className="text-gray-600 font-bold">Vistoria</h2>
          <ul className="ml-4 space-y-1 mt-1 text-gray-600">
            <li>
              <a
                href="/telainicial"
                className={`hover:text-[#00A7B2] ${pathname === "/telainicial" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Tela Inicial
              </a>
            </li>
            <li>
              <a
                href="/iniciarvistoria"
                className={`hover:text-[#00A7B2] ${pathname === "/iniciarvistoria" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Iniciar Vistoria
              </a>
            </li>
            <li>
              <a href="/retomarvistoria"
                className={`hover:text-[#00A7B2] ${pathname === "/retomarvistoria" ? "text-[#00A7B2] font-bold" : ""
                  }`}>
                Retomar Vistoria
              </a>
            </li>

            <li>
              <a href="/importarvistoria" 
              className={`hover:text-[#00A7B2] ${pathname === "/importarvistoria" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Importar Vistoria
              </a>
            </li>
            <li>
              <a href="/selecionarempresa" 
              className={`hover:text-[#00A7B2] ${pathname === "/selecionarempresa" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Selecionar Empresa
              </a>
            </li>
            <li>
              <a href="/listaequipamentos" 
              className={`hover:text-[#00A7B2] ${pathname === "/listaequipamentos" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Lista de Equipamentos
              </a>
            </li>
            <li>
              <a href="/selecionarequipamento" 
              className={`hover:text-[#00A7B2] ${pathname === "/selecionarequipamento" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Selecionar Equipamento
              </a>
            </li>
            <li>
              <a href="/paginaparabens" 
              className={`hover:text-[#00A7B2] ${pathname === "/paginaparabens" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Finalizar Vistoria
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">Cadastro</h2>
          <ul className="ml-4 space-y-1 mt-1 text-gray-600">
            <li>
              <a href="/cadastrousuarios" 
              className={`hover:text-[#00A7B2] ${pathname === "/cadastrousuario" ? "text-[#00A7B2] font-bold" : ""
                  }`}>
                Cadastro Usuários
              </a>
            </li>
            <li>
              <a href="/cadastroempresas" 
              className={`hover:text-[#00A7B2] ${pathname === "/cadastroempresas" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Cadastro de Clientes
              </a>
            </li>
            <li>
              <a href="/equipamentodefeito" 
              className={`hover:text-[#00A7B2] ${pathname === "/equipamentodefeito" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
                Cadastro de Equipamentos
              </a>
            </li>

          </ul>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">
            <a href="/permissoes" 
            className={`hover:text-[#00A7B2] ${pathname === "/permissoes" ? "text-[#00A7B2] font-bold" : ""
                  }`}
            >
              Permissões
            </a>
          </h2>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">
            <a href="/alterarperfil" 
            className={`hover:text-[#00A7B2] ${pathname === "/alterarperfil" ? "text-[#00A7B2] font-bold" : ""
                  }`}
              >
              Alterar Perfil
            </a>
          </h2>
        </div>
      </div>
    </div >
  );
}

SidebarMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};

export default SidebarMenu;
