"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)] ${
        scrolled
          ? "bg-void/90 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo — double-bezel */}
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
          <div className="relative p-1.5 transition-all duration-300 group-hover:scale-105">
            <div
              className="absolute inset-0 border border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50"
              aria-hidden="true"
            />
            <Image
              src="/images/ghost-logo.png"
              alt=""
              width={32}
              height={32}
              className="relative drop-shadow-[0_0_12px_rgba(232,48,42,0.25)]"
              aria-hidden="true"
            />
          </div>
          <span className="text-display text-[14px] leading-none">
            <span className="text-ghost-red">Black Ghost&apos;s</span>{" "}
            <span className="text-bone">Garage</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="btn-press text-data-wide px-4 py-2 text-[10px] uppercase text-bone-dim transition-colors duration-200 hover:text-ghost-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:block">
          <a
            href="#contacto"
            className="btn-press group inline-flex items-center gap-2.5 border border-ghost-red px-5 py-2.5 text-[10px] uppercase text-bone transition-all duration-200 hover:bg-ghost-red hover:text-void"
          >
            <span
              className="size-1.5 rounded-full bg-ghost-red transition-colors duration-200 group-hover:bg-void animate-pulse-dot"
              aria-hidden="true"
            />
            Agendar cita
          </a>
        </div>

        {/* Mobile hamburger — magnético con morphing a X */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="btn-press relative flex size-10 items-center justify-center border border-line-soft bg-void/50 backdrop-blur-sm transition-all duration-300 hover:border-ghost-red/50 lg:hidden"
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-bone transition-all duration-300 ease-[var(--ease-spring)] ${
              mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px] rotate-0"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-bone transition-all duration-300 ease-[var(--ease-spring)] ${
              mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px] rotate-0"
            }`}
          />
          {/* Corner accents */}
          <span className="absolute left-0 top-0 size-1.5 border-l border-t border-ghost-red/30" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 size-1.5 border-r border-b border-ghost-red/30" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu — fullscreen overlay con stagger reveal */}
      <div
        id="mobile-menu"
        className={`grid lg:hidden transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden border-t border-line bg-void/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-6" aria-label="Menú móvil">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-data-wide border-b border-line-soft py-4 text-[11px] uppercase tracking-[0.1em] text-bone-dim transition-all duration-300 hover:text-ghost-red ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${100 + idx * 50}ms` : "0ms",
                }}
              >
                <span className="text-ghost-red/40 mr-3" aria-hidden="true">[0{idx + 1}]</span>
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className={`btn-press mt-5 inline-flex items-center justify-center gap-2 border border-ghost-red bg-ghost-red px-5 py-3.5 text-[11px] uppercase text-void transition-all duration-300 ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${100 + navLinks.length * 50}ms` : "0ms",
              }}
            >
              Agendar cita
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
