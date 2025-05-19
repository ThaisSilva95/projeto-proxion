"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import BGIMG from "../app/IMG/BG.png";
import { useState } from "react";
import { Menu } from "lucide-react";
import SideBarMenu from "../Componentes/Menu/SideBarMenu";
import { usePathname } from "next/navigation";

function ClientLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/relatorio"
    ) {
      setShouldShowMenu(false);
    } else {
      setShouldShowMenu(true);
    }
  }, [pathname]);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex">
      {" "}
      {/* Adicionado flex para o layout */}
      {/* Background */}
      <Image
        src={BGIMG}
        className="absolute inset-0 h-full w-full object-cover -z-50"
      />
      <div className="absolute inset-0 bg-black/50 -z-10" />
      {shouldShowMenu && (
        <SideBarMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          className={`fixed lg:relative z-20 h-full bg-[#D9D9D9] text-black p-10 w-64 transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        />
      )}
      {shouldShowMenu && !menuOpen && (
        <button
          className="absolute top-4 left-4 z-30 lg:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}
      {children}
    </div>
  );
}

export default ClientLayout;
