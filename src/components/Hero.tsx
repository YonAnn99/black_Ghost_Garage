import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-void pt-28"
    >
      {/* Backdrop: grid + radial glow + scanlines, evokes a diagnostic bay */}
      <div className="absolute inset-0 bg-grid-noir opacity-40" />
      <div className="absolute inset-0 bg-scanlines" />
      <div
        className="absolute left-1/2 top-[38%] h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--color-ghost-red-deep), transparent 70%)" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ghost-red/50 to-transparent animate-scan" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Emblem */}
        <div className="reveal mb-8 flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-ghost-red/25 blur-2xl" />
            <Image
              src="/images/ghost-logo.png"
              alt="Black Ghost's Garage"
              width={108}
              height={108}
              priority
              className="drop-shadow-[0_0_30px_rgba(232,48,42,0.35)]"
            />
          </div>
        </div>

        {/* Headline — copy original del brief */}
        <h1
          className="reveal text-display text-[clamp(2.4rem,8vw,5.2rem)] leading-[1.02] text-bone"
          data-reveal-delay="80"
        >
          Ingeniería de
          <br />
          <span className="text-ghost-red">alto octanaje</span>
          <br />
          para tu vehículo.
        </h1>

        <p
          className="reveal mt-7 max-w-xl text-[15px] leading-relaxed text-bone-dim md:text-base"
          data-reveal-delay="180"
        >
          Precisión mecánica, estética agresiva y rendimiento sin
          compromisos. Entra al lado oscuro de la ingeniería automotriz.
        </p>

        <div
          className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row"
          data-reveal-delay="260"
        >
          <a
            href="#servicios"
            className="text-data group inline-flex items-center gap-2 bg-ghost-red px-7 py-3.5 text-[13px] uppercase text-void transition-colors hover:bg-bone"
          >
            Explorar servicios
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contacto"
            className="text-data inline-flex items-center gap-2 border border-line px-7 py-3.5 text-[13px] uppercase text-bone-dim transition-colors hover:border-bone hover:text-bone"
          >
            Agendar cita
          </a>
        </div>

        {/* HUD strip teaser — foreshadows the diagnostic-panel signature element used in Services */}
        <div
          className="reveal mt-16 flex w-full max-w-md items-center justify-between border-t border-line-soft pt-5 text-data text-[11px] uppercase text-bone-faint"
          data-reveal-delay="340"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" />
            Sistema en línea
          </span>
          <span>CDMX · Sector Norte</span>
          <span>Est. 2024</span>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
