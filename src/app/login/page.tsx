"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      router.push("/dashboard");
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

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 md:p-12 bg-zinc-900 border border-zinc-800 space-y-8 shadow-2xl">
        
        <div className="flex w-full border-b border-zinc-800 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 pb-4 text-sm font-medium tracking-widest uppercase transition-colors ${
              isLogin ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 pb-4 text-sm font-medium tracking-widest uppercase transition-colors ${
              !isLogin ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Signup
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-light tracking-widest uppercase text-white">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-zinc-500 text-sm">
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
              <label className="text-xs uppercase tracking-widest text-zinc-400" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="Jane Doe"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="text-xs uppercase tracking-widest text-zinc-400" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="text-xs uppercase tracking-widest text-zinc-400" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="••••••••"
              required
            />
            <p className="text-zinc-600 text-xs mt-1">Must be at least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-4"
          >
            {isLoading ? "Processing..." : (isLogin ? "Enter" : "Create Account")}
          </button>
        </form>
        
        <div className="text-center pt-4">
          <button 
            type="button" 
            onClick={toggleAuthMode}
            className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest transition-colors pb-1 border-b border-transparent hover:border-zinc-500"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
