const stats = [
  { value: "+800", label: "Vehículos atendidos" },
  { value: "12", label: "Especialistas en planta" },
  { value: "4.8★", label: "Calificación promedio" },
];

export default function About() {
  return (
    <section id="nosotros" className="relative bg-panel py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-noir opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Copy */}
          <div className="reveal">
            <span className="text-data text-[11px] uppercase text-ghost-red">
              ◆ Acerca de la empresa
            </span>
            <h2 className="text-display mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-bone">
              No tuneamos autos.
              <br />
              Resolvemos ingeniería.
            </h2>

            <div className="mt-7 flex flex-col gap-5 text-[15px] leading-relaxed text-bone-dim">
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

            <a
              href="#contacto"
              className="text-data mt-9 inline-flex items-center gap-2 border-b border-ghost-red pb-1 text-[13px] uppercase text-bone transition-colors hover:text-ghost-red"
            >
              Conoce nuestro protocolo de trabajo →
            </a>
          </div>

          {/* Stat readout panel */}
          <div className="reveal" data-reveal-delay="120">
            <div className="border border-line bg-void p-7 md:p-9">
              <p className="text-data mb-7 flex items-center gap-2 text-[11px] uppercase text-bone-faint">
                <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" />
                Registro operativo
              </p>

              <div className="flex flex-col gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex items-end justify-between ${
                      i !== stats.length - 1 ? "border-b border-line-soft pb-6" : ""
                    }`}
                  >
                    <span className="text-data text-[13px] uppercase text-bone-dim">
                      {stat.label}
                    </span>
                    <span className="text-display text-3xl text-ghost-red md:text-4xl">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-data text-[11px] uppercase text-bone-faint">
                <span className="border border-line-soft px-3 py-2 text-center">
                  Garantía por escrito
                </span>
                <span className="border border-line-soft px-3 py-2 text-center">
                  Diagnóstico incluido
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
