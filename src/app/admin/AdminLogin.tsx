"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Access denied");
      }

      // Hard refresh to reload the server component on the same route and show the dashboard
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm p-8 md:p-12 bg-black border border-[#f3c5ae]/30 space-y-8 shadow-2xl relative">
        <div className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 mb-4 rounded-full border border-[#f3c5ae] flex items-center justify-center text-[#f3c5ae]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white">
            Admin <span className="text-[#f3c5ae]">Portal</span>
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[3px] uppercase mt-2">
            Restricted Access
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/20 border border-red-900/50 text-red-400 text-xs text-center tracking-widest uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae]" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae]/50 transition-colors text-sm"
              placeholder="Admin Username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae]/50 transition-colors text-sm tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 uppercase tracking-widest text-[11px] font-medium hover:bg-[#f3c5ae] hover:text-white transition-colors disabled:opacity-50 mt-4"
          >
            {isLoading ? "Verifying..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}