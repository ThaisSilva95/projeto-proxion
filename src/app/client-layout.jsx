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
      pathname === "/paginaparabens"
    ) {
      setShouldShowMenu(false);
    } else {
      setShouldShowMenu(true);
    }
  }, [pathname]);

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <Image
        src={BGIMG}
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/50 -z-10" />
      {shouldShowMenu && (
        <>
          <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {!menuOpen && (
            <button
              className="absolute top-4 left-4 z-30 md:hidden text-white"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          )}
        </>
      )}
      {children}
    </div>
  );
}

export default ClientLayout;
