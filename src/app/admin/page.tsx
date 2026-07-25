"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="absolute inset-0 bg-grid-noir opacity-[0.08]" aria-hidden="true" />

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center border border-ghost-red/20 p-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-ghost-red"
              aria-hidden="true"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-display text-2xl text-bone">Panel de Administración</h1>
          <p className="mt-2 text-[13px] text-bone-faint">Black Ghost&apos;s Garage</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-line bg-panel px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
              placeholder="admin@taller.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-line bg-panel px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border border-ghost-red/30 bg-ghost-red/5 px-4 py-3 text-[12px] text-ghost-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-press w-full border border-ghost-red bg-ghost-red px-5 py-3 text-[11px] uppercase text-void tracking-[0.12em] transition-all duration-200 hover:bg-ghost-red/90 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-[11px] uppercase text-bone-faint tracking-[0.1em] transition-colors duration-200 hover:text-ghost-red"
          >
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
}
