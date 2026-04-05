"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LoginModal from "./LoginModal";

export default function Navbar({ isAuthenticated, user }: { isAuthenticated?: boolean; user?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  // Determine dynamic classes to prevent UI jumping when menu is toggled
  const isTransparentBackground = (isHome && !isScrolled) || isMobileMenuOpen;
  const paddingClass = (isHome && !isScrolled) ? "py-6" : "py-4";
  const backgroundClass = isTransparentBackground ? "bg-transparent" : "bg-black/90 shadow-md backdrop-blur-sm";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${isMobileMenuOpen ? "transition-none" : "transition-all duration-300 ease-in-out"} ${backgroundClass} ${paddingClass}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center text-white">
        <Link href="/" className="relative z-50 flex items-center shrink-0">
          <Image 
            src="/new-logo.png" 
            alt="Fem Production Logo" 
            width={270} 
            height={90} 
            className="w-auto h-16 md:h-24 object-contain"
            priority
          />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative z-50 p-2 text-white hover:text-[#f3c5ae] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end space-x-8 text-sm font-medium tracking-wide items-center">
          <Link href="/" className={`hover:text-gray-400 transition-colors ${pathname === "/" ? "text-white" : "text-gray-300"}`}>Home</Link>
          <Link href="/about" className={`hover:text-gray-400 transition-colors ${pathname === "/about" ? "text-white" : "text-gray-300"}`}>About Us</Link>
          <Link href="/gallery" className={`hover:text-gray-400 transition-colors ${pathname === "/gallery" ? "text-white" : "text-gray-300"}`}>Gallery</Link>
          <Link href="/events" className={`hover:text-gray-400 transition-colors ${pathname === "/events" ? "text-white" : "text-gray-300"}`}>Upcoming Events</Link>
          <Link href="/register" className={`hover:text-gray-400 transition-colors ${pathname === "/register" ? "text-white" : "text-gray-300"}`}>Register</Link>
          
          {!pathname.startsWith("/admin") && (
          <div className="pl-6 border-l border-zinc-700 space-x-6 flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none hover:ring-2 hover:ring-zinc-600 rounded-full transition-all"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="w-9 h-9 rounded-full object-cover border border-zinc-700" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-white tracking-wider uppercase">
                      {user?.name?.[0] || user?.email?.[0] || "U"}
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-zinc-950 border border-zinc-800 shadow-2xl rounded-md overflow-hidden z-50 py-1">
                    <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                      <p className="text-sm font-medium text-white truncate max-w-full">{user?.name || "User"}</p>
                      <p className="text-xs text-zinc-400 truncate max-w-full">{user?.email || ""}</p>
                    </div>
                    <div className="py-2">
                      <Link 
                        href="/register" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Register
                      </Link>
                      <Link 
                        href="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }} 
                        className="w-full text-left px-4 py-2 text-sm text-red-400 font-medium hover:bg-red-950/20 hover:text-red-300 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)} 
                className="text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest border border-zinc-700 px-4 py-2 hover:bg-white hover:text-black cursor-pointer"
              >
                Login / Signup
              </button>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto shadow-2xl" : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 text-xl font-medium tracking-wide">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-[#f3c5ae] transition-colors ${pathname === "/" ? "text-[#f3c5ae]" : "text-white"}`}>Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-[#f3c5ae] transition-colors ${pathname === "/about" ? "text-[#f3c5ae]" : "text-white"}`}>About Us</Link>
          <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-[#f3c5ae] transition-colors ${pathname === "/gallery" ? "text-[#f3c5ae]" : "text-white"}`}>Gallery</Link>
          <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-[#f3c5ae] transition-colors ${pathname === "/events" ? "text-[#f3c5ae]" : "text-white"}`}>Upcoming Events</Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-[#f3c5ae] transition-colors ${pathname === "/register" ? "text-[#f3c5ae]" : "text-white"}`}>Register</Link>
          
          {!pathname.startsWith("/admin") && (
            <div className="pt-8 flex flex-col items-center gap-6 w-full px-6">
              {isAuthenticated ? (
                <div className="flex flex-col items-center w-full">
                  <button 
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="flex flex-col items-center justify-center focus:outline-none transition-all hover:scale-105 active:scale-95"
                    aria-label="Toggle profile menu"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-[#f3c5ae] shadow-[0_0_15px_rgba(212,164,53,0.3)]" referrerPolicy="no-referrer"/>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-[#f3c5ae] shadow-[0_0_15px_rgba(212,164,53,0.3)] flex items-center justify-center text-2xl font-medium text-white tracking-wider uppercase">
                        {user?.name?.[0] || user?.email?.[0] || "U"}
                      </div>
                    )}
                  </button>
                  
                  {isMobileDropdownOpen ? (
                    <div className="flex flex-col items-center w-full gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="text-center pb-4 w-3/4 border-b border-zinc-800/50">
                        <p className="text-white text-lg font-medium">{user?.name || "User"}</p>
                        <p className="text-[#f3c5ae] text-xs pt-1">{user?.email || ""}</p>
                      </div>
                      <Link href="/register" onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }} className="text-zinc-300 hover:text-white transition-colors text-lg">Register</Link>
                      <Link href="/profile" onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }} className="text-zinc-300 hover:text-white transition-colors text-lg">Profile</Link>
                      <button onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); handleLogout(); }} className="text-red-400 font-medium hover:text-red-300 transition-colors text-lg">Logout</button>
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-[2px] animate-pulse">Tap avatar for options</p>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }} 
                  className="mt-4 text-zinc-400 hover:text-black transition-colors uppercase text-sm tracking-widest border border-zinc-700 px-8 py-3 hover:bg-white cursor-pointer"
                >
                  Login / Signup
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
}
