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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <Image
            src="/images/ghost-logo.png"
            alt="Black Ghost's Garage"
            width={36}
            height={36}
            className="transition-transform duration-300 group-hover:rotate-[-6deg]"
          />
          <span className="text-display text-[15px] leading-none tracking-wide">
            <span className="text-ghost-red">Black Ghost&apos;s</span>{" "}
            <span className="text-bone">Garage</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-data text-[12px] uppercase text-bone-dim transition-colors hover:text-ghost-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contacto"
            className="text-data inline-flex items-center gap-2 border border-ghost-red px-4 py-2 text-[12px] uppercase text-bone transition-colors hover:bg-ghost-red hover:text-void"
          >
            <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot group-hover:bg-void" />
            Agendar cita
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="relative flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-bone transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-bone transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid lg:hidden transition-[grid-template-rows] duration-300 ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden border-t border-line bg-void">
          <nav className="flex flex-col px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-data border-b border-line-soft py-4 text-[13px] uppercase text-bone-dim transition-colors hover:text-ghost-red"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="text-data mt-4 inline-flex items-center justify-center gap-2 border border-ghost-red px-4 py-3 text-[13px] uppercase text-bone"
            >
              Agendar cita
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
