"use client";
import Image from 'next/image'
import BGIMG from '../IMG/BG.png'
import SideBarMenu from "../../Componentes/Menu/SideBarMenu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { set } from 'mongoose';

export default function permisoespage() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="relative w-screen h-screen flex bg-gray-100 overflow-hiden">
            {/* Background */}
            <Image
                src={BGIMG}
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
                className="z-0" />

            <div className="absolute inset-0 bg-black/20 z-0"></div>

            <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {!menuOpen && (
                <button
                    className="absolute top-4 left-4 z-30 md:hidden text-white"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            )}
            
        </div>
    );
}