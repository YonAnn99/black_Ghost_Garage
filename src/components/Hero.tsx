import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-void pt-28"
      aria-label="Hero — Ingeniería de alto octanaje"
    >
      {/* Backdrop: grid + radial glow + scanlines */}
      <div className="absolute inset-0 bg-grid-noir opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-scanlines" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[38%] h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--color-ghost-red-deep), transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Scan line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ghost-red/50 to-transparent animate-scan"
        aria-hidden="true"
      />

      {/* HUD corner markers */}
      <div className="absolute left-6 top-28 size-3 border-l border-t border-ghost-red/30" aria-hidden="true" />
      <div className="absolute right-6 top-28 size-3 border-r border-t border-ghost-red/30" aria-hidden="true" />
      <div className="absolute bottom-8 left-6 size-3 border-l border-b border-ghost-red/30" aria-hidden="true" />
      <div className="absolute bottom-8 right-6 size-3 border-r border-b border-ghost-red/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Emblem — double-bezel */}
        <div className="reveal mb-10 flex flex-col items-center gap-3" data-reveal-delay="0">
          <div className="relative p-3">
            <div className="absolute inset-0 rounded-sm border border-ghost-red/20" aria-hidden="true" />
            <div className="relative">
              <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-ghost-red/25 blur-2xl" aria-hidden="true" />
              <Image
                src="/images/ghost-logo.png"
                alt="Black Ghost's Garage"
                width={96}
                height={96}
                priority
                className="drop-shadow-[0_0_30px_rgba(232,48,42,0.35)]"
              />
            </div>
          </div>
          <span className="text-data-wide text-[10px] uppercase text-bone-faint tracking-[0.15em]">
            
          </span>
        </div>

        {/* Headline — massive brutalist type */}
        <h1
          className="reveal text-display text-[clamp(2.8rem,9vw,6rem)] leading-[0.88] text-bone"
          data-reveal-delay="100"
        >
          Mecánica de
          <br />
          <span className="text-ghost-red">perfección pura</span>
          <br />
          Para máquinas exigentes.
        </h1>

        <p
          className="reveal mt-8 max-w-xl text-[15px] leading-relaxed text-bone-dim md:text-base"
          data-reveal-delay="200"
        >
          Precisión mecánica, estética agresiva y rendimiento sin
          compromisos. Entra al lado oscuro de la automotriz.
        </p>

        {/* CTAs — magnetic buttons */}
        <div
          className="reveal mt-12 flex flex-col items-center gap-4 sm:flex-row"
          data-reveal-delay="300"
        >
          <a
            href="#servicios"
            className="btn-press group inline-flex items-center gap-3 bg-ghost-red px-8 py-4 text-[12px] uppercase text-void transition-colors duration-200 hover:bg-bone"
          >
            <span>Explorar servicios</span>
            <span
              className="inline-flex size-6 items-center justify-center rounded-full bg-void/15 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-void/25"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <a
            href="#contacto"
            className="btn-press inline-flex items-center gap-2 border border-line px-8 py-4 text-[12px] uppercase text-bone-dim transition-all duration-200 hover:border-bone hover:text-bone"
          >
            Agendar cita
          </a>
        </div>

        {/* HUD telemetry strip */}
        <div
          className="reveal mt-20 flex w-full max-w-lg items-center justify-between border-t border-line-soft pt-5 text-[10px] uppercase text-bone-faint"
          data-reveal-delay="400"
        >
          <span className="text-data-wide flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" aria-hidden="true" />
            Sistema en línea
          </span>
          <span className="text-data-wide hidden sm:inline" aria-hidden="true">///</span>
          <span className="text-data-wide"></span>
          <span className="text-data-wide hidden sm:inline" aria-hidden="true">///</span>
          <span className="text-data-wide"></span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
