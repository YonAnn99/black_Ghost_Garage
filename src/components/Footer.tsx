"use client";

import Image from "next/image";
import { socialLinks } from "@/lib/data";

const legalLinks = [
  { label: "Privacidad", href: "/aviso-de-privacidad" },
  { label: "Términos", href: "#" },
  { label: "Soporte técnico", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#080302]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-1">
                <div className="absolute inset-0 border border-ghost-red/15" aria-hidden="true" />
                <Image
                  src="/images/ghost-logo.png"
                  alt=""
                  width={24}
                  height={24}
                  className="relative"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-display text-sm leading-none text-ghost-red">
                  Black Ghost&apos;s Garage
                </p>
                <p className="mt-1.5 text-[10px] text-bone-faint">
                  High-velocity noir engineering.
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-3 text-[10px] text-bone-faint">
              <span className="text-data-wide tracking-[0.1em]" aria-hidden="true">©</span>
              <span className="text-data-wide tracking-[0.08em]">
                {new Date().getFullYear()}  Black Ghost&apos;s Garage. Todos los derechos reservados.
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4" aria-label="Enlaces legales y sociales">
            {/* Legal */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={
                    l.href === "/aviso-de-privacidad"
                      ? (e) => {
                          e.preventDefault();
                          window.open(l.href, "_blank");
                        }
                      : undefined
                  }
                  className="btn-press text-data-wide text-[10px] uppercase tracking-[0.1em] text-bone-dim transition-colors duration-200 hover:text-ghost-red"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex items-center gap-2 text-data-wide text-[10px] uppercase tracking-[0.1em] text-bone-dim transition-colors duration-200 hover:text-ghost-red"
                >
                  {s.icon === "instagram" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
                    </svg>
                  )}
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom bar — industrial telemetry strip */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-line-soft pt-8 sm:flex-row sm:justify-between">
          <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.12em]" aria-hidden="true">
            
          </span>
          <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.12em]" aria-hidden="true">
            
          </span>
        </div>
      </div>
    </footer>
  );
}
