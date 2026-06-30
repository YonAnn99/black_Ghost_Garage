import Image from "next/image";
import { socialLinks } from "@/lib/data";

const legalLinks = ["Privacidad", "Términos", "Soporte técnico"];

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
                  key={l}
                  href="#"
                  className="btn-press text-data-wide text-[10px] uppercase tracking-[0.1em] text-bone-dim transition-colors duration-200 hover:text-ghost-red"
                >
                  {l}
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
                  className="btn-press text-data-wide text-[10px] uppercase tracking-[0.1em] text-bone-dim transition-colors duration-200 hover:text-ghost-red"
                >
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
