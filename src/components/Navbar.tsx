"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar({ isAuthenticated, user }: { isAuthenticated?: boolean; user?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const transparentNavbar = isHome && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        transparentNavbar ? "bg-transparent py-6" : "bg-black/90 py-4 shadow-md backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center text-white">
        <Link href="/" className="text-2xl font-bold tracking-widest uppercase text-white hover:text-gray-300 transition-colors">
          VogueEvents
        </Link>
        <div className="hidden md:flex flex-1 justify-end space-x-8 text-sm font-medium tracking-wide items-center">
          <Link href="/" className={`hover:text-gray-400 transition-colors ${pathname === "/" ? "text-white" : "text-gray-300"}`}>Home</Link>
          <Link href="/about" className={`hover:text-gray-400 transition-colors ${pathname === "/about" ? "text-white" : "text-gray-300"}`}>About Us</Link>
          <Link href="/gallery" className={`hover:text-gray-400 transition-colors ${pathname === "/gallery" ? "text-white" : "text-gray-300"}`}>Gallery</Link>
          <Link href="/events" className={`hover:text-gray-400 transition-colors ${pathname === "/events" ? "text-white" : "text-gray-300"}`}>Upcoming Events</Link>
          
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
              <Link href="/login" className="text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-widest border border-zinc-700 px-4 py-2 hover:bg-white hover:text-black">
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
