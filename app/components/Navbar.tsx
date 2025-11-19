"use client";
import Image from "next/image";
import Logo from '../../public/assets/images/GetJudged!.png';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    
    const isActive = (path: string) => pathname === path;
    
    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex m-6 flex-row max-w-full px-10 py-5 bg-gradient-to-r from-[#e11180] to-[#c00d6e] justify-between items-center rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,17,128,0.4)]">
                <div className="w-40 h-auto transition-transform duration-300 hover:scale-105">
                    <Image 
                        src={Logo}
                        alt="GetJudged! Logo"
                    />
                </div>
                <div className="flex flex-row text-white font-semibold text-xl gap-8">
                    <a href="/" className="relative group">
                        <h2 className="transition-colors duration-300">Home</h2>
                        <span className={`absolute -bottom-1 left-0 h-1 rounded-full bg-[#f9ca4a] transition-all duration-300 ${
                            isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </a>
                    <a href="/Confess" className="relative group">
                        <h2 className="transition-colors duration-300">Confess</h2>
                        <span className={`absolute -bottom-1 left-0 h-1 rounded-full bg-[#f9ca4a] transition-all duration-300 ${
                            isActive('/Confess') ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </a>
                    <a href="/Verdicts" className="relative group">
                        <h2 className="transition-colors duration-300">Verdicts</h2>
                        <span className={`absolute -bottom-1 left-0 h-1 rounded-full bg-[#f9ca4a] transition-all duration-300 ${
                            isActive('/Verdicts') ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </a>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden rounded-3xl m-4 bg-gradient-to-br from-[#e11180] to-[#c00d6e] shadow-xl overflow-hidden">
                <div className="flex flex-row justify-between items-center px-5 py-4 backdrop-blur-sm">
                    <Image 
                        src={Logo}
                        alt="GetJudged! Logo"
                        className="w-32 transition-transform duration-300 hover:scale-105"
                    />
                    <button 
                        onClick={() => setIsOpen((s) => !s)}
                        className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="bg-white/95 backdrop-blur-md">
                        <ul className="py-2">
                            <li>
                                <a 
                                    href="/" 
                                    className={`block px-6 py-3 font-semibold transition-all duration-300 ${
                                        isActive('/') 
                                            ? 'bg-[#e11180] text-white' 
                                            : 'text-[#e11180] hover:bg-[#e11180] hover:text-white'
                                    }`}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/Confess" 
                                    className={`block px-6 py-3 font-semibold transition-all duration-300 ${
                                        isActive('/Confess') 
                                            ? 'bg-[#e11180] text-white' 
                                            : 'text-[#e11180] hover:bg-[#e11180] hover:text-white'
                                    }`}
                                >
                                    Confess
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/Verdicts" 
                                    className={`block px-6 py-3 font-semibold transition-all duration-300 ${
                                        isActive('/Verdicts') 
                                            ? 'bg-[#e11180] text-white' 
                                            : 'text-[#e11180] hover:bg-[#e11180] hover:text-white'
                                    }`}
                                >
                                    Verdicts
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}