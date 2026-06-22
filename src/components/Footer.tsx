import Image from "next/image";
import { socialLinks } from "@/lib/data";

const legalLinks = ["Privacidad", "Términos", "Soporte técnico"];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#0d0403]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ghost-logo.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
            <div>
              <p className="text-display text-sm leading-none text-ghost-red">
                Black Ghost&apos;s Garage
              </p>
              <p className="mt-1 text-[11px] text-bone-faint">
                © {new Date().getFullYear()} Black Ghost&apos;s Garage.
                High-velocity noir engineering.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-data text-[12px] uppercase text-bone-dim">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="hover:text-ghost-red">
                {l}
              </a>
            ))}
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ghost-red"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
