const stats = [
  { value: "+800", label: "Vehículos atendidos", id: "STAT.01" },
  { value: "12", label: "Especialistas en planta", id: "STAT.02" },
  { value: "4.8★", label: "Calificación promedio", id: "STAT.03" },
];

export default function About() {
  return (
    <section id="nosotros" className="relative bg-panel py-24 md:py-32" aria-labelledby="about-heading">
      <div className="absolute inset-0 bg-grid-noir opacity-[0.12]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Copy */}
          <div className="reveal">
            <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
              ◆ Acerca de la empresa
            </span>
            <h2
              id="about-heading"
              className="text-display mt-4 text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[0.92] text-bone"
            >
              No tuneamos autos.
              <br />
              <span className="text-ghost-red">Resolvemos ingeniería.</span>
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-[15px] leading-relaxed text-bone-dim">
              <p>
                Black Ghost&apos;s Garage nació de una obsesión simple:
                que la mecánica y la estética dejen de ser dos
                conversaciones distintas. En nuestro taller, cada
                afinación se documenta como protocolo y cada
                modificación visual se ejecuta con la misma exigencia
                que una reparación de motor.
              </p>
              <p>
                Trabajamos autos y motocicletas, desde mantenimiento
                preventivo hasta piezas en fibra de carbono a medida.
                Sin atajos, sin promesas vacías. Tu vehículo entra al
                taller como un caso de estudio, y sale como una
                máquina que pasó por un proceso real.
              </p>
            </div>

            {/* Protocol link with industrial arrow */}
            <a
              href="#contacto"
              className="btn-press group mt-9 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-bone transition-colors duration-200 hover:text-ghost-red"
            >
              <span className="text-data-wide">Conoce nuestro protocolo de trabajo</span>
              <span
                className="inline-flex size-5 items-center justify-center border border-current transition-all duration-200 group-hover:border-ghost-red group-hover:text-ghost-red"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>

          {/* Stat readout panel — brutalist */}
          <div className="reveal" data-reveal-delay="120">
            <div className="relative border border-line bg-void p-7 md:p-9">
              {/* Double-bezel inset */}
              <div
                className="pointer-events-none absolute inset-[3px] border border-line-soft"
                aria-hidden="true"
              />

              {/* Header with pulse */}
              <div className="relative mb-7 flex items-center justify-between">
                <p className="text-data-wide flex items-center gap-2.5 text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                  <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" aria-hidden="true" />
                  Registro operativo
                </p>
                <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]" aria-hidden="true">
                  [LIVE]
                </span>
              </div>

              {/* Stats rows */}
              <div className="relative flex flex-col gap-0">
                {stats.map((stat, i) => (
                  <div
                    key={stat.id}
                    className={`flex items-end justify-between py-5 ${
                      i !== stats.length - 1 ? "border-b border-line-soft" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-data-wide text-[9px] uppercase text-ghost-red/40 tracking-[0.1em]" aria-hidden="true">
                        {stat.id}
                      </span>
                      <span className="text-data-wide text-[12px] uppercase text-bone-dim tracking-[0.08em]">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-display text-3xl text-ghost-red md:text-4xl">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="relative mt-8 grid grid-cols-2 gap-3">
                <div className="border border-line-soft px-3 py-2.5 text-center">
                  <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]">
                    Garantía por escrito
                  </span>
                </div>
                <div className="border border-line-soft px-3 py-2.5 text-center">
                  <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]">
                    Diagnóstico incluido
                  </span>
                </div>
              </div>

              {/* Crosshair corners */}
              <div className="absolute left-0 top-0 size-2 border-l border-t border-ghost-red/20" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 size-2 border-r border-b border-ghost-red/20" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
