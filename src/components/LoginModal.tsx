"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Pick up error parameters bound from OAuth failure redirects
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam && isOpen) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      onClose(); // Close the modal on success
      router.push("/");
      router.refresh(); // Refresh layout to update Navbar state
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Scrollable content wrapper */}
      <div className="fixed inset-0 overflow-y-auto pointer-events-none">
        <div className="flex min-h-full flex-col items-center justify-center p-4 py-12">
          
          <div className="w-full max-w-md p-8 md:p-12 bg-zinc-950 border border-[#f3c5ae]/30 space-y-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 min-h-[580px] flex flex-col justify-start pointer-events-auto">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex w-full border-b border-zinc-800 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 pb-4 text-sm font-medium tracking-widest uppercase transition-colors ${
              isLogin ? "text-[#f3c5ae] border-b-2 border-[#f3c5ae]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 pb-4 text-sm font-medium tracking-widest uppercase transition-colors ${
              !isLogin ? "text-[#f3c5ae] border-b-2 border-[#f3c5ae]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Signup
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-[#f3c5ae] text-xs">
            {isLogin ? "Sign in to access your account" : "Create an account to RSVP"}
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-950/50 border border-red-900 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae]" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae]/50 transition-colors"
                placeholder="Jane Doe"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae]" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae]/50 transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae]/50 transition-colors"
              placeholder="••••••••"
              required
            />
            <p className="text-zinc-500 text-[10px] uppercase mt-1 tracking-widest">Must be at least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#f3c5ae] hover:text-white transition-colors disabled:opacity-50 mt-4"
          >
            {isLoading ? "Processing..." : (isLogin ? "Enter" : "Create Account")}
          </button>
          
          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative bg-zinc-950 px-4 text-[10px] uppercase tracking-[3px] text-zinc-500">
              Or continue with
            </div>
          </div>

          <a
            href="/api/auth/google"
            className="flex items-center justify-center w-full bg-black border border-zinc-800 text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-zinc-900 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-3" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </a>
        </form>
        
        <div className="text-center pt-4">
          <button 
            type="button" 
            onClick={toggleAuthMode}
            className="text-[10px] text-zinc-500 hover:text-[#f3c5ae] uppercase tracking-[2px] transition-colors pb-1 border-b border-transparent hover:border-[#f3c5ae]"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}