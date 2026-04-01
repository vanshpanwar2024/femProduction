"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ isAuthenticated }: { isAuthenticated?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
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
              <>
                <Link href="/dashboard" className="text-zinc-300 hover:text-white transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors">Logout</button>
              </>
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
